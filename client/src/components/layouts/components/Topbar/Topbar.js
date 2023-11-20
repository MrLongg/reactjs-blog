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
import HeadlessTippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function Topbar() {
    const { user, dispatch } = useContext(Context);
    const [isInputActive, setIsInputActive] = useState(false);
    const [isFound, setIsFound] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [showResult, setShowResult] = useState(true);
    const location = useLocation();
    const PF = 'http://127.0.0.1:5000/images/';

    const [posts, setPosts] = useState([]);

    const [searchItem, setSearchItem] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [apiPosts, setApiPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/posts');
                setApiPosts(response.data);
                setFilteredPosts(response.data);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
        const filteredItems = apiPosts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredPosts(filteredItems);
    };

    const activateInput = () => {
        setIsInputActive(true);
    };

    const deactivateInput = () => {
        setIsInputActive(false);
    };

    const handleSearch = () => {
        setIsFound(false);
        setShowResult(false);
        const matchingPosts = filteredPosts.filter((post) =>
            post.title.toLowerCase().includes(searchItem.toLowerCase()),
        );

        if (matchingPosts.length > 0) {
            setIsFound(true);
            const postId = matchingPosts[0]._id;
            window.location.href = `http://127.0.0.1:3000/post/${postId}`;
        } else {
            setIsSubmit(true);
            setTimeout(() => {
                setIsSubmit(false);
            }, 3000);
        }
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleHideResult = () => {
        setShowResult(false);
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
                        <HeadlessTippy
                            interactive
                            appendTo={() => document.body}
                            visible={showResult && searchItem.length > 0}
                            render={(attrs) => (
                                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                    <h4 className={cx('search-title')}>Posts</h4>
                                    {filteredPosts.length === 0 ? (
                                        <p className={cx('search-item')}>No result found</p>
                                    ) : (
                                        filteredPosts.map((post) => (
                                            <p
                                                key={post._id}
                                                className={cx('search-item')}
                                                onClick={() => (window.location.href = `/post/${post._id}`)}
                                            >
                                                {post.title}
                                            </p>
                                        ))
                                    )}
                                </div>
                            )}
                            onClickOutside={handleHideResult}
                        >
                            <div className={cx('search')}>
                                <input
                                    autoFocus
                                    className={cx('search-input')}
                                    type="text"
                                    value={searchItem}
                                    onChange={handleInputChange}
                                    onFocus={() => setShowResult(true)}
                                    onKeyDown={handleEnterKeyPress}
                                    placeholder="Search posts..."
                                />
                                <button className={cx('button')} onClick={handleSearch}>
                                    <FontAwesomeIcon className={cx('icon-inner')} icon={faSearch} />
                                </button>
                                <button onClick={deactivateInput} className={cx('button')}>
                                    <FontAwesomeIcon className={cx('icon-inner')} icon={faXmark} />
                                </button>
                            </div>
                        </HeadlessTippy>
                    ) : (
                        <button onClick={activateInput} className={cx('button')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faSearch} />
                        </button>
                    )}
                </div>
            </div>
            {!isFound && isSubmit && (
                <ToastMessage
                    message={{
                        title: 'Không tìm thấy bài viết',
                        type: 'error',
                    }}
                />
            )}
        </div>
    );
}

export default Topbar;
