import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <span className={cx('header-small')}>React & Node</span>
                <span className={cx('header-large')}>Blog</span>
            </div>
            <img
                className={cx('header-img')}
                src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
            />
        </div>
    );
}

export default Header;
