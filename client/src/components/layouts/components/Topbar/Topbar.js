import classNames from 'classnames/bind';
import styles from './Topbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { Context } from '~/context/Context';
import axios from 'axios';
import ToastMessage from '../ToastMessage';

const cx = classNames.bind(styles);

function Topbar() {
    const { user, dispatch } = useContext(Context);
    const [isInputActive, setIsInputActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const PF = 'http://127.0.0.1:5000/images/';

    const [posts, setPosts] = useState([]);
    const { search } = useLocation();

    // Fetch posts on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch posts from your API or data source
                const response = await axios.get('/posts');
                setPosts(response.data); // Assuming response.data contains posts
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [search]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const activateInput = () => {
        setIsInputActive(true);
    };

    const deactivateInput = () => {
        setIsInputActive(false);
    };

    const handleSearch = () => {
        const matchingPosts = posts.filter(
            (post) => post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        if (matchingPosts.length > 0) {
            const postId = matchingPosts[0]._id; // Considering only the first match for simplicity
            window.location.href = `http://127.0.0.1:3000/post/${postId}`;
        } else {
            <ToastMessage />
            console.log('No results found');
        }
    };

    const goToPageOne = () => {
        if (location.pathname !== 'http://127.0.0.1:3000/') {
            window.location.href = 'http://127.0.0.1:3000/';
        }
    };

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <FontAwesomeIcon className={cx('top-icon')} icon={faFacebook} />
                <FontAwesomeIcon className={cx('top-icon')} icon={faTwitter} />
                <FontAwesomeIcon className={cx('top-icon')} icon={faInstagram} />
                <FontAwesomeIcon className={cx('top-icon')} icon={faPinterest} />
            </div>
            <div className={cx('center')}>
                <ul className={cx('center-list')}>
                    <li className={cx('list-item')} onClick={goToPageOne}>
                        <Link to="/">HOME</Link>
                    </li>
                    <li className={cx('list-item')}>
                        <Link to="/about">ABOUT</Link>
                    </li>
                    <li className={cx('list-item')}>
                        <Link to="/">CONTACT</Link>
                    </li>
                    <li className={cx('list-item')}>
                        <Link to="/write">WRITE</Link>
                    </li>
                    <li className={cx('list-item')} onClick={handleLogout}>
                        {user && 'LOGOUT'}
                    </li>
                </ul>
            </div>
            <div className={cx('right')}>
                {user ? (
                    <Link to="/settings">
                        <img className={cx('avatar')} src={PF + user.profilePic} alt="Hình ảnh đại diện" />
                    </Link>
                ) : (
                    <ul className={cx('center-list')}>
                        <li className={cx('list-item')}>
                            <Link to="/login">LOGIN</Link>
                        </li>
                        <li className={cx('list-item')}>
                            <Link to="/register">REGISTER</Link>
                        </li>
                    </ul>
                )}
                <div className={cx('button-wrapper')}>
                    {isInputActive ? (
                        <div>
                            <input
                                className={cx('search-input')}
                                type="text"
                                value={searchTerm}
                                onChange={handleInputChange}
                                placeholder="Search posts..."
                            />
                            <button className={cx('button')} onClick={handleSearch}>
                                <FontAwesomeIcon className={cx('icon-inner')} icon={faSearch} />
                            </button>
                            <button onClick={deactivateInput} className={cx('button')}>
                                <FontAwesomeIcon className={cx('icon-inner')} icon={faXmark} />
                            </button>
                        </div>
                    ) : (
                        <button onClick={activateInput} className={cx('button')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faSearch} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Topbar;
