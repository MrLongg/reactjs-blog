import classNames from 'classnames/bind';
import styles from './Posts.module.scss';
import PostItem from './PostItem';

const cx = classNames.bind(styles);

function Posts({posts}) {
    return (
        <div className={cx('wrapper')}>
            {posts.map((post, index) => (
                <PostItem key={index} post={post}/>
            ))}
        </div>
    );
}

export default Posts;
