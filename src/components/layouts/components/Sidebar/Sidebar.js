import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar-item')}>
                <span className={cx('title')}>ABOUT ME</span>
                <img
                    className={cx('avatar')}
                    src="https://umbrellacreative.com.au/wp-content/uploads/2020/01/hide-the-pain-harold-why-you-should-not-use-stock-photos-1024x683.jpg"
                    alt=""
                />
                <p className={cx('paragraph')}>
                    Ipsum dolore sint reprehenderit do duis ex. Est fugiat eu Lorem tempor aute eu elit laboris.
                    Adipisicing magna elit commodo qui do duis enim et laboris. Non laboris ipsum sunt deserunt eiusmod
                    nisi minim anim culpa. Pariatur laborum ullamco id excepteur aute adipisicing ullamco. Ex incididunt
                    elit culpa fugiat ipsum aliqua enim ad fugiat magna in. Quis ex dolor eu aliqua quis eu enim Lorem.
                </p>
            </div>
            <div className={cx('sidebar-item')}>
                <span className={cx('title')}>CATEGORIES</span>
                <ul className={cx('sidebar-list')}>
                    <li className={cx('sidebar-list-item')}>Life</li>
                    <li className={cx('sidebar-list-item')}>Music</li>
                    <li className={cx('sidebar-list-item')}>Style</li>
                    <li className={cx('sidebar-list-item')}>Sport</li>
                    <li className={cx('sidebar-list-item')}>Cinema</li>
                    <li className={cx('sidebar-list-item')}>Tech</li>
                </ul>
            </div>
            <div className={cx('sidebar-item')}>
                <span className={cx('title')}>FOLLOW US</span>
                <div className={cx('sidebar-social')}>
                    <FontAwesomeIcon className={cx('sidebar-icon')} icon={faFacebook} />
                    <FontAwesomeIcon className={cx('sidebar-icon')} icon={faTwitter} />
                    <FontAwesomeIcon className={cx('sidebar-icon')} icon={faInstagram} />
                    <FontAwesomeIcon className={cx('sidebar-icon')} icon={faPinterest} />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
