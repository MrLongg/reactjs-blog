import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Register() {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Register</span>
            <form className={cx('form')}>
                <label>Username</label>
                <input className={cx('register-input')} type="text" placeholder="Enter your username..." />
                <label>Email</label>
                <input className={cx('register-input')} type="text" placeholder="Enter your email..." />
                <label>Password</label>
                <input className={cx('register-input')} type="password" placeholder="Enter your password..." />
                <button className={cx('register')}>Register</button>
            </form>
            <button className={cx('login')}>
                <Link to="/login">LOGIN</Link>
            </button>
        </div>
    );
}

export default Register;
