import classNames from 'classnames/bind';
import styles from './Topbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Topbar() {
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
                    <li className={cx('list-item')}>HOME</li>
                    <li className={cx('list-item')}>ABOUT</li>
                    <li className={cx('list-item')}>CONTACT</li>
                    <li className={cx('list-item')}>WRITE</li>
                    <li className={cx('list-item')}>LOGOUT</li>
                </ul>
            </div>
            <div className={cx('right')}>
                <img
                    className={cx('avatar')}
                    src="https://yt3.ggpht.com/wWDqp5j3QmrwIDRCBn0t1cKPkGNKpe5q9E1U5vCVPxcIppPnOAwwjZ8z4DgrIIhWTDHSxKPdwA=s88-c-k-c0x00ffffff-no-rj"
                    alt="Hình ảnh đại diện"
                />
                <FontAwesomeIcon className={cx('search-icon')} icon={faSearch} />
            </div>
        </div>
    );
}

export default Topbar;
