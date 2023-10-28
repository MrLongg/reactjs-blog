import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
import Sidebar from '~/components/layouts/components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Settings() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <span className={cx('update-title')}>Update Your Account</span>
                    <span className={cx('delete-title')}>Delete Account</span>
                </div>
                <form className={cx('form')}>
                    <label>Profile Picture</label>
                    <div className={cx('profile-picture')}>
                        <img
                            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <FontAwesomeIcon className={cx('icon')} icon={faUserCircle} />
                        </label>
                        <input className={cx('input-file')} type="file" id="fileInput" />
                    </div>
                    <label>Username</label>
                </form>
            </div>
            <Sidebar />
        </div>
    );
}

export default Settings;
