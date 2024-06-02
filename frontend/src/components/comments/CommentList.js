import { Fragment } from 'react';

import CommentItem from './CommentItem';
import styles from '../posts/PostItem.module.css';

const CommentList = (props) => {
    const comments = props.comments;
    let isMyComments = true;
    if (!props.isMyComments) {
        isMyComments = false;
    }

    const handleCommentDelete = () => {
        props.onUpdate();
    };

    return (
        <Fragment>
            <ul className={styles.list}>
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        id={comment.id}
                        post_id={comment.post_id}
                        username={comment.username}
                        content={comment.content}
                        isMyComments={isMyComments}
                        onDelete={handleCommentDelete}
                        commentDate={comment.comment_date}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default CommentList;
