<script lang="ts">
    import artista from "../images/artista.png";
    import img from "../images/brawlstars.png";
    import profile from "../images/defaultpfp.png";
    import WaveSurfer from 'wavesurfer.js';
    import { onMount } from "svelte";
    import { page } from '$app/stores';
    
    let audioElement: HTMLDivElement;
    let wavesurfer: WaveSurfer;
    let title = '';
    let audioFile = '';
    let loopId = '';
    let userId = '';
    let securityWrap: HTMLDivElement;

    $: {
        title = $page.url.searchParams.get('title') || 'default title';
        audioFile = $page.url.searchParams.get('audioFile') || 'default-audio.mp3';
        loopId = $page.url.searchParams.get('loopid') || 'default-loopid';
        userId = $page.url.searchParams.get('userid') || 'default-userid';
        if (wavesurfer && audioFile) {
            wavesurfer.load(audioFile);
        }
    }

    function getCookie(name : string) {
        if (typeof document !== 'undefined') {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift() ?? '';
        }
        return '';
    }

    const token = getCookie('token');

    const currentLoopId = $page.url.searchParams.get('loopid') || 'default-loopid';
    console.log(currentLoopId);
    console.log(token);

    async function downloadAudio(e: MouseEvent) {
    e.preventDefault(); 

    const downloadUrl = `https://res.cloudinary.com/dw26qdtlf/video/upload/v1722284452/${currentLoopId}`;

    try {
        const response = await fetch(downloadUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${currentLoopId}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // Send a POST request to your server
        const postResponse = await fetch("http://localhost:8003/download", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ loopId: currentLoopId, userId }),
        });

        if (!postResponse.ok) {
            throw new Error(`Network response was not ok: ${postResponse.statusText}`);
        }

    } catch (err) {
        console.error('Download error:', err);
        alert('Error downloading the file'); // Informa al usuario
    }
}

    function openwrap(e: MouseEvent) {
        securityWrap.style.display = 'block';
    }

    function closeSecurityWrap() {
        securityWrap.style.display = 'none';
    }

    onMount(() => {
        wavesurfer = WaveSurfer.create({
            container: audioElement,
            waveColor: '#4800B6',
            progressColor: 'rgba(72, 0, 182, 0.5)',
            barWidth: 7,
            barHeight: 0.5,
            barGap: 3,
            barRadius: 5,
        });

        wavesurfer.load(audioFile);
    });

    function togglePlayPause() {
        wavesurfer.playPause();
    }
</script>

<div class="upload-container">
    <h1>Post</h1>
    <div class="gradient-line"></div>
    <div class="content-container">
        <div class="post-profile-container">
            <div class="post-container">
                <img src={artista} alt="">
                <div class="post-info">
                    <h2 class="loop-title">{title}</h2> <!-- esta linea usa valores planos pero que van a ser variables -->
                    <div class="artist-upload-info">
                        <img class="profile-img" src={profile} alt="">
                        <p class="artist-follow">@ArtisitYouFollow</p> <!-- esta linea tambien -->
                        <p>upload 30 mins ago</p> <!-- esta linea tambien -->
                    </div>
                    <div bind:this={audioElement} class="audio-container" id="audio-container">
                        <source src={audioFile ?? ''} type="audio">
                    </div>
                    <button class="pause-play-button" on:click={togglePlayPause}>play/pause</button>
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
        <div class="collab-btn-conatainer">
            <button class="collab-button" on:click={openwrap}>Collab</button>
        </div>

        <div class="security-wrap" bind:this={securityWrap}>
            <button class="close-btn" on:click={closeSecurityWrap}>✖</button>
            <h2 class="collab-conditions">Collab Conditions</h2>
            <div class="subtitle-line"></div>
            <div class="collab-conditions">
                <div class="loop-info">
                    <img class="loop-img" src={artista} alt="">
                    <div class="loop-details">
                        <h2 class="loop-name">{title}</h2>
                        <div class="user-info">
                            <img src={profile} alt="" class="pfp-img">
                            <span class="user">@Username</span>
                        </div>
                    </div>
                </div>
                <div class="use-split">
                    <div class="use">
                        <h2>Type of collab</h2>
                        <p>This is the type of use that the creator selected, this has to be respected when using the loop</p>
                        <div class="giving-split">
                            <h2>Giving<br>Split</h2>
                        </div>
                    </div>
                    <div class="split">
                        <h2>split percentage</h2>
                        <p>This is the percentage of the split that the creator has selected, if you think you can reach a new agreement with him you have the option of negotiation</p>
                        <div class="split-percentage">
                            <h2>20%</h2>
                        </div>
                    </div>
                </div>
                <div class="dowload-btn-conatainer">
                    <button class="dowload-btn" on:click|preventDefault={downloadAudio}>Collab</button>
                </div>
            </div>
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
        margin-right: 10px;
        border-radius: 50%;
    }

    .loop-details {
        display: flex;
        align-items: center; 
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

    .audio-container{
        background-color: #f0f0f0;
        border-radius: 5px;
        transform: translateY(-35px);
    }

    .audio-container:hover {
        cursor: pointer;
    }

    .pause-play-button {
        width: 100px;
        height: 40px;
        background-color: #4800B6;
        border: 0.5px solid #777877;
        color: white;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        text-align: center;
        transform: translateX(170px);
    }

    .pause-play-button:hover {
        background-color: #935ce0;
        cursor: pointer;
    }

    .collab-btn-conatainer{
        border-top: 1px solid #777877; 
        border-bottom: 1px solid #777877;
        width: 70%;
    }

    .collab-button {
        display: flex;
        width: 150px;
        height: 40px;
        background-color: #4800B6;
        border-radius: 5px;
        border: 0.5px solid #777877;
        color: #fff;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-left: auto;
        font-weight: 600;
        font-size: medium;
        margin-top: 10px; 
        margin-bottom: 10px;
    }

    .collab-button:hover {
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

    .subtitle-line {
        height: 3px;
        background: #E9E9E9;
        border-radius: 5px;
        margin-bottom: 20px;
    }

    .security-wrap {
        margin-top: 20px;
        border: 1px solid #777877;
        border-radius: 15px;
        box-shadow: 0px 0px 10px 0px #777877;
        padding: 20px;
        width: 500px; 
        height: auto;
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        z-index: 1000; 
    }

    .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
    }

    .collab-conditions {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .loop-info {
        display: flex;
        margin-bottom: 20px;
    }

    .loop-img {
        width: 50px; 
        height: 50px;
        margin-right: 20px;
    }

    .pfp-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .user {
        display: flex;
        align-items: center;
    }

    .user-info {
        display: flex; 
        align-items: center;
        justify-content: center;
        margin-top: 10px; 
    }

    .loop-details {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .user-info {
        display: flex; 
        align-items: center;
        justify-content: center;
        margin-top: 10px; 
    }

    .use-split {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        margin-right: auto;
    }

    .use, .split {
        margin-bottom: 20px;
        max-width: 250px;
        position: relative;
    }

    .use h2, .split h2 {
        font-size: 24px;
        margin-bottom: 10px;
    }

    .use p, .split p {
        word-wrap: break-word;
    }

    .giving-split, .split-percentage {
        position: absolute;
        right: -200px;
        top: 0;
        border: 1px solid #E9E9E9;
        border-radius: 15px;
        background: #E9E9E9; 
        height: 100px;
        width: 150px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
    }

    .giving-split h2, .split-percentage h2 {
        background: linear-gradient(to right, #B700BD, #4800B6); 
        -webkit-background-clip: text; 
        background-clip: text; 
        color: transparent; 
        margin: 0;
    }

    .giving-split h2{
        font-size: 28px;
    }

    .split-percentage h2 {
        font-size: 35px;
    }

    .dowload-btn-conatainer {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .dowload-btn{
        display: flex;
        width: 250px;
        height: 40px;
        background-color: #4800B6;
        border-radius: 5px;
        border: 0.5px solid #777877;
        color: #fff;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-left: auto;
        font-weight: 600;
        font-size: medium;
        margin-top: 10px; 
        margin-bottom: 10px;
    }

    .dowload-btn:hover {
        background-color: #935ce0;
        cursor: pointer;
        
    }
</style>