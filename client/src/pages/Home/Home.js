import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from '~/components/layouts/components/Header';
import Posts from '~/components/Posts';
import Sidebar from '~/components/layouts/components/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Pagination from '~/components/layouts/components/Pagination';

const cx = classNames.bind(styles);

function Home() {
    const [posts, setPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const { search } = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 4;

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/posts' + search);
            setPosts(res.data);
            setPageCount(Math.ceil(res.data.length / postsPerPage));
        };
        window.scrollTo(0, 0);
        fetchPosts();
    }, [search, postsPerPage]);

    const offset = currentPage * postsPerPage;
    const currentPosts = posts.slice(offset, offset + postsPerPage);

    return (
        <>
            <Header />
            <div className={cx('wrapper')}>
                <Posts posts={currentPosts} />
                <Sidebar />
            </div>
                <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
        </>
    );
}

export default Home;
