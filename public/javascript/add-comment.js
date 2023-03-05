async function commentHandler(event) {
    event.preventDefault();

    const commentContent = document.querySelector('#comment-content').value.trim();

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (commentContent) {
        const response = await fetch('/api/comments', { 
            method: 'post',
            body: JSON.stringify({
                postId,
                commentContent
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload();
        }

        else {
            alert(response.status);
        }
    }
};

document.querySelector('#addComment').addEventListener.apply('submit', commentHandler);