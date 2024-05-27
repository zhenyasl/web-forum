const DATABASE_ROOT_DOMAIN = "https://rebbit-d25da83b2fc6.herokuapp.com";

export async function getPosts() {
  const response = await fetch(`${DATABASE_ROOT_DOMAIN}/posts/1`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Posts fetching error.");
  }

  const convertedPosts = [];

  for (const key in data) {
    const post = {
      id: key,
      ...data[key],
    };

    convertedPosts.push(post);
  }

  return convertedPosts;
}

export async function getPost(postId) {
  const response = await fetch(`${DATABASE_ROOT_DOMAIN}/posts/${postId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Post fetching error.");
  }

  const convertedPost = {
    id: postId,
    ...data,
  };

  return convertedPost;
}
export async function addUser(UserData) {
  const response = await fetch(`${DATABASE_ROOT_DOMAIN}/auth/register`, {
    method: "POST",
    body: JSON.stringify(UserData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Post adding error.");
  }
}

export async function login(UserData) {
  const response = await fetch(`${DATABASE_ROOT_DOMAIN}/auth/login`, {
    method: "POST",
    body: JSON.stringify(UserData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Post adding error.");
  }
  return data;
}

export async function getName(id) {
  console.log(id);
  // const response = await fetch(`${DATABASE_ROOT_DOMAIN}/users/${id}`);
  // const data = await response.json();

  // if (!response.ok) {
  //   throw new Error(data.message || "Posts fetching error.");
  // }

  // return data;
}
export async function getUserComments(id) {
  //console.log(id);
  const response = await fetch(`${DATABASE_ROOT_DOMAIN}/users/user/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Posts fetching error.");
  }

  return data;
}

export async function getId(login) {
  //console.log(id);
  const response = await fetch(`${DATABASE_ROOT_DOMAIN}/username/${login}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Posts fetching error.");
  }

  return data;
}

export async function addPost(PostData) {
  console.log(localStorage.getItem("authToken"));
  console.log(PostData);
  const response = await fetch(`${DATABASE_ROOT_DOMAIN}/posts/1 `, {
    method: "POST",
    body: JSON.stringify(PostData),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("authToken"),
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Post adding error.");
  }

  return data;
}

export async function addComment(CommentData) {
  console.log(CommentData);
  console.log(localStorage.getItem("authToken"));
  //console.log(CommentData.post_Id);
  const comment = {
    content: CommentData.content,
  };
  const response = await fetch(`${DATABASE_ROOT_DOMAIN}/comments/4`, {
    method: "POST",
    body: JSON.stringify(CommentData),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("authToken"),
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.text || "Comment adding error.");
  }
  return data;
}

export async function getComments(postId) {
  const response = await fetch(`${DATABASE_ROOT_DOMAIN}/comments/${postId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Comments fetching error.");
  }

  const convertedComments = [];

  for (const key in data) {
    const comment = {
      id: key,
      ...data[key],
    };

    convertedComments.push(comment);
  }

  return convertedComments;
}
