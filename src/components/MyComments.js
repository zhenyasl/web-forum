import React, { Fragment, useState } from "react";
import CommentList from "./comments/CommentList";
import useHttp from "../hooks/use-http";
import { getComments } from "../utils/database-api";
import styles from "../pages/Home.module.css";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const MyComments = (props) => {
  const user = localStorage.user;
  //getComments

  //console.log(topic);

  const myLoadedComments = [
    {
      id: "j1",
      topic: "Programming",
      text: `How many programmers does it take to change a light bulb?
                  None - It's a hardware problem`,
    },
    {
      id: "j2",
      topic: "General",
      text: `How many bones are in the human hand?
                  A handful of them.`,
    },
  ];

  return <CommentList comments={myLoadedComments} />;
};
export default MyComments;
