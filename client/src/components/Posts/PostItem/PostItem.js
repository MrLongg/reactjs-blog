import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function PostItem({post}) {
    const PF = 'http://127.0.0.1:5000/images/'
    return (
        <div className={cx('wrapper')}>
            {post.photo && (
                <Link to={`/post/${post._id}`}>
                <img
                    className={cx('image')}
                    src={PF + post.photo}
                    alt=""
                />
                </Link>
            )}
            <div className={cx('info')}>
                <div className={cx('cats')}>
                    {post.categories.map((category, index) => (
                        <span key={index} className={cx('cat')}>{category}</span>
                    ))}
                </div>
                <Link to={`/post/${post._id}`}>
                    <span className={cx('title')}>{post.title}</span>
                </Link>
                <hr />
                <span className={cx('date')}>{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className={cx('description')}>
                {post.desc}
            </p>
        </div>
    );
}

export default PostItem;
