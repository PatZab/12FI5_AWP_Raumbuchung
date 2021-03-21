const myForm = document.getElementById('submitBtn');
myForm.addEventListener('click', async function(e){
    const userName = document.getElementById("user_name");
    const userPassword = document.getElementById("user_password");
    const user_name = userName.value;
    const user_password = userPassword.value;

    const data = { user_name, user_password};
    const options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'Post',
        body: JSON.stringify(data)
    }
    const res = await fetch('/api/auth/login', options);
    const res_data = await res.json();
    console.log(res_data.login);
    if (res_data.login == false){
        alert("Falsche Anmeldedaten");
    }
    else {
        sessionStorage.setItem( 'name' , res_data.name );
        window.location.href='home.html';
    }
});