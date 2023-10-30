import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from '~/components/layouts/components/Header';
import Posts from '~/components/Posts';
import Sidebar from '~/components/layouts/components/Sidebar';

const cx = classNames.bind(styles);

function Home() {
    return (
        <>
            <Header />
            <div className={cx('wrapper')}>
                <Posts />
                <Sidebar />
            </div>
        </>
    );
}

export default Home;
