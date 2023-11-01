import classNames from 'classnames/bind';
import styles from './SinglePost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({});

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get('/posts/' + path);
            setPost(res.data);
        };
        getPost();
    }, [path]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('post-wrapper')}>
                {post.photo && <img className={cx('image')} src={post.photo} alt="" />}
                <h1 className={cx('title')}>
                    {post.title}
                    <div className={cx('edit')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faEdit} />
                        <FontAwesomeIcon className={cx('icon')} icon={faTrashAlt} />
                    </div>
                </h1>
                <div className={cx('info')}>
                    <span className={cx('author')}>
                        Author:
                        <Link to={`/?user=${post.username}`}>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className={cx('date')}>{new Date(post.createdAt).toDateString()}</span>
                </div>
                <p className={cx('description')}>{post.desc}</p>
            </div>
        </div>
    );
}

export default SinglePost;
