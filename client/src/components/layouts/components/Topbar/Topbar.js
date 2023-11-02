import classNames from 'classnames/bind';
import styles from './Topbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '~/context/Context';

const cx = classNames.bind(styles);

function Topbar() {
    const { user, dispatch } = useContext(Context);

    const PF = 'http://127.0.0.1:5000/images/';

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <FontAwesomeIcon className={cx('top-icon')} icon={faFacebook} />
                <FontAwesomeIcon className={cx('top-icon')} icon={faTwitter} />
                <FontAwesomeIcon className={cx('top-icon')} icon={faInstagram} />
                <FontAwesomeIcon className={cx('top-icon')} icon={faPinterest} />
            </div>
            <div className={cx('center')}>
                <ul className={cx('center-list')}>
                    <li className={cx('list-item')}>
                        <Link to="/">HOME</Link>
                    </li>
                    <li className={cx('list-item')}>
                        <Link to="/about">ABOUT</Link>
                    </li>
                    <li className={cx('list-item')}>
                        <Link to="/">CONTACT</Link>
                    </li>
                    <li className={cx('list-item')}>
                        <Link to="/write">WRITE</Link>
                    </li>
                    <li className={cx('list-item')} onClick={handleLogout}>
                        {user && 'LOGOUT'}
                    </li>
                </ul>
            </div>
            <div className={cx('right')}>
                {user ? (
                    <Link to="/settings">
                        <img className={cx('avatar')} src={PF + user.profilePic} alt="Hình ảnh đại diện" />
                    </Link>
                ) : (
                    <ul className={cx('center-list')}>
                        <li className={cx('list-item')}>
                            <Link to="/login">LOGIN</Link>
                        </li>
                        <li className={cx('list-item')}>
                            <Link to="/register">REGISTER</Link>
                        </li>
                    </ul>
                )}
                <FontAwesomeIcon className={cx('search-icon')} icon={faSearch} />
            </div>
        </div>
    );
}

export default Topbar;
