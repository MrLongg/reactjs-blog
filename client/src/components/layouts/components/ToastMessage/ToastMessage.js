import classNames from 'classnames/bind';
import styles from './ToastMessage.module.scss';

const cx = classNames.bind(styles);

function ToastMessage() {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('content')}>Đăng nhập thành công</span>
        </div>
    )
}

export default ToastMessage