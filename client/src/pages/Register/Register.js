import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        try {
            const res = await axios.post("/auth/register", {
                username,
                email,
                password,
            });
            res.data && window.location.replace("/login")
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Register</span>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    className={cx('register-input')}
                    type="text"
                    placeholder="Enter your username..."
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    className={cx('register-input')}
                    type="text"
                    placeholder="Enter your email..."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    className={cx('register-input')}
                    type="password"
                    placeholder="Enter your password..."
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={cx('register')} type="submit">
                    Register
                </button>
            </form>
            <button className={cx('login')}>
                <Link to="/login">LOGIN</Link>
            </button>
            {error && <span style={{color: "red", marginTop: "10px"}}>Something went wrong!</span>}
        </div>
    );
}

export default Register;
