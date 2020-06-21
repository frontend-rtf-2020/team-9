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
     count: 2, 
     user: '',
     text: '',
     tasks: [], 
     view: false,
     boards: '',
     button: 'Показать списки',
     inputs: [<Input num={0} updateTasks={this.updateTasks}/>, <Input num={1} updateTasks={this.updateTasks}/>, <Input num={2} updateTasks={this.updateTasks}/>],
     compBoards: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.addStr = this.addStr.bind(this);
    this.getBoards = this.getBoards.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleName = this.handleName.bind(this);
  }

  async getBoards() {
     let response = await fetch('/api/getBoards', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ "userName": this.props.userName})
    });
     let data = await response.json();
     await this.setState({ boards: data });
     var arr = [];
     for (var i = 0; i < this.state.boards.length; i++)
     {
       arr.push(<Board name={this.state.boards[i].name} userName={this.props.userName} getBoards={this.getBoards} _id={this.state.boards[i]._id} tasks={this.state.boards[i].tasks} />);
       await this.setState({compBoards: arr});
     }
     this.setState({button: 'Обновить'});
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
          <button onClick={this.getBoards}> {this.state.button} </button>
          <button onClick={this.handleCreate}> Создать список </button>
          <div>
            {this.state.compBoards}
          </div>
        </div>
      )
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.changeBoard = this.changeBoard.bind(this);
    this.saveBoard = this.saveBoard.bind(this);
    this.updateTasks = this.updateTasks.bind(this);
    this.state = {change: false, inputs: [], tasks: []};
  }

  changeBoard() {
    this.setState({change: true});
    this.setState({tasks: this.props.tasks});
    let arr = [];
    for (var i=0; i < this.props.tasks.length;i++)
    {
      arr.push(<Input num={i} updateTasks={this.updateTasks} text={this.props.tasks[i]} />);
    }
    this.setState({inputs: arr});
  }

  async saveBoard() {
    this.setState({change: false});
    fetch('/api/changeBoard', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "userName": this.props.userName,
        "name": this.props.name,
        "tasks": this.state.tasks
      })
    });
    this.setState({view: false});
    this.props.getBoards();
  }

  deleteBoard() {
    fetch('/api/deleteBoard', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "_id": this.props._id
      })
    });
    this.props.getBoards();
  }

  updateTasks(text, num) {
    let arr = this.state.tasks.slice();
    arr[num] = text;
    this.setState({tasks: arr});
  }

  render() {
    if (this.state.change)
    return (
      <div>
        <p>
          <h3>{this.props.name}</h3>
          {this.state.inputs}
          <button onClick={this.saveBoard}>Сохранить</button>
          <button onClick={this.deleteBoard}>Удалить</button>  
        </p>
      </div>
    )
    else
      return (
        <div>
          <p>
          <lablel>{this.props.name}</lablel> <br/>
            <button onClick={this.changeBoard}>Редактировать</button>
            <ul>
              {this.props.tasks.map(function(item) {
                return <li> {item} </li>
              })
              }
            </ul>
            <button onClick={this.deleteBoard}>Удалить</button>  
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
         <input type="search" placeholder={this.props.text} onChange={(e) => {this.handleTask(e)}} />  <br/>
      </div>
    )
  }
}

export default Home;