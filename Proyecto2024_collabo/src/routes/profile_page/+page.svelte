<script lang="ts">
    import artista from "../images/artista.png";
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

        try {
            const response = await fetch("http://localhost:8003/download", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ loopId: currentLoopId, userId }),
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
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

<div class="profile-page-all-container">
    <div class="header">
        <h1>Profile</h1>
        <div class="gradient-line"></div>
    </div>
    <div class="profile-page-container">
        <div class="profile-square">
            <div class="profile-info">
                <div class="img">
                    <img src="" alt="">
                </div>
                <div class="user-name">
                    <h2>@dabteloops</h2>
                </div>
                <div class="user-desc">
                    <span>Hago loops medio pelo</span>
                </div>
                <div class="buttons-upload-edit">
                    <button>Uploads</button>
                    <button>Edit profile</button>
                </div>
                <div class="user-info">
                    <div class="uploads-info">
                        <span>Uploads</span>
                        <span>25</span>
                    </div>
                    <div class="followers-info">
                        <span>Followers</span>
                        <span>246</span>
                    </div>
                    <div class="Collabs-info">
                        <span>Collabs</span>
                        <span>87</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="loops-container">
            <h2>My loops</h2>
            <div class="loops">
                <div class="loop-container">
                    <div class="loop-info">
                        <img class="loop-img" src={artista} alt="">
                        <div class="artist-upload-info">
                            <div class="loop-title">{title}</div>
                            <div class="artist-detail">
                                <img class="profile-img" src={profile} alt="">
                                <p class="artist-follow">@dabteloops</p>
                                <p></p>
                            </div>
                            <div bind:this={audioElement} class="audio-container" id="audio-container">
                                <source src={audioFile ?? ''} type="audio" class="audio">
                            </div>
                            <div class="buttons-container">
                                <button class="pause-play-button" on:click={togglePlayPause}>play/pause</button>
                                <button class="dowload-button">Collab</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    @import url('https://fonts.cdnfonts.com/css/utendo');
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Utendo', sans-serif;
    }

    .profile-page-all-container {
        margin: 30px;
        margin-right: 100px;
        margin-left: 100px;  
    }

    .header {
        margin-bottom: 40px;
    }

    .header h1 {
        margin-bottom: 10px;
        text-align: left;
    }

    .gradient-line {
        width: 100%;
        height: 6px;
        background: linear-gradient(to right, #B700BD, #4800B6);
        border-radius: 5px;
    }

    .profile-page-container {
        display: flex;
        align-items: flex-start; 
        gap: 20px;
    }

    .profile-square {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 10px;
        width: 80%;
        max-width: 300px;
        height: 400px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        position: relative;
    }

    .profile-square::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 6px;
        background: #4800B6;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .profile-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .profile-info > div {
        margin-bottom: 20px; 
    }

    .img img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 10px;
    }

    .user-name, .user-desc, .user-info {
        margin-bottom: 10px;
        text-align: center;
    }

    .buttons-upload-edit {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 10px;
    }

    .buttons-upload-edit button {
        width: 120px;
        height: 30px;
        background-color: #E9E9E9; 
        border: 2px solid rgba(0, 0, 0, 0.4); 
        border-radius: 5px;
        color: rgba(0, 0, 0, 0.4);
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    }

    .buttons-upload-edit button:hover {
        background-color: #e0e0e0; 
    }

    .user-info {
        display: flex;
        flex-direction: row;
        gap: 20px;
        justify-content: space-around;
        width: 100%;
    }

    .user-info div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .loops-container {
        width: 100%;
    }

    .loops {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .loop-container {
        position: relative;
        background: #fff;
        width: 95%;
        height: 240px;
        border-radius: 10px;
        margin-right: 100px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        display: flex;
        margin-top: 10px;
        flex-direction: column;
    }

    .loop-img {
        width: 200px; 
        height: 200px; 
        object-fit: cover;
        border-radius: 10px; 
    }

    .loop-info {
        display: flex; 
        gap: 10px;
    }

    .artist-upload-info {
        display: flex;
        flex-direction: column;
        gap: 10px; 
    }

    .loop-title {
        margin: 0; 
        white-space: nowrap; 
        overflow: hidden; 
        font-weight: 700;
        font-size: 20px;
    }
    
    .artist-detail { 
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .profile-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    .artist-follow, p {
        white-space: nowrap;
        overflow: hidden; 
        text-overflow: ellipsis; 
    }

    .audio-container {
        position: relative;
        border-radius: 15px;
        width: 400px;
        height: 100px;
        margin-bottom: 50px;
        background-color: #f0f0f0;
    }

    .audio{
        position: relative;
        width: 100%;
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
        transform: translateX(90px) translateY(-50px);
    }

    .pause-play-button:hover {
        background-color: #935ce0;
        cursor: pointer;
    }

    .dowload-button {
        position: absolute;
        top: 10px; 
        right: 10px; 
        width: 120px;
        height: 40px;
        background-color: #4800B6;
        border: none;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        transform: translateY(170px);
    }

    .dowload-button:hover {
        background-color: #935ce0;
    }
</style>