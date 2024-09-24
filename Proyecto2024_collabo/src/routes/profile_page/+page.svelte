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
            <div class="loop">
                <div class="loop-title">{title}</div>
                <div class="artist-detail">
                    <img class="profile-img" src={profile} alt="Profile Image">
                    <p class="artist-follow">@dabteloops</p>
                </div>
                <div class="audio-container" bind:this={audioElement} id="audio-container">
                    <source src={audioFile ?? ''} type="audio">
                </div>
                <button class="pause-play-button" on:click={togglePlayPause}>play/pause</button>
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

    .profile-page-container {
        margin: 30px;
        margin-right: 100px;
        margin-left: 100px; 
        display: flex;
        flex-direction: row; /* Align items horizontally */
        align-items: flex-start; /* Align items to the top */
        gap: 20px; /* Add space between profile square and loops container */
    }

    .profile-square {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 10px;
        width: 100%;
        max-width: 400px;
    }

    .profile-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
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

    .user-info {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .user-info div {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .loops-container {
        width: 100%;
    }

    .loops {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .loop {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 5px;
    }

    .artist-detail {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .profile-img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .pause-play-button {
        margin-top: 10px;
    }
</style>