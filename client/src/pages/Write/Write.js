import classNames from 'classnames/bind';
import styles from './Write.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '~/context/Context';

const cx = classNames.bind(styles);

function Write() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            newPost.photo = filename;
            try {
                await axios.post('/upload', data);
            } catch (err) {
                console.log(err)
            }
        }
        try {
            const res = await axios.post('/posts', newPost);
            window.location.replace('/post/' + res.data._id);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {file && <img className={cx('image')} src={URL.createObjectURL(file)} alt="" />}
            <form className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label htmlFor="fileInput">
                        <FontAwesomeIcon className={cx('icon')} icon={faPlus} />
                    </label>
                    <input
                        className={cx('upload')}
                        type="file"
                        id="fileInput"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        className={cx('title')}
                        type="text"
                        placeholder="Title"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={cx('form-group')}>
                    <textarea
                        className={cx('content')}
                        placeholder="Tell your story..."
                        type="text"
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className={cx('submit')} type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
}

export default Write;
