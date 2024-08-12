<script>
	import logo from './images/Logo_home.png';
    import logobackground from './images/Background_logo.png';
    import defaultpfp from './images/defaultpfp.png';
    import { goto } from '$app/navigation';

    let uploadBtn;

    function navtoupload()
    {
        goto("/upload_page")
    }
</script>



<header>
    <nav class="nav">
        <div class="logo-container">
            <div class="logoimg"><img src={logo} alt=""/></div>
            <div class="linear-gradient"></div>
        </div>
        <h1 class="collabotxt">collabo</h1>
        <ul>
            <li>
                <a href="/home_page">Home</a>
            </li>
            <li>
                <a href="/">Feed</a>
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
                    <img src={defaultpfp} alt="profile" />
                </div>
            </li>
        </ul>
    </nav>
</header>
<slot />


<style>

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Coolvetica', sans-serif;
    }

    nav {
        display: flex;
        background-color: #fff;
        border-bottom: solid 1px #000;
        align-items: center;
        width: 100%;
        height: 70px;

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
        width: 100px; 
        height: 100px;  
        border-style: solid;
        border-width: 10px;
        border-image: linear-gradient(to right, #B700BD, #4800B6) 1;
    }

    .logoimg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .collabotxt {
        color: #000;
        font-size: 1.5rem;
        margin-right: 5%;
    }

    .searcher-li{
        margin-left: 150px;
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
        font-size: 1.1em;
        color: #000;
        text-decoration: none;
        font-weight: 650;
        white-space: nowrap
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
        margin-right:0;
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
</style>