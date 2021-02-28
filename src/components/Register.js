import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function Register({onRegister}) {
  const initialData = {
    email: '',
    password: '',
  }
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
  }

  const resetForm = () => {
    setData(initialData);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!data.username || !data.password || !data.email) {
      return;
    }
    onRegister(data)
      .then(resetForm)
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form name="login" className="auth__form" onSubmit={handleSubmit}>
        <input type="email" name="email" className="auth__input auth__input_type_email"
               value={data.email} onChange={handleChange}
               placeholder="Email" required
        />
        <input type="password" name="password" className="auth__input auth__input_type_password"
               value={data.password} onChange={handleChange}
               placeholder="Пароль" minLength={6} maxLength={20} required
        />
        <button type="submit" aria-label="Save" className="auth__save-button">Зарегистрироваться</button>
      </form>
      <div className="auth__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__signin-link">Войти</Link>
      </div>
    </div>
  )
}

export default Register;
