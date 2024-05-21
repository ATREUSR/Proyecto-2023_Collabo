<script>
	import logo from './images/Logo_home.png';
    import logobackground from './images/Background_logo.png';
    import defaultpfp from './images/defaultpfp.png';
</script>



<header>
    <nav class="nav">
        <label class="logo-container" for="">
            <div class="logobackgroundimg"><img src={logobackground} alt=""/></div>
            <div class="logoimg"><img src={logo} alt=""/></div>
        </label>
        <h1 class="collabotxt">collabo</h1>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/about">Feed</a>
            </li>
            <li>
                <a href="/discover">Discover</a>
            </li>
            <li>
                <a href="/About">About us</a>
            </li>
            <li class="searcher-li">
                <input type="text" placeholder="Search Stuff">
            </li>
            <li>
                <button class="uploadBtn">Upload</button>
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
    }

    .nav img {
        width: 30px;
        height: 30px;
    }

    .logo-container {
        position: relative;
        text-align: center;
    }

    .logoimg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
    }

    .logobackgroundimg img{
        width: 70px;
        height: 100%;
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