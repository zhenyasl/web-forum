import React, { Fragment, useState, useEffect, useContext } from "react";
import PostList from "../components/posts/PostList";
import useHttp from "../hooks/use-http";
import { getPosts, addPost } from "../utils/database-api";
import styles from "./Home.module.css";
import UserContext from "../context/UserContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isCreatePostVisible, setCreatePostVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const { user, updateUser } = useContext(UserContext);
  const {
    sendHttpRequest: getPostsRequest,
    status,
    data: loadedPosts,
  } = useHttp(getPosts);

  const {
    sendHttpRequest: sendHttpRequestAdd,
    status: statusAdd,
    data: post_id,
  } = useHttp(addPost);

  useEffect(() => {
    getPostsRequest();
  }, []);

  useEffect(() => {
    if (status === "completed") {
      //console.log(status);
      // console.log(loadedPosts);
      // for (const key in loadedPosts) {
      //   console.log(loadedPosts[key].content);
      // }
    }
  }, [status]);

  // useEffect(() => {
  //   if (status === "completed") {
  //     setPosts(loadedPosts);
  //   }
  // }, [status]);

  // const loadedPosts = [
  //   {
  //     id: "j1",
  //     topic: "Programming",
  //     text: `How many programmers does it take to change a light bulb?
  //           None - It's a hardware problem`,
  //   },
  //   {
  //     id: "j2",
  //     topic: "General",
  //     text: `How many bones are in the human hand?
  //           A handful of them.`,
  //   },
  // ];

  const toggleCreatePost = () => {
    setCreatePostVisible(!isCreatePostVisible);
    if (!isCreatePostVisible) {
      setNewPostTitle("");
    }
  };

  const handleCreatePost = async () => {
    const post = {
      content: newPostTitle,
    };

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      alert("You should be authorized to create post");
      return;
    }
    console.log("sending post");
    await sendHttpRequestAdd(post);

    setCreatePostVisible(false);
  };

  return (
    <Fragment>
      <button className={styles.createPostButton} onClick={toggleCreatePost}>
        Создать пост
      </button>

      {isCreatePostVisible && (
        <div className={styles.createPostBlock}>
          <input
            type="text"
            placeholder="Введите название поста"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className={styles.inputField}
          />
          <button className={styles.submitButton} onClick={handleCreatePost}>
            Отправить
          </button>
          <button className={styles.closeButton} onClick={toggleCreatePost}>
            Закрыть
          </button>
        </div>
      )}

      {status === "completed" && loadedPosts.length !== 0 && (
        <PostList posts={loadedPosts} />
      )}
    </Fragment>
  );
};

export default Home;
