<script>
    import artista from "../images/artista.png";
    import audio from "../audios/sunflower-street-drumloop-85bpm-163900.mp3"
    import profile from "../images/defaultpfp.png";
</script>



<div class="upload-container">
    <h1>Post</h1>
    <div class="gradient-line"></div>
    <div class="content-container">
        <div class="post-profile-container">
            <div class="post-container">
                <img src={artista} alt="">
                <div class="post-info">
                    <h2 class="loop-title">NLE CHOPPA TYPE LOOP | TRAP CHORDS</h2> <!-- esta linea usa valores planos pero que van a ser variables -->
                    <div class="artist-upload-info">
                        <img class="profile-img" src={profile} alt="">
                        <p class="artist-follow">@ArtisitYouFollow</p> <!-- esta linea tambien -->
                        <p>upload 30 mins ago</p> <!-- esta linea tambien -->
                    </div>
                    <audio controls>
                        <source src={audio} type="audio/ogg">
                        Your browser does not support the audio element.
                    </audio><!-- aca lo del audio que tengo que ver como se hace -->
                </div>
            </div>
            <div class="profile-container">
                <div class="info-container">
                    <img class="profile-info-img" src={profile} alt="">
                    <p class="artist-info-follow">@ArtisitYouFollow</p>
                    <button class="follow-button">follow</button>
                </div>
            </div>
        </div>
        <div class="dowload-btn-conatainer">
            <a href={audio} download>
                <button class="dowload-button">collab</button>
            </a>
        </div>
    </div>
</div>

<style>
    @import url('https://fonts.cdnfonts.com/css/utendo');
    
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Utendo', sans-serif;
    }

    .upload-container {
        margin: 30px;
        margin-right: 100px;
        margin-left: 100px;  
    }

    .gradient-line {
        height: 6px;
        background: linear-gradient(to right, #B700BD, #4800B6);
        border-radius: 5px;
        margin-bottom: 40px;
    }

    .content-container {
        display: flex;
        flex-direction: column;
    }

    .post-profile-container {
        display: flex;
    }

    .post-container {
        display: flex;
        align-items: start;
        margin-top: 10px;
        font-weight: 500;
        margin-bottom: 10px;
    }

    .post-info {
        margin-left: 20px;
    }

    .profile-img {
        width: 40px;
        margin-right: -100px;
    }

    .loop-title {
        margin-bottom: 10px;
    }

    .artist-upload-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 70px;
        align-items: center;
    }

    .artist-follow {
        margin-right: 50px;
    }

    .dowload-btn-conatainer{
        border-top: 1px solid #777877; 
        border-bottom: 1px solid #777877;
        width: 70%;
    }

    .dowload-btn-conatainer a {
        text-decoration-line: none;
    }

    .dowload-button {
        display: flex;
        width: 150px;
        height: 40px;
        background-color: #4800B6;
        color: white;
        border-radius: 5px;
        border: 0.5px solid #777877;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-left: auto;
        font-weight: 600;
        font-size: medium;
        margin-top: 10px; 
        margin-bottom: 10px;
    }

    .dowload-button:hover {
        background-color: #935ce0;
        cursor: pointer;
    }

    .profile-container{
        width: 250px;
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-left: auto;
        border: 1px solid #777877;
        border-radius: 15px;
        box-shadow: 0px 0px 10px 0px #777877;
    }

    .profile-info-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .artist-info-follow{
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .follow-button{
        width: 200px;
        height: 35px;
        background-color: #4800B6;
        color: white;
        border: 0.5px solid #777877;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
    }

    .follow-button:hover {
        background-color: #935ce0;
        cursor: pointer;
    }
</style>