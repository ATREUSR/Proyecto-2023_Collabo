<script>
	import logo from './images/Logo_home.png';
</script>



<header>
    <nav class="nav">
        <img src={logo} alt=""/>
        <h1 class="collabotxt">collabo</h1>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>
            <li>
                <a href="/discover">Discover</a>
            </li>
            <li>
                <a href="/About">About us</a>
            </li>
            <li>
                <input type="text" placeholder="Search..">
            </li>
            <li>
                <button class="uploadBtn">Upload</button>
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

    .uploadBtn {
        background-color: #4800B6;
        color: #fff;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
    }

    nav {
        display: flex;
        background-color: #fff;
        border-bottom: solid 1px #000;
        align-items: center;
    }

    img {
        width: 30px;
        height: 30px;
        background-color: #4800B6;
    }

    .collabotxt {
        color: #000;
        font-size: 1.5rem;
        margin-right: 20%;
    }

    ul {
        display: flex;
        align-items: center;
        list-style: none;
        
    }

    li {
        margin-right: 5rem;
    }

    h1 {
        margin: 0;
    }

    a {
        position: relative;
        font-size: 1.1em;
        color: #000;
        text-decoration: none;
        font-weight: 500;
    }


    .nav input[type=text] {
        float: right;
        padding: 6px;
        border: none;
        margin-top: 8px;
        margin-right: 16px;
        font-size: 17px;
        border: solid 1px black;
        border-radius: 10px;
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