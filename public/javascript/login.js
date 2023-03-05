async function loginHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#inputUsername').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            })
        });
            //send to dashboard if response is good
        if (response.ok) {
            document.location.replace('/dashboard');
        }

        else {
            let result = await response.json();
            alert(result.message)
        }
    };

}

document.querySelector('.login-form').addEventListener('submit', loginHandler)