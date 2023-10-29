import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Login</span>
            <form className={cx('form')}>
                <label>Email</label>
                <input className={cx('login-input')} type="text" placeholder="Enter your email..." />
                <label>Password</label>
                <input className={cx('login-input')} type="password" placeholder="Enter your password..." />
                <button className={cx('login')}>Login</button>
            </form>
            <button className={cx('register')}>
                <Link to="/register">Register</Link>
            </button>
        </div>
    );
}

export default Login;
