import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

function Notification() {
    return (
        <div className={cx('wrapper')}>
            <h1>Toast message</h1>
        </div>
    )
}

export default Notification