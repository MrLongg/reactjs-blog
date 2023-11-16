import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

const cx = classNames.bind(styles);

function Pagination({ pageCount, handlePageClick }) {
    return (
        <div className={cx('wrapper')}>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName={cx('page-item')}
                pageLinkClassName={cx('page-link')}
                previousClassName={cx('page-item')}
                previousLinkClassName={cx('page-link')}
                nextClassName={cx('page-item')}
                nextLinkClassName={cx('page-link')}
                breakLabel="..."
                breakClassName={cx('page-item')}
                breakLinkClassName={cx('page-link')}
                containerClassName={cx('pagination')}
                activeClassName={cx('active')}
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

export default Pagination;
