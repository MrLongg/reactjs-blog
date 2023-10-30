import classNames from 'classnames/bind';
import styles from './SinglePost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SinglePost() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('post-wrapper')}>
                <img
                    className={cx('image')}
                    src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                />
                <h1 className={cx('title')}>
                    Deserunt cillum deserunt exercitation Lorem
                    <div className={cx('edit')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faEdit} />
                        <FontAwesomeIcon className={cx('icon')} icon={faTrashAlt} />
                    </div>
                </h1>
                <div className={cx('info')}>
                    <span className={cx('author')}>
                        Author: <b>Somebody</b>
                    </span>
                    <span className={cx('date')}>1 hour ago</span>
                </div>
                <p className={cx('description')}>
                    Nostrud officia pariatur laborum consectetur non incididunt laborum id. Aliqua ipsum eiusmod
                    consectetur enim ut est. Exercitation quis reprehenderit quis aliquip. Nisi nulla sint voluptate do
                    laborum tempor aute labore eiusmod aliquip. Nostrud officia pariatur laborum consectetur non
                    incididunt laborum id. Aliqua ipsum eiusmod consectetur enim ut est. Exercitation quis reprehenderit
                    quis aliquip. Nisi nulla sint voluptate do laborum tempor aute labore eiusmod aliquip. Nostrud
                    officia pariatur laborum consectetur non incididunt laborum id. Aliqua ipsum eiusmod consectetur
                    enim ut est. Exercitation quis reprehenderit quis aliquip. Nisi nulla sint voluptate do laborum
                    tempor aute labore eiusmod aliquip. Nostrud officia pariatur laborum consectetur non incididunt
                    laborum id. Aliqua ipsum eiusmod consectetur enim ut est. Exercitation quis reprehenderit quis
                    aliquip. Nisi nulla sint voluptate do laborum tempor aute labore eiusmod aliquip.
                </p>
            </div>
        </div>
    );
}

export default SinglePost;
