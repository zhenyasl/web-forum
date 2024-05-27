import { Link, useLocation } from "react-router-dom";
import styles from "./PostItem.module.css";
import React, { useState } from "react";

const PostItem = (props) => {
  const { id, text, topic } = props;
  return (
    <li className={styles.item}>
      <Link to={`/post/${props.id}`}>
        <figure>
          <blockquote>
            <p>{props.content}</p>
          </blockquote>
          <figcaption>{props.user_name}</figcaption>
        </figure>
      </Link>
    </li>
  );
};

export default PostItem;
