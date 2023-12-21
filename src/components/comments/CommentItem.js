import styles from "../posts/PostItem.module.css";

const CommentItem = (props) => {
  const deleteCommentHandler = () => {
    //
  };
  return (
    <li className={styles.item}>
      <figure>
        <blockquote>
          <p>{props.content}</p>
        </blockquote>
        <figcaption>{props.id}</figcaption>
      </figure>
      <button className={styles.redButton} onClick={deleteCommentHandler}>
        delete
      </button>
    </li>
  );
};

export default CommentItem;
