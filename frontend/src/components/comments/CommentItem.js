import styles from '../comments/Comment.module.css';
import useHttp from '../../hooks/use-http';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../utils/database-api';

const CommentItem = (props) => {
    const { sendHttpRequest } = useHttp(deleteComment);
    const name = localStorage.getItem('name');
    const formattedDate = new Date(props.commentDate).toLocaleString();

    const deleteCommentHandler = () => {
        const comment = {
            comment_Id: props.id,
        };
        sendHttpRequest(comment)
            .then(() => {
                props.onDelete();
            })
            .catch((error) => {
                console.error('Error deleting comment:', error);
            });
    };

    return (
        <li className={styles.item}>
            <div className={styles.header}>
                {!props.isMyComments && (
                    <Link
                        to={`/user/${props.username}`}
                        className={styles.username}
                    >
                        {props.username}
                    </Link>
                )}
                {!props.isMyComments && <span className={styles.dot}>•</span>}
                <span className={styles.date}>{formattedDate}</span>
                {props.username === name && (
                    <button
                        className={styles.deleteButton}
                        onClick={deleteCommentHandler}
                    >
                        delete
                    </button>
                )}
            </div>
            {!props.isMyComments && (
                <div className={styles.content}>
                    <p>{props.content}</p>
                </div>
            )}
            {props.isMyComments && (
                <div className={styles.content}>
                    <Link to={`/post/${props.post_id}`}>
                        <p>{props.content}</p>
                    </Link>
                </div>
            )}
        </li>
    );
};

export default CommentItem;
