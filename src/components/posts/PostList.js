import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getName } from "../../utils/database-api";
import useHttp from "../../hooks/use-http";

import PostItem from "./PostItem";
import styles from "./PostList.module.css";

// const sortJokes = (jokes, isAscending) => {
//   return jokes.sort((joke1, joke2) => {
//     if (isAscending) {
//       return joke1.id > joke2.id ? 1 : -1;
//     } else {
//       return joke1.id < joke2.id ? 1 : -1;
//     }
//   });
// };

const PostList = (props) => {
  const { sendHttpRequest, status, data } = useHttp(getName);

  const posts = props.posts;
  //console.log(posts);
  for (const key in posts) {
    const id = posts[key].user_id;
    //sendHttpRequest(id);
    //console.log(posts[key].user_id);
    posts[key].user_name = data;
  }

  return (
    <Fragment>
      <ul className={styles.list}>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            user_name={post.user_id}
            id={post.post_id}
            content={post.content}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default PostList;
