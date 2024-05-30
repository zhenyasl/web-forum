import styles from '../posts/PostItem.module.css';
import useHttp from '../../hooks/use-http';
import { Link, useLocation } from 'react-router-dom';
import { deleteComment } from '../../utils/database-api';

const CommentItem = (props) => {
    const { sendHttpRequest, status, data } = useHttp(deleteComment);
    const name = localStorage.getItem('name');

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

    if (props.isMyComments) {
        return (
            <li className={styles.item}>
                <Link to={`/post/${props.post_id}`}>
                    <figure>
                        <blockquote>
                            <p>{props.content}</p>
                        </blockquote>
                    </figure>
                </Link>
                {props.username === name && (
                    <button
                        className={styles.redButton}
                        onClick={deleteCommentHandler}
                    >
                        delete
                    </button>
                )}
            </li>
        );
    } else {
        return (
            <li className={styles.item}>
                <figure>
                    <blockquote>
                        <p>{props.content}</p>
                    </blockquote>
                    <figcaption>{props.username}</figcaption>
                </figure>
                {props.username === name && (
                    <button
                        className={styles.redButton}
                        onClick={deleteCommentHandler}
                    >
                        delete
                    </button>
                )}
            </li>
        );
    }
};

export default CommentItem;
