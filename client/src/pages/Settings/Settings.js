import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
import Sidebar from '~/components/layouts/components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { Context } from '~/context/Context';
import axios from 'axios';

const cx = classNames.bind(styles);

function Settings() {
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [editedUsername, setEditedUsername] = useState(user.username)
    const [editedEmail, setEditedEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('')
    const [success, setSuccess] = useState(false);

    const PF = 'http://127.0.0.1:5000/images/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'UPDATE_START' });
        if (conPassword === password) {
            const updateUser = {
                userId: user._id,
                username: editedUsername,
                email: editedEmail,
                password,
            };
            if (file) {
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append('name', filename);
                data.append('file', file);
                updateUser.profilePic = filename;
                try {
                    await axios.post('/upload', data);
                } catch (err) {
                    console.log(err);
                }
            }
            try {
                const res = await axios.put('/users/' + user._id, updateUser);
                setSuccess(true);
                dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
            } catch (err) {
                dispatch({ type: 'UPDATE_FAILURE' });
            }
        } else {
            console.log("Something wrong");
        }

        }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <span className={cx('update-title')}>Update Your Account</span>
                    <span className={cx('delete-title')}>Delete Account</span>
                </div>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className={cx('profile-picture')}>
                        <img className={cx('image')} src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
                        <label htmlFor="fileInput">
                            <FontAwesomeIcon className={cx('icon')} icon={faUserCircle} />
                        </label>
                        <input
                            className={cx('input-file')}
                            type="file"
                            id="fileInput"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input type="text" value={editedUsername} onChange={(e) => setEditedUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    <label>Confirm Password</label>
                    <input type="password" onChange={(e) => setConPassword(e.target.value)} />
                    <button className={cx('submit')} type="submit">
                        Update
                    </button>
                    {success && <span className={cx('success-alert')}>Profile has been updated!</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    );
}

export default Settings;
