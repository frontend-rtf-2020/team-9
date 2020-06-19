import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
    <div className="App">
      <h1>Доска задач</h1>
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

export default Home;