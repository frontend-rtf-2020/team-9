import React,  { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Page activeUser={this.props.activeUser}>  </Page>
    )
  }
}

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {text: '', user: '', page: '', boards: ''};
  }

  componentDidMount() {
    this.setState({user: this.props.activeUser});
  }

  render() {
    return (
      <div className="App">
        <h1>Доска задач</h1>
        <h2>Пользователь: {this.state.user}</h2>
        <Link to={'./'}>
          <button> Выйти </button>
        </Link>
        <body>
          <CreateBoard userName={this.state.user}/>
        </body>
      </div>
    );
  }
}

class CreateBoard extends Component {
  constructor(props) {
    super(props);
    this.updateTasks = this.updateTasks.bind(this);
    this.state = {name: '',
     count: 3, 
     user: '',
     text: '',
     tasks: [], 
     view: false,
     boards: '',
     inputs: [<Input num={0} updateTasks={this.updateTasks}/>, <Input num={1} updateTasks={this.updateTasks}/>, <Input num={2} updateTasks={this.updateTasks}/>],
     compBoards: []
    };
     
    this.handleClick = this.handleClick.bind(this);
    this.addStr = this.addStr.bind(this);
    this.getBoards = this.getBoards.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleName = this.handleName.bind(this);
  }
  
  componentDidMount() {
    this.getBoards();
  }

  async getBoards() {
     let response = await fetch('/api/getBoards', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ "userName": this.props.userName })
    });
     let data = await response.json();
     this.setState({ boards: data });
     var arr = [];
     for (var i = 0; i <= this.state.boards.length; i++)
     {
       arr.push(<Board name={this.state.boards[i].name} tasks={this.state.boards[i].tasks} />);
       this.setState({compBoards: arr});
     }
  }

  handleCreate() {
    this.setState({view: true});
  }

  async handleClick() {
    fetch('/api/home', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "userName": this.props.userName,
        "name": this.state.name,
        "tasks": this.state.tasks
      })
    });
    this.setState({view: false});
    this.getBoards();
  }

  addStr() {
    var newCount = this.state.count + 1;
    this.setState({count: newCount});
    let arr = this.state.inputs.slice();
    arr.push(<Input num={newCount} updateTasks={this.updateTasks}/>);
    this.setState({inputs: arr});
  }

  updateTasks(text, num) {
    let arr = this.state.tasks.slice();
    arr[num] = text;
    this.setState({tasks: arr});
  }

  handleName(e) {
    this.setState({name: e.target.value});
  }

  render() {
    if (this.state.view)
      return(
        <div>
          <br/> <label> Имя списка </label>
          <br/> <input type="text" onChange={this.handleName} /><br/>
          <label> Задачи </label> <br/>
          <div>
            {this.state.inputs}
          </div>
          <br/> <button onClick={this.addStr}>Добавить пункт</button> <br/>
          <br/> <button onClick={this.handleClick}>Сохранить</button>
        </div>
      )
    else
      return(
        <div>
          <button onClick={this.getBoards}> Показать списки </button>
          <button onClick={this.handleCreate}> Создать список </button>
          <div>
            {this.state.compBoards}
          </div>
        </div>
      )
  }
}

class Board extends Component {
  render() {
    return (
      <div>
        <p>
          <label>{this.props.name}</label> <br/>
          <button>Редактировать</button>
          <ul>
            {this.props.tasks.map(function(item) {
              return <ol> <li> {item} </li> </ol>
            })
            }
          </ul>
          <button>Удалить</button>  
        </p>
      </div>
    )
  }
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.handleTask = this.handleTask.bind(this);
  }

  handleTask = async function(e) {
    await this.setState({ text: e.target.value});
    this.props.updateTasks(this.state.text, this.props.num);
  }

  render() {
    return(
      <div>
        {this.props.text} <input type="text" value={this.state.text} ref="input" onChange={(e) => {this.handleTask(e)}} />  <br/>
      </div>
    )
  }
}

export default Home;