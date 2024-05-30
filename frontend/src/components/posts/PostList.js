import { Fragment } from 'react';
//import { getName } from '../../utils/database-api';
//import useHttp from '../../hooks/use-http';

import PostItem from './PostItem';
import styles from './PostList.module.css';

const PostList = (props) => {
    const posts = props.posts;
    console.log(posts);
    // for (const key in posts) {
    //     const id = posts[key].username;
    //     //sendHttpRequest(id);
    //     //console.log(posts[key].user_id);
    //     posts[key].user_name = data;
    // }

    return (
        <Fragment>
            <ul className={styles.list}>
                {posts.map((post) => (
                    <PostItem
                        key={post.id}
                        username={post.username}
                        id={post.id}
                        content={post.content}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default PostList;
