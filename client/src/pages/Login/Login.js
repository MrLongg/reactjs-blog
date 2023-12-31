import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { Context } from '~/context/Context';
import axios from 'axios';

const cx = classNames.bind(styles);

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('/auth/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE' });
            console.log("Login failed!");
        }
    };

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Login</span>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <label>Email</label>
                <input className={cx('login-input')} type="text" placeholder="Enter your email..." ref={emailRef} />
                <label>Password</label>
                <input
                    className={cx('login-input')}
                    type="password"
                    placeholder="Enter your password..."
                    ref={passwordRef}
                />
                <button className={cx('login')} type="submit" disabled={isFetching}>
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
