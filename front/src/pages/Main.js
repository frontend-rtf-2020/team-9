import React,  { Component } from 'react';
import { Link } from 'react-router-dom';


class Main extends Component {
  render() {
    return (
      <div className="App">
        <h1>Доска задач</h1>
        <h2>Для создания досок необходима авторизация!</h2>
        <Link to={'./auth'}>
          <button variant="raised">
              Авторизация
          </button>
        </Link>
        <Link to={'./reg'}>
          <button variant="raised">
              Регистрация
          </button>
        </Link>
      </div>
    );
  }
}

export default Main;