import classNames from 'classnames/bind';
import styles from './SinglePost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '~/context/Context';

const cx = classNames.bind(styles);

function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({});
    const PF = 'http://127.0.0.1:5000/images/';
    const { user } = useContext(Context);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, { data: { username: user.username } });
            window.location.replace('/');
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async () => {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append('name', filename);
        data.append('file', file);
        try {
            await axios.post('/upload', data);
            window.location.replace(`/post/${post._id}`);
        } catch (err) {
            console.log(err);
        }
        try {
            await axios.put(`/posts/${post._id}`, { username: user.username, title, desc, photo: filename });
            setUpdateMode(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleBack = () => {
        setUpdateMode(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const getPost = async () => {
            const res = await axios.get('/posts/' + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('post-wrapper')}>
                {post.photo && <img className={cx('image')} src={PF + post.photo} alt="" />}
                {updateMode ? (
                    <>
                        <div>
                            <input
                                className={cx('input-file')}
                                type="file"
                                id="fileInput"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <input
                            className={cx('title-input')}
                            type="text"
                            value={title}
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </>
                ) : (
                    <h1 className={cx('title')}>
                        {title}
                        {post.username === user?.username && (
                            <div className={cx('edit')}>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faEdit}
                                    onClick={() => setUpdateMode(true)}
                                />
                                <FontAwesomeIcon className={cx('icon')} icon={faTrashAlt} onClick={handleDelete} />
                            </div>
                        )}
                    </h1>
                )}
                <div className={cx('info')}>
                    <span className={cx('author')}>
                        Author:
                        <Link to={`/?user=${post.username}`}>
                            <b> {post.username}</b>
                        </Link>
                    </span>
                    <span className={cx('date')}>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? (
                    <textarea
                        className={cx('description-input')}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ) : (
                    <p className={cx('description')}>{desc}</p>
                )}
                {updateMode && (
                    <div className={cx('buttons')}>
                        <button className={cx('confirm-update')} onClick={handleUpdate}>
                            Update
                        </button>
                        <button className={cx('confirm-update')} onClick={handleBack}>
                            Back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SinglePost;
