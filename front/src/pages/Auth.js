import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: '',
      login: '',
      password: ''
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  handleLogin(e) {
    this.setState({login: e.target.value});
  }

  handlePassword(e) {
    this.setState({password: e.target.value});
  }

  async getUser() {
    await this.props.getUser(this.state.login);
  }

  handleClick() {
    if (this.state.login.length === 0)
      this.setState({message: 'Введите логин!'});
    else if (this.state.password.length === 0)
      this.setState({message: 'Введите пароль!'});
    else 
      fetch('/api/auth', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "login": this.state.login,
          "password": this.state.password
        })
      }).then(res => res.json())
      .then(message => this.setState({message}));
  }

  render() {
    if (this.state.message === "Вы успешно авторизовались")
      return (
        <div>
          <h2>{this.state.message}</h2><br/> 
          <Link to='/home'> 
            <button onClick={this.getUser} > На главную</button>
          </Link>
        </div>  
      )
    return (
      <div>
        <h2>Авторизация</h2><br/>
        <label>Логин</label><br/>
        <input type="text" value={this.state.login} onChange={this.handleLogin} /><br/><br/>
        <label>Пароль</label><br/>
        <input type="password" value={this.state.password} onChange={this.handlePassword} /><br/>
        <label>{this.state.message}</label><br/>
        <Link to='/'> 
            <button onClick={this.getUser} > Назад</button>
        </Link>
        <button onClick={this.handleClick}> Войти </button>
      </div>
    );
  }
}

export default Auth;
