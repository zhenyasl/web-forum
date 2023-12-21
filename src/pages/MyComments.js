import React, { Fragment, useState, useEffect } from "react";
import CommentList from "../components/comments/CommentList";
import useHttp from "../hooks/use-http";
import {
  addComment,
  getUserComments,
  getComments,
  getId,
} from "../utils/database-api";
import styles from "./Home.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const MyComments = (props) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("name");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const {
    sendHttpRequest,
    status,
    data: loadedComments,
  } = useHttp(getUserComments);

  const {
    sendHttpRequest: sendHttpRequestId,
    status: statusId,
    data,
  } = useHttp(getId);

  //   useEffect(() => {
  //     //alert("userId");
  //     const userId = sendHttpRequestId(user);
  //     //alert("getcomments");
  //     sendHttpRequest(userId);
  //   });

  useEffect(() => {
    if (status === "completed") {
      console.log(status);
      console.log(loadedComments);
      // for (const key in loadedPosts) {
      //   console.log(loadedPosts[key].content);
      // }
    }
  }, [status]);
  useEffect(() => {
    if (statusId === "completed") {
      console.log(statusId);
      console.log(data);
      // for (const key in loadedPosts) {
      //   console.log(loadedPosts[key].content);
      // }
    }
  }, [statusId]);

  return (
    <Fragment>
      {status === "completed" && loadedComments.length !== 0 && (
        <CommentList comments={loadedComments} />
      )}
    </Fragment>
  );
};
export default MyComments;
