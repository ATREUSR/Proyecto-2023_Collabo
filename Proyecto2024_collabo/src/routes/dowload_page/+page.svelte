<script lang="ts">
    import artista from "../images/artista.png";
    //import audio from "../audios/bass-loops-012-with-drums-short-loop-120-bpm-6392.mp3"
    import profile from "../images/defaultpfp.png";
    import WaveSurfer from 'wavesurfer.js';
    import { onMount } from "svelte";
    import { page } from '$app/stores';
    
    let audioElement: HTMLDivElement;
    let wavesurfer: WaveSurfer;
    let title = '';
    let audioFile = '';

    $: {
        title = $page.url.searchParams.get('title') || 'default title';
        audioFile = $page.url.searchParams.get('audioFile') || 'default-audio.mp3';
        if (wavesurfer && audioFile) {
            wavesurfer.load(`/audios/${audioFile}`);
        }
    }

    function downloadAudio(e: MouseEvent) {
        e.stopPropagation();
        const link = document.createElement('a');
        link.href = `/audios/${audioFile}`;
        link.download = audioFile; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
        })

        wavesurfer.load(`/audios/${audioFile}`);
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
                        <source src={audioFile} type="audio">
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
        <div class="dowload-btn-conatainer">
            <button class="dowload-button" on:click|preventDefault={downloadAudio}>Collab</button>
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

    .dowload-btn-conatainer{
        border-top: 1px solid #777877; 
        border-bottom: 1px solid #777877;
        width: 70%;
    }

    .dowload-button {
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