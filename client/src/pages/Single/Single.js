import classNames from 'classnames/bind';
import styles from './Single.module.scss';
import Sidebar from '~/components/layouts/components/Sidebar';
import SinglePost from '~/components/layouts/components/SinglePost';
import ToastMessage from '~/components/layouts/components/ToastMessage';

const cx = classNames.bind(styles);

function Single() {
    return (
        <div className={cx('wrapper')}>
            <ToastMessage />
            <SinglePost />
            <Sidebar />
        </div>
    );
}

export default Single;
