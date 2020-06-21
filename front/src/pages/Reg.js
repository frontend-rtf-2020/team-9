import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Reg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: '',
      login: '',
      email: '',
      password: ''
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEmail(e) {
    this.setState({email: e.target.value});
  }

  handlePassword(e) {
    this.setState({password: e.target.value});
  }

  handleLogin(e) {
    this.setState({login: e.target.value});
  }

  handleClick() {
    if (this.state.login.length == 0)
      this.setState({message: 'Введите логин!'});
    else if (this.state.email.length == 0)
      this.setState({message: 'Введите адрес электронной почты!'});
    else if (this.state.password.length == 0)
      this.setState({message: 'Введите пароль!'});
    else 
      fetch('/api/register', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "login": this.state.login,
          "email": this.state.email,
          "password": this.state.password
        })
      }).then(res => res.json())
      .then(message => this.setState({message}));
  }

  render() {
    if (this.state.message == "Вы успешно зарегистрированы")
      return (
        <div>
          <label>{this.state.message}</label><br/> 
          <Link to="/auth"><button >Авторизироваться</button></Link>
        </div>  
      )
    return (
      <div>
        <h2>Регистрация</h2><br/>
        <label>Логин</label><br/> <br></br>
        <input type="text" value={this.state.login} onChange={this.handleLogin} /><br/><br/>
        <label>Почта</label><br/> <br></br>
        <input type="text" value={this.state.email} onChange={this.handleEmail} /><br/><br/>
        <label>Пароль</label><br/> <br></br>
        <input type="password" value={this.state.password} onChange={this.handlePassword} /><br/>
        <label>{this.state.message}</label><br/>
        <button onClick={this.handleClick}>Отправить</button>
      </div>
    );
  }
}

export default Reg;