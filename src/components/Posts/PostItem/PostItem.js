import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

function PostItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('image')}
                src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
            />
            <div className={cx('info')}>
                <div className={cx('cats')}>
                    <span className={cx('cat')}>Music</span>
                    <span className={cx('cat')}>Life</span>
                </div>
                <span className={cx('title')}>Nisi in labore dolor anim</span>
                <hr />
                <span className={cx('date')}>1 hour ago</span>
            </div>
            <p className={cx('description')}>
                Mollit velit occaecat dolor anim officia incididunt pariatur consectetur anim laborum nulla veniam
                culpa. Anim adipisicing esse adipisicing nulla nisi dolore ad voluptate Lorem. Cupidatat quis esse ut
                laboris aliqua ut deserunt ex amet aliqua consequat sit elit ullamco. Tempor duis tempor commodo
                consectetur amet adipisicing ex ullamco. Dolore aute consequat incididunt irure ut ea duis qui amet.
                Eiusmod nulla occaecat labore sunt pariatur. Voluptate sint tempor cupidatat do et.
            </p>
        </div>
    );
}

export default PostItem;
