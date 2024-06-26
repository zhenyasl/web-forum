import React, { Fragment, useState, useEffect, useContext } from 'react';
import PostList from '../components/posts/PostList';
import useHttp from '../hooks/use-http';
import { getPosts, addPost } from '../utils/database-api';
import styles from './Home.module.css';
import UserContext from '../context/UserContext';

const Home = () => {
    //const [posts, setPosts] = useState([]);
    const [isCreatePostVisible, setCreatePostVisible] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState('');
    //const { user, updateUser } = useContext(UserContext);
    const user = localStorage.getItem('name');
    const {
        sendHttpRequest: getPostsRequest,
        status,
        data: loadedPosts,
    } = useHttp(getPosts);

    const {
        sendHttpRequest: sendHttpRequestAddPost,
        status: statusAdd,
        data: post_id,
    } = useHttp(addPost);

    useEffect(() => {
        getPostsRequest();
    }, []);
    const updatePostsList = () => {
        getPostsRequest();
    };
    useEffect(() => {
        if (status === 'completed') {
            //console.log(status);
            // console.log(loadedPosts);
        }
    }, [status]);

    const toggleCreatePost = () => {
        setCreatePostVisible(!isCreatePostVisible);
        if (!isCreatePostVisible) {
            setNewPostTitle('');
        }
    };

    const handleCreatePost = async () => {
        if (!user) {
            alert('You have to be authorized to create post');
            return;
        }
        const post = {
            content: newPostTitle,
        };

        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            alert('You should be authorized to create post');
            return;
        }
        console.log('sending post');
        await sendHttpRequestAddPost(post)
            .then(() => {
                updatePostsList();
            })
            .catch((error) => {
                console.error('Error deleting comment:', error);
            });

        setCreatePostVisible(false);
    };

    return (
        <Fragment>
            <button
                className={styles.createPostButton}
                onClick={toggleCreatePost}
            >
                Create post
            </button>

            {isCreatePostVisible && (
                <div className={styles.createPostBlock}>
                    <input
                        type="text"
                        placeholder="post title"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        className={styles.inputField}
                    />
                    <button
                        className={styles.submitButton}
                        onClick={handleCreatePost}
                    >
                        Send
                    </button>
                    <button
                        className={styles.closeButton}
                        onClick={toggleCreatePost}
                    >
                        Close
                    </button>
                </div>
            )}

            {status === 'completed' && loadedPosts.length !== 0 && (
                <PostList posts={loadedPosts} />
            )}
        </Fragment>
    );
};

export default Home;
