import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from '~/components/layouts/components/Header';
import Posts from '~/components/Posts';
import Sidebar from '~/components/layouts/components/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Home() {
    const [posts, setPosts] = useState([]);
    const { search } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchPosts = async () => {
            const res = await axios.get('/posts' + search);
            setPosts(res.data);
        };
        fetchPosts();
    }, [search]);

    return (
        <>
            <Header />
            <div className={cx('wrapper')}>
                <Posts posts={posts} />
                <Sidebar />
            </div>
        </>
    );
}

export default Home;
