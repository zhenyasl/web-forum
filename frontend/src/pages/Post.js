import React, { Fragment, useState, useEffect } from 'react';
import CommentList from '../components/comments/CommentList';
import useHttp from '../hooks/use-http';
import { addComment, getComments } from '../utils/database-api';
import styles from './Home.module.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Post = (props) => {
    const [isCreatePostVisible, setCreateCommentVisible] = useState(false);
    const [newComment, setNewComment] = useState('');

    const { postId } = useParams();

    console.log(postId);

    const {
        sendHttpRequest,
        status,
        data: loadedComments,
    } = useHttp(getComments);

    const {
        sendHttpRequest: sendHttpRequestAdd,
        status: statusAdd,
        data,
    } = useHttp(addComment);

    useEffect(() => {
        sendHttpRequest(postId);
    }, []);

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
            //console.log(statusAdd);
            // for (const key in loadedPosts) {
            //   console.log(loadedPosts[key].content);
            // }
        }
    }, [statusAdd]);

    // const loadedComments = [
    //   {
    //     id: "j1",
    //     topic: "Programming",
    //     text: `How many programmers does it take to change a light bulb?
    //                 None - It's a hardware problem`,
    //   },
    //   {
    //     id: "j2",
    //     topic: "General",
    //     text: `How many bones are in the human hand?
    //                 A handful of them.`,
    //   },
    // ];

    const toggleCreateComment = () => {
        setCreateCommentVisible(!isCreatePostVisible);

        if (!isCreatePostVisible) {
            setNewComment('');
        }
    };
    const toggleDeletePost = () => {
        //delete comment
    };

    const handleCreateComment = () => {
        const comment = {
            content: newComment,
            post_Id: postId,
        };
        console.log('comment');
        console.log(comment);
        sendHttpRequestAdd(comment)
            .then(() => {
                updateCommentsList();
            })
            .catch((error) => {
                console.error('Error deleting comment:', error);
            });

        setCreateCommentVisible(false);
    };
    const updateCommentsList = () => {
        sendHttpRequest(postId);
    };

    // <Link to={`/`}>
    //             <button
    //                 className={styles.deletePostButton}
    //                 onClick={toggleDeletePost}
    //             >
    //                 Delete post
    //             </button>
    //         </Link>

    return (
        <Fragment>
            {/* <p className={styles.postTitle}>{topic}</p> */}
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
            {status === 'completed' && loadedComments.length !== 0 && (
                <CommentList
                    comments={loadedComments}
                    onUpdate={updateCommentsList}
                />
            )}
        </Fragment>
    );
};
export default Post;
