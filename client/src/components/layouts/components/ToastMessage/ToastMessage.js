import classNames from 'classnames/bind';
import styles from './ToastMessage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ToastMessage({ message }) {
    const [showMessage, setShowMessage] = useState(true);

    return (
        <div className={cx('wrapper')}>
            {message.type && showMessage && (
                <span className={cx('content' , `content--${message.type}`)}>
                    {message.title}
                    <FontAwesomeIcon className={cx('icon')} icon={faXmark} onClick={() => setShowMessage(false)} />
                </span>
            )}
        </div>
    );
}

export default ToastMessage;
