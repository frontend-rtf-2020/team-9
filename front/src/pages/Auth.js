import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: '',
      email: '',
      password: ''
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEmail(e) {
    this.setState({email: e.target.value});
  }

  handlePassword(e) {
    this.setState({password: e.target.value});
  }

  handleClick() {
    if (this.state.email.length == 0)
      this.setState({message: 'Введите адрес электронной почты!'});
    else if (this.state.password.length == 0)
      this.setState({message: 'Введите пароль!'});
    else 
      fetch('/api/auth', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "email": this.state.email,
          "password": this.state.password
        })
      }).then(res => res.json())
      .then(message => this.setState({message}));
  }

  render() {
    if (this.state.message == "Вы успешно авторизовались")
      return (
        <div>
          <label>{this.state.message}</label><br/> 
          <Link to="/"><button >На главную</button></Link>
        </div>  
      )
    return (
      <div>
        <h2>Авторизация</h2><br/>
        <label>Почта</label><br/>
        <input type="text" value={this.state.email} onChange={this.handleEmail} /><br/><br/>
        <label>Пароль</label><br/>
        <input type="text" value={this.state.password} onChange={this.handlePassword} /><br/>
        <label>{this.state.message}</label><br/>
        <button onClick={this.handleClick}>Войти</button>
      </div>
    );
  }
}

export default Auth;
