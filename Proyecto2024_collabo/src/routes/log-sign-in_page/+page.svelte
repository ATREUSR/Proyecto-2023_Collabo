<script lang="ts">
    import { goto } from '$app/navigation';
    import Modal from '../Modal.svelte'; 

    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let showModal = false;
    let showModalError = false;
    let showModalRegister = false;
    let showModalErrorRegister = false;
    let showModalPassword = false;

    async function register() {
        const userData = { name, email, password};

        if (password !== confirmPassword) {
            showModalPassword = true;
            return;
        }

        fetch("http://localhost:8003/register", {
          method: 'POST',
          credentials: "include",
          headers: {
                //'Authorization': 'Basic '+btoa('username:password'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true'
            },
          body: JSON.stringify(userData)
        }).then((response) => {
            const cookieHeader = response.headers.get('Set-Cookie');
            if (cookieHeader) {
                const cookies = cookieHeader.split(', ');
            }
            console.log(response.headers.getSetCookie());
            //console.log(response);
            if(response.ok){
                showModalRegister = true; 
            } 
            else {
                showModalErrorRegister = true;
            }
        }).catch(err => {
          console.log(err);
        })

        //console.log(userData); 
    }

    async function logIn() {
        const userData = { email, password };
        const response = await fetch("https://proyecto2024collaboal.vercel.app/login", {
          method: 'POST',
          headers: {
                //'Authorization': 'Basic '+btoa('username:password'),
                'Content-Type': 'application/json'
            },
          body: JSON.stringify(userData),
          credentials: 'include',
        })

        if (!response.ok) {
            // TODO: Handle not ok
            console.log(response);
            showModalError = true;

            return;
        }

        console.log(response);
        const cookieHeader = response.headers.get('Set-Cookie');
        if (cookieHeader) {
            const cookies = cookieHeader.split(', ');
        }
        console.log(response.headers.getSetCookie());
        if(response.ok){
            showModal = true; 
        }
        //console.log(userData); 
        
    }

    function handleModalClose() {
        showModal = false;
        goto(`/discover_page`);
    }

    function handleModalCloseRegister() {
        showModalRegister = false;
        toggleSignIn();
    }

    function handleModalErrorClose() {
        showModalError = false;
    }

    function handleModalErrorCloseRegister() {
        showModalErrorRegister = false;
    }

    function handleModalPasswordClose() {
        showModalPassword = false;
    }

    function toggleLogIn() {
        const logInContainer = document.querySelector('.log-in-container') as HTMLElement;
        const signInContainer = document.querySelector('.sign-in-container') as HTMLElement;
    
        if (logInContainer && signInContainer) {
            logInContainer.style.display = 'block';
            signInContainer.style.display = 'none';
            email = '';
            password = '';
            name = '';
            confirmPassword = '';
        }
    }
    
    function toggleSignIn() {
        const logInContainer = document.querySelector('.log-in-container') as HTMLElement;
        const signInContainer = document.querySelector('.sign-in-container') as HTMLElement;
    
        if (logInContainer && signInContainer) {
            logInContainer.style.display = 'none';
            signInContainer.style.display = 'block';
            email = '';
            password = '';
        }
    }
</script>


<div class="log-sign-in-container">
    <div class="log-in-container">
        <h1>Create account</h1>
        <div class="gradient-line"></div>
        <form on:submit|preventDefault={register}>
            <div class="input">
                <label for="">Username</label>
                <input bind:value={name} type="text" placeholder="example" required>
            </div>
            <div class="input">
                <label for="">Email</label>
                <input bind:value={email} type="email" placeholder="example@gmail.com" required>
            </div>
            <div class="input">
                <label for="">Password</label>
                <input bind:value={password} type="password" placeholder="password" required>
            </div>
            <div class="input">
                <label for="">Confirm Password</label>
                <input bind:value={confirmPassword} type="password" placeholder="password" required>
            </div>
            <div class="input">
                <input type="submit" class="submit-btn" placeholder="Register" required>
            </div>
        </form>
        <!-- svelte-ignore a11y-interactive-supports-focus -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a class="toggle-link" on:click={() => toggleSignIn()}>¿Ya tenés cuenta?</a>
    </div>
    <div class="sign-in-container" >
        <h1>Log in</h1>
        <div class="gradient-line"></div>
        <form on:submit|preventDefault={logIn}>
            <div class="input">
                <label for="">Email</label>
                <input bind:value={email} type="email" placeholder="example@gmail.com" required>
            </div>
            <div class="input">
                <label for="">Password</label>
                <input bind:value={password} type="password" placeholder="password" required>
            </div>
            <div class="input">
                <input type="submit" class="submit-btn" placeholder="Register" required>
            </div>
        </form>
        <!-- svelte-ignore a11y-interactive-supports-focus -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a class="toggle-link" on:click={() => toggleLogIn()}>¿No tenés cuenta?</a>
    </div>
</div>

{#if showModal}
    <Modal message="log in successfully!" onClose={handleModalClose} />
{/if}

{#if showModalRegister}
    <Modal message="register successfully!" onClose={handleModalCloseRegister} />
{/if}

{#if showModalError}
    <Modal message="data not found" onClose={handleModalErrorClose} />
{/if}

{#if showModalErrorRegister}
    <Modal message="That user already exists" onClose={handleModalErrorCloseRegister} />
{/if}

{#if showModalPassword}
    <Modal message="Passwords do not match" onClose={handleModalPasswordClose} />
{/if}

<style>
    @import url('https://fonts.cdnfonts.com/css/utendo');

    *{
        font-family: 'Utendo', sans-serif;
    }

    .log-sign-in-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        margin: auto;
        padding: 0;
    }

    .log-in-container {
        transform: translateX(-30%);
        display: none;
    }

    .log-in-container h1 {
        display: flex;
        justify-content: center;    
        align-items: center;
        transform: translateX(30%);
    }

    .gradient-line {
        height: 6px;
        width: 170%;
        background: linear-gradient(to right, #B700BD, #4800B6);
        border-radius: 5px;
        margin-bottom: 25px;
    }
    
    .log-in-container label {
        font-weight: 600;
    }

    input {
        width: 165%;
        height: 30px;
        padding-top: 5px;
        padding-left: 10px;
        margin-top: 5px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-right: 20px;
        background-color: #E9E9E9;
        border: 0.5px solid #E9E9E9;
        font-family: 'Utendo', sans-serif;
        font-weight: 600;
    }

    input::placeholder {
        color: #a0a8a2;
        font-weight: 600;
    }


    .submit-btn{
        width: 170%;
        background-color: #4800B6;
        border-radius: 5px;
        border: 0.5px solid #E9E9E9;
        color: #fff;
        text-align: center;
        font-weight: 600;
        font-size: medium;
        margin-top: 20px;
    }

    .submit-btn:hover {
        background-color: #935ce0;
        cursor: pointer;
    }

    .sign-in-container {
        transform: translateX(-30%);
    }

    .sign-in-container h1 {
        display: flex;
        justify-content: center;    
        align-items: center;
        transform: translateX(30%);
    }
    
    .sign-in-container label {
        font-weight: 600;
    }

    .toggle-link {
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(37%);
        margin-top: 20px;
        color: #4800B6;
        font-weight: 600;
        text-decoration: underline;
    }

    .toggle-link:hover {
        cursor: pointer;
        color: #935ce0;
    }
</style>