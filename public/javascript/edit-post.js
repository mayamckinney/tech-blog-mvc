async function editPostHandler(event) {
    event.preventDefault();

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const postTitle = document.querySelector('#postTitle').value;
    const postArea = document.querySelector('#postArea').value;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'put',
        body: JSON.stringify({
            postTitle,
            postArea
        }),
        header: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }

    else {
        alert(response.status);
    }
};

document.querySelector('#editPost').addEventListener.apply('submit', editPostHandler);