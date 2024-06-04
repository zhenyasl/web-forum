import React from 'react';
import PostItem from './PostItem';
import styles from './PostList.module.css';

const PostList = ({ posts }) => {
    return (
        <div className={styles.grid}>
            {posts.map((post) => (
                <PostItem
                    key={post.id}
                    id={post.id}
                    content={post.content}
                    username={post.username}
                    postDate={post.post_date}
                />
            ))}
        </div>
    );
};

export default PostList;
