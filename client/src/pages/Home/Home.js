import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from '~/components/layouts/components/Header';
import Posts from '~/components/Posts';
import Sidebar from '~/components/layouts/components/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

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
            
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
        </>
    );
}

export default Home;
