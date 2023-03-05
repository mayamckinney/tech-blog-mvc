async function signupHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#inputUsername').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            alert('Thank you for created an account! Logging you in...');
            document.location.replace('/dashboard');
        }

        else {
            alert(result.message);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupHandler);