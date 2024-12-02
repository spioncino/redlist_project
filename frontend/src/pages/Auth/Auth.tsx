import css from './Auth.module.css';
import { HelperAuthPage } from '../../components';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils';

const Auth = () => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace={true} />;
  }

  const navigate = useNavigate();

  const TEMP_PASS = '12345678';

  const [password, setPassword] = useState<string>('');

  const checkLogin = () => {
    if (password === TEMP_PASS) {
      localStorage.setItem('authToken', 'true');
      navigate('/');
    } else {
      alert('Неправильный пароль');
    }
  };

  return (
    <form className={css.mainContainer}>
      <HelperAuthPage />
      <div className={css.authContainer}>
        <h3>Вход</h3>
        <hr />
        <p>
          {/* ###FIXME */}
          Код<span>*</span> <span className={css.TEMP}>(код для тестирования: 12345678)</span>
        </p>
        <form className={css.authContentForm}>
          <input
            className={css.authContentInput}
            maxLength={8}
            placeholder="Уникальный 8-ми значный код"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <span className={css.buttonContent}>
          <button type="button" onClick={checkLogin}>
            Войти
          </button>
        </span>
      </div>
    </form>
  );
};

export default Auth;
