import React, { Fragment, useState, useEffect } from 'react';
import CommentList from '../components/comments/CommentList';
import useHttp from '../hooks/use-http';
import { getUserComments } from '../utils/database-api';
import styles from './Home.module.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MyComments = (props) => {
    const {
        sendHttpRequest,
        status,
        data: loadedComments,
    } = useHttp(getUserComments);

    // const {
    //     sendHttpRequest: sendHttpRequestId,
    //     status: statusId,
    //     data,
    // } = useHttp(getId);

    useEffect(() => {
        const user = localStorage.getItem('name');
        console.log(user);
        sendHttpRequest(user);
    }, []);

    const updateCommentsList = () => {
        const user = localStorage.getItem('name');
        sendHttpRequest(user);
    };

    useEffect(() => {
        if (status === 'completed') {
            console.log(status);
            console.log(loadedComments);
            // for (const key in loadedPosts) {
            //   console.log(loadedPosts[key].content);
            // }
        }
    }, [status]);

    return (
        <Fragment>
            {status === 'completed' && loadedComments.length !== 0 && (
                <CommentList
                    comments={loadedComments}
                    isMyComments={true}
                    onUpdate={updateCommentsList}
                />
            )}
        </Fragment>
    );
};
export default MyComments;
