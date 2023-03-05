async function deletePostHandler(event) {
    event.preventDefault();

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'delete'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }

    else {
        alert(response.status);
    }
};

document.querySelector('#deletePost').addEventListener('click', deletePostHandler);