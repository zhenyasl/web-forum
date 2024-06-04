import React, { Fragment, useState, useEffect } from 'react';
import CommentList from '../components/comments/CommentList';
import useHttp from '../hooks/use-http';
import {
    addComment,
    getComments,
    getPost,
    deletePost,
} from '../utils/database-api';
import styles from './Home.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PostList from '../components/posts/PostList';

const Post = (props) => {
    const [isCreatePostVisible, setCreateCommentVisible] = useState(false);
    const [newComment, setNewComment] = useState('');
    const user = localStorage.getItem('name');
    //const userId = localStorage.getItem('id');
    const { postId } = useParams();
    const navigate = useNavigate();

    console.log(postId);
    const {
        sendHttpRequest: getPostRequest,
        status: getPostStatus,
        data: loadedPost,
    } = useHttp(getPost);

    const {
        sendHttpRequest: sendHttpRequestGetComments,
        status,
        data: loadedComments,
    } = useHttp(getComments);

    const {
        sendHttpRequest: sendHttpRequestAdd,
        status: statusAdd,
        data: addedComment,
    } = useHttp(addComment);

    const { sendHttpRequest: sendHttpRequestDeletePost } = useHttp(deletePost);

    useEffect(() => {
        sendHttpRequestGetComments(postId);
    }, []);
    useEffect(() => {
        getPostRequest(postId);
    }, []);

    useEffect(() => {
        if (getPostStatus === 'completed') {
            console.log('getPostStatus completed');
            console.log(loadedPost[0].username);
            // for (const key in loadedPosts) {
            //   console.log(loadedPosts[key].content);
            // }
        }
    }, [getPostStatus]);
    useEffect(() => {
        if (status === 'completed') {
            console.log(status);
            console.log(loadedComments);
            // for (const key in loadedPosts) {
            //   console.log(loadedPosts[key].content);
            // }
        }
    }, [status]);
    useEffect(() => {
        if (statusAdd === 'completed') {
            console.log(addedComment);
            updateCommentsList();
            //console.log(statusAdd);
            // for (const key in loadedPosts) {
            //   console.log(loadedPosts[key].content);
            // }
        }
    }, [statusAdd]);

    const toggleCreateComment = () => {
        setCreateCommentVisible(!isCreatePostVisible);

        if (!isCreatePostVisible) {
            setNewComment('');
        }
    };
    const HandleDeletePost = () => {
        const post = {
            post_Id: postId,
        };
        sendHttpRequestDeletePost(post)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    };

    const handleCreateComment = () => {
        if (!user) {
            alert('You have to be authorized to create a comment');
            return;
        }
        const comment = {
            content: newComment,
            post_Id: postId,
        };
        console.log('comment');
        console.log(comment);
        sendHttpRequestAdd(comment);

        setCreateCommentVisible(false);
    };

    const updateCommentsList = () => {
        sendHttpRequestGetComments(postId);
    };

    return (
        <Fragment>
            {/* <p className={styles.postTitle}>{topic}</p> */}

            {status === 'completed' && getPostStatus === 'completed' && (
                <div>
                    <div className={styles.centeredContent}>
                        <PostList posts={loadedPost} />
                        {loadedPost[0].username === user && (
                            <Link to={`/`}>
                                <button
                                    className={styles.deletePostButton}
                                    onClick={HandleDeletePost}
                                >
                                    Delete post
                                </button>
                            </Link>
                        )}
                    </div>
                    <button
                        className={styles.createPostButton}
                        onClick={toggleCreateComment}
                    >
                        Create comment
                    </button>

                    {isCreatePostVisible && (
                        <div className={styles.createPostBlock}>
                            <input
                                type="text"
                                placeholder="write comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className={styles.inputField}
                            />
                            <button
                                className={styles.submitButton}
                                onClick={handleCreateComment}
                            >
                                Send
                            </button>
                            <button
                                className={styles.closeButton}
                                onClick={toggleCreateComment}
                            >
                                Close
                            </button>
                        </div>
                    )}

                    <CommentList
                        comments={loadedComments}
                        onUpdate={updateCommentsList}
                    />
                </div>
            )}
        </Fragment>
    );
};
export default Post;
