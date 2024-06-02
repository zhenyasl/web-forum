import React, { Fragment, useState, useEffect, useContext } from 'react';
import PostList from '../components/posts/PostList';
import useHttp from '../hooks/use-http';
import { getUserPosts } from '../utils/database-api';
import { useParams } from 'react-router-dom';
import styles from './Home.module.css';
import UserContext from '../context/UserContext';

const User = () => {
    //const { user, updateUser } = useContext(UserContext);
    const { userId } = useParams();
    const {
        sendHttpRequest: getPostsRequest,
        status,
        data: loadedPosts,
    } = useHttp(getUserPosts);

    useEffect(() => {
        console.log('user id :', userId);
        getPostsRequest(userId);
    }, []);

    useEffect(() => {
        if (status === 'completed') {
            //console.log(status);
            console.log(loadedPosts);
        }
    }, [status]);

    return (
        <Fragment>
            {status === 'completed' && loadedPosts.length !== 0 && (
                <PostList posts={loadedPosts} />
            )}
        </Fragment>
    );
};

export default User;
