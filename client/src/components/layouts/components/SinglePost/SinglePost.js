import classNames from 'classnames/bind';
import styles from './SinglePost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '~/context/Context';
import ToastMessage from '../ToastMessage';

const cx = classNames.bind(styles);

function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const PF = 'http://127.0.0.1:5000/images/';
    const { user } = useContext(Context);
    const [post, setPost] = useState({});
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, { data: { username: user.username } });
            window.location.replace('/');
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async () => {
        setIsSuccess(false);
        setIsSubmitted(false);
        try {
            if (file) {
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append('name', filename);
                data.append('file', file);
                const payload = {
                    username: user.username,
                    title,
                    desc,
                    photo: filename,
                };
                await axios.post('/upload', data);

                await axios.put(`/posts/${post._id}`, payload);
                setUpdateMode(false);
                setIsSuccess(true);
                setIsSubmitted(true);

                // Update the component state with the new post data
                setPost((prevPost) => ({
                    ...prevPost,
                    title,
                    desc,
                    photo: filename,
                }));
            } else {
                await axios.put(`/posts/${post._id}`, { username: user.username, title, desc });
                setUpdateMode(false);
                setIsSuccess(true);
                setIsSubmitted(true);

                // Update the component state with the new post data
                setPost((prevPost) => ({
                    ...prevPost,
                    title,
                    desc,
                }));
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get('/posts/' + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path]);

    const handleBack = () => {
        setUpdateMode(false);
    };

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
            {isSuccess && isSubmitted && (
                <ToastMessage
                    message={{
                        title: 'Thay đổi thành công',
                        type: 'success',
                    }}
                />
            )}
            {!isSuccess && isSubmitted && (
                <ToastMessage
                    message={{
                        title: 'Thay đổi không thành công',
                        type: 'error',
                    }}
                />
            )}
        </div>
    );
}

export default SinglePost;
