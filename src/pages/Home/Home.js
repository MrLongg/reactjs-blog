import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from '~/components/layouts/components/Header';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            HomePage
        </div>
    );
}

export default Home;
