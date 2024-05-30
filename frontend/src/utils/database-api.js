const DATABASE_ROOT_DOMAIN = 'https://project-forum-24da24271a0a.herokuapp.com';

export async function getPosts() {
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/posts/2`); //всі пости поки прикріплені до 2го треду, поки проект не масштабований і тредів немає
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Posts fetching error.');
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
        throw new Error(data.message || 'Post fetching error.');
    }

    const convertedPost = {
        id: postId,
        ...data,
    };

    return convertedPost;
}
export async function addUser(UserData) {
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(UserData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Post adding error.');
    }
}

export async function login(UserData) {
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(UserData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Post adding error.');
    }
    return data;
}

// export async function getName(id) {
//     console.log(id);
//     // const response = await fetch(`${DATABASE_ROOT_DOMAIN}/users/${id}`);
//     // const data = await response.json();

//     // if (!response.ok) {
//     //   throw new Error(data.message || "Posts fetching error.");
//     // }

//     // return data;
// }
export async function getUserComments(username) {
    console.log(username);
    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/comments/users/${username}`
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Posts fetching error.');
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

export async function getId(login) {
    //console.log(id);
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/username/${login}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Posts fetching error.');
    }

    return data;
}

export async function addPost(PostData) {
    const token = localStorage.getItem('authToken');
    console.log(localStorage.getItem('authToken'));
    console.log(PostData);
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/posts/2`, {
        //всі пости поки прикріплені до 2го треду, поки проект не масштабований і тредів немає
        method: 'POST',
        body: JSON.stringify(PostData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Post adding error.');
    }

    return data;
}

export async function addComment(CommentData) {
    const token = localStorage.getItem('authToken');
    // console.log(CommentData);
    // console.log(localStorage.getItem('authToken'));
    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/comments/${CommentData.post_Id}`,
        {
            method: 'POST',
            body: JSON.stringify(CommentData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        }
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.text || 'Comment adding error.');
    }
    return data;
}

export async function getComments(postId) {
    const response = await fetch(`${DATABASE_ROOT_DOMAIN}/comments/${postId}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Comments fetching error.');
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

export async function deleteComment(CommentData) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(
        `${DATABASE_ROOT_DOMAIN}/comments/${CommentData.comment_Id}`,
        {
            method: 'DELETE',
            body: JSON.stringify(CommentData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        }
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.text || 'Comment adding error.');
    }
    return data;
}
