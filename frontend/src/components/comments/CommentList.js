import { Fragment } from "react";

import CommentItem from "./CommentItem";
import styles from "../posts/PostItem.module.css";

const CommentList = (props) => {
  const comments = props.comments;

  return (
    <Fragment>
      <ul className={styles.list}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.user_id}
            content={comment.content}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default CommentList;
