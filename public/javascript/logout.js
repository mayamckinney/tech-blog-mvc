async function logoutHandler() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    }

    else {
        alert(response.status);
    }
};

document.querySelector('#logout').addEventListener('clock', logoutHandler);