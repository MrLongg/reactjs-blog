import classNames from 'classnames/bind';
import styles from './Write.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Write() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('image')}
                src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
            />
            <form className={cx('form')}>
                <div className={cx('form-group')}>
                    <label htmlFor="fileInput">
                        <FontAwesomeIcon className={cx('icon')} icon={faPlus} />
                    </label>
                    <input className={cx('upload')} type="file" id="fileInput" />
                    <input className={cx('title')} type="text" placeholder="Title" autoFocus />
                </div>
                <div className={cx('form-group')}>
                    <textarea className={cx('content')} placeholder="Tell your story..." type="text"></textarea>
                </div>
                <button className={cx('submit')}>Publish</button>
            </form>
        </div>
    );
}

export default Write;
