import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('')
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null)
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append('name', filename);
        data.append('file', file);
        try {
            if (password === conPassword) {
                try {
                    await axios.post('/upload', data);
                } catch (err) {
                    console.log(err);
                }
                const res = await axios.post("/auth/register", {
                    username,
                    email,
                    photo: filename,
                    password,
                });
                res.data && window.location.replace("/login")

            }
        } catch (err) {
            setError(true);
            console.log(err);
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
                <label>Profile Picture</label>
                <input
                    className={cx('register-input')}
                    type="file"
                    placeholder="Chose your profile picture..."
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <label>Password</label>
                <input
                    className={cx('register-input')}
                    type="password"
                    placeholder="Enter your password..."
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Confirm Password</label>
                <input
                    className={cx('register-input')}
                    type="password"
                    placeholder="Enter your password again..."
                    onChange={(e) => setConPassword(e.target.value)}
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
