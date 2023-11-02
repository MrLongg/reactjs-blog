import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { Context } from '~/context/Context';
import axios from 'axios';

const cx = classNames.bind(styles);

function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const { user, dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('/auth/login', {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE' });
        }
        console.log(userRef.current.value);
        console.log(passwordRef.current.value);
    };

    console.log(user);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Login</span>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <label>Username</label>
                <input className={cx('login-input')} type="text" placeholder="Enter your username..." ref={userRef} />
                <label>Password</label>
                <input
                    className={cx('login-input')}
                    type="password"
                    placeholder="Enter your password..."
                    ref={passwordRef}
                />
                <button className={cx('login')} type="submit">
                    Login
                </button>
            </form>
            <button className={cx('register')}>
                <Link to="/register">Register</Link>
            </button>
        </div>
    );
}

export default Login;
