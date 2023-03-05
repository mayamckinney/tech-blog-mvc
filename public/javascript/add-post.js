async function newPostHandler(event) {
    event.preventDevault();

    const title = document.querySelector('#postTitle').value;
    const postArea = document.querySelector('#postArea').value;

    const response = await fetch('/api/posts', {
        method: 'post',
        body: JSON.stringify({
            title,
            postArea
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }

    else {
        alert(response.status)
    }
}

document.querySelector('#makePost').addEventListener('submit', newPostHandler);