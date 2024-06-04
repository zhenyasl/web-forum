import React, { Fragment, useState, useEffect, useContext } from 'react';
import PostList from '../components/posts/PostList';
import useHttp from '../hooks/use-http';
import { getUserPostsByName } from '../utils/database-api';
import { useParams } from 'react-router-dom';
import styles from './Home.module.css';
import UserContext from '../context/UserContext';

const MyPosts = () => {
    //const { user, updateUser } = useContext(UserContext);
    const username = localStorage.getItem('name');
    const {
        sendHttpRequest: getPostsRequest,
        status,
        data: loadedPosts,
    } = useHttp(getUserPostsByName);

    useEffect(() => {
        console.log('user name :', username);
        getPostsRequest(username);
    }, []);

    useEffect(() => {
        if (status === 'completed') {
            //console.log(status);
            console.log(loadedPosts);
        }
    }, [status]);

    return (
        <Fragment>
            <div> </div>
            {status === 'completed' && loadedPosts.length !== 0 && (
                <PostList posts={loadedPosts} />
            )}
        </Fragment>
    );
};

export default MyPosts;
