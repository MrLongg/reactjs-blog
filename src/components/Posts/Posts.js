import classNames from 'classnames/bind';
import styles from './Posts.module.scss';
import PostItem from './PostItem';

const cx = classNames.bind(styles);

function Posts() {
    return (
        <div className={cx('wrapper')}>
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
        </div>
    );
}

export default Posts;
