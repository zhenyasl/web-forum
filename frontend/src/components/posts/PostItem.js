import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PostItem.module.css';

const PostItem = ({ id, content, username, postDate }) => {
    const formattedDate = new Date(postDate).toLocaleString();

    return (
        <div className={styles.card}>
            <div>
                <Link to={`/user/${id}`} className={styles.link}>
                    <span className={styles.author}>{username}</span>
                </Link>
                <span className={styles.dot}>•</span>
                <span className={styles.date}>{formattedDate}</span>
            </div>
            <Link to={`/post/${id}`} className={styles.link}>
                <div className={styles.content}>
                    <p>{content}</p>
                </div>
            </Link>
        </div>
    );
};

export default PostItem;
