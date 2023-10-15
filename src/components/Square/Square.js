import classNames from 'classnames/bind';
import styles from './Square.module.scss';

const cx = classNames.bind(styles);

function Square({ value, color, onSquareClick }) {
    return (
        <button 
            className={cx('square', {
                color
            })}
            onClick={onSquareClick}
        >
            {value}
        </button>
    )
}

export default Square;