import React, {useState} from "react";

function Login({onLogin}) {
  const initialData = {
    email: '',
    password: '',
  }
  const [data, setData] = useState(initialData);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    onLogin(data)
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form name="login" className="auth__form" onSubmit={handleSubmit}>
        <input type="email" name="email" className="auth__input auth__input_type_email"
               value={data.email} onChange={handleChange}
               placeholder="Email" required
        />
        <input type="password" name="password" className="auth__input auth__input_type_password"
               value={data.password} onChange={handleChange}
               placeholder="Пароль" minLength={6} maxLength={20} required
        />
        <button type="submit" aria-label="Save" className="auth__save-button auth__save-button_sign-in">Войти</button>
      </form>
    </div>

  )
}

export default Login;
