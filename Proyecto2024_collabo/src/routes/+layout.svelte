<script>
    import logo from './images/Logo_home.png';
    import logoborde from './images/borde_logo.png';
    import defaultpfp from './images/defaultpfp.png';
    import { goto } from '$app/navigation';

    let uploadBtn;

    function navtoupload()
    {
        goto("/upload_page")
    }

    function navtoprofile(){
        goto("/profile_page")
    }
</script>

<header>
    <nav class="nav">
        <div class="logo-container">
            <div class="borderlogo">
                <img src={logoborde} alt=""/>
            </div>
            <div class="logoimg">
                <img src={logo} alt=""/>
            </div>
        </div>
        <h1 class="collabotxt">Collabo</h1>
        <ul>
            <li>
                <a href="/home_page">Home</a>
            </li>
            <li>
                <a href="/yourLoops_page">Yourloops</a>
            </li>
            <li>
                <a href="/discover_page">Discover</a>
            </li>
            <li>
                <a href="/About">About us</a>
            </li>
            <li class="searcher-li">
                <input type="text" placeholder="Search Stuff" id="search_bar">
            </li>
            <li>
                <button  on:click={navtoupload} class="uploadBtn">Upload</button>
            </li>
            <li>
                <div class="profile-container">
                    <button type="button" on:click={navtoprofile} class="profile-button">
                        <img src={defaultpfp} alt="profile" />
                    </button>
                </div>
            </li>
        </ul>
    </nav>
</header>
<slot />

<style>
    @import url('https://fonts.cdnfonts.com/css/utendo');
    
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Utendo', sans-serif;
    }

    nav {
        display: flex;
        background-color: #fff;
        align-items: center;
        width: 100%;
    }

    .uploadBtn {
        background-color: #4800B6;
        color: #fff;
        border: none;
        width: 140px;
        height: 30px;
        padding: 0.5rem 1rem;
        border-radius: 5px;
    }

    .uploadBtn:hover {
        cursor: pointer;
        background-color: #935ce0;
    }

    .nav img {
        width: 30px;
        height: 30px;
    }

    .logo-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0 10px 0;
    }

    .borderlogo {
        width: 80px; 
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .borderlogo img {
        width: 100%; 
        height: 100%;
    }

    .logoimg {
        width: 60px; 
        height: 60px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-60%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logoimg img {
        width: 70%; 
        height: 80%;
        border-radius: 50%;
    }

    .collabotxt {
        color: #000;
        font-size: 2rem;
        margin-right: 5%;
    }

    .searcher-li {
        margin-left: 100px;
    }

    .searcher-li input {
        background: #E9E9E9;
        height: 30px;
        width: 200px;
    }

    ul {
        display: flex;
        align-items: center;
        list-style: none;
    }

    li {
        margin-right: 3rem;
    }

    .nav h1 {
        margin-left: 1rem;
    }

    .nav a {
        position: relative;
        font-size: 1.3em;
        color: #000;
        text-decoration: none;
        font-weight: 700;
        white-space: nowrap;
    }

    .nav a:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 5px;
        border-radius: 5px;
        background-image: linear-gradient(to right, #B700BD, #4800B6);
        transform-origin: left;
        transform: scaleX(0);
        transition: transform .5s;
    }

    .nav a:hover:after {
        transform-origin: left;
        transform: scaleX(1);
    }

    .nav input[type=text] {
        float: right;
        width: 140%;
        padding: 6px;
        border: none;
        margin-right: 0;
        font-size: 17px;
        border: solid 1px black;
        border-radius: 20px;
        font-weight: 700;
    }

    .profile-container {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer; /* Agrega esta línea */
    }

    .profile-button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer; /* Agrega esta línea */
    }

    @media screen and (max-width: 600px) {
        .nav a, .nav input[type=text] {
            float: none;
            display: block;
            text-align: left;
            width: 100%;
            margin: 0;
            padding: 14px;
        }

        .nav input[type=text] {
            border: 1px solid #000;
        }
    }

    .profile-container:hover{
        cursor: pointer;
    }
</style>