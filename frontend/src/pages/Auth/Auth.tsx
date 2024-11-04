import { motion } from 'framer-motion';
import css from './Auth.module.css';
import { AuthTip } from '../../components';

const Auth = () => {
  return (
    <div className={css.mainContainer}>
      <AuthTip />
      <motion.div layout className={css.authContainer}>
        <h3>Вход</h3>
        <hr />
        <p>
          Код<span>*</span>
        </p>
        <form className={css.authContentForm}>
          <input className={css.authContentInput} maxLength={40} />
        </form>
        <span className={css.buttonContent}>
          <button>Войти</button>
        </span>
      </motion.div>
    </div>
  );
};

export default Auth;
