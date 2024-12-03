<script lang="ts">
    import profile from "../images/defaultpfp.png";
    import artista from "../images/artista.png";
    import WaveSurfer from 'wavesurfer.js';
    import { onMount } from "svelte";
    import { page } from '$app/stores';
    import type { Load } from '@sveltejs/kit';
    
    let audioElements: HTMLDivElement[] = [];
    let wavesurfers: WaveSurfer[] = [];
    let title = '';
    let name = '';
    let audioFile = '';
    let loopId = '';
    let userId = '';
    let securityWrap: HTMLDivElement;

    let userName = '';
    let userDescription = '';
    let userUploads = 0;
    let userFollowers = 0;
    let userCollabs = 0;

    interface Loop {
        title: string;
        audioFile: string;
        name: string;
        artistName: string
    }

    let userLoops: Loop[] = [];

    $: {
        title = $page.url.searchParams.get('title') || 'default title';
        name = $page.url.searchParams.get('name') || 'default name';
        audioFile = $page.url.searchParams.get('audioFile') || 'default-audio.mp3';
        loopId = $page.url.searchParams.get('loopid') || 'default-loopid';
        userId = $page.url.searchParams.get('userid') || 'default-userid';
        if (wavesurfers.length && audioFile) {
            wavesurfers.forEach(wavesurfer => wavesurfer.load(audioFile));
        }
    }

    const currentLoopId = $page.url.searchParams.get('loopid') || 'default-loopid';
    console.log(currentLoopId);

    function decodeToken(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    const token = sessionStorage.getItem('token');
    const user = token ? decodeToken(token) : null;
    console.log('Token:', user);

    async function fetchUserData() {

        if (!token) {
            console.error('Token no encontrado');
            alert('No se encontró el token. Por favor, inicie sesión nuevamente.');
            return;
        }

        if (!user) {
            console.error('Token no encontrado');
            return;
        }

        const decodedToken = decodeToken(token);
        /*const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
            console.error('Token expirado');
            alert('El token ha expirado. Por favor, inicie sesión nuevamente.');
            return;
        }*/

        console.log('Token:', token);
        console.log('userToken:', user);
        const userId = user.sub;
        const userEmail = user.email;

        fetch(`https://proyecto2024collaboback.vercel.app/profile`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => { 
            console.log('Fetched user token:', token);
            console.log('Fetched user data:', data);
            userDescription = data.description;
            userUploads = data.uploads;
            userFollowers = data.followers;
            userCollabs = data.collabs;
            /*userLoops = data.loops.map((loop: any) => ({
                title: loop.Title,
                audioFile: loop.id, 
                name: loop.Name,
                //aaa: loop.user,
            }));*/
        })
        .catch(err => {
            console.error('Error fetching data:', err);
        });

        fetch(`https://proyecto2024collaboback.vercel.app/artist-loops/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            userLoops = data.map((loop: any) => ({
                title: loop.Title,
                audioFile: loop.id, 
                name: loop.Name,
                artistName: loop.email,
            }));

            console.log('Fetched user email:', userEmail);

            if (typeof userEmail === 'string') {
                userName = userEmail.substring(0, userEmail.length - 10);
            } else {
                console.error('userEmail no es una cadena:', userEmail);
            } 

            userName = userId.name;
            console.log('Fetched user loops:', userLoops);
            console.log('Fetched user id:', userId);
            
        })
        .catch(err => {
            console.error('Error fetching data:', err);
        });
        
        /*try {
            const response = await fetch(`https://proyecto2024collaboback.vercel.app/profile/${userId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            console.log('Request Headers:', {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Fetched user data:', data);

            userName = data.name;
            userDescription = data.description;
            userUploads = data.uploads;
            userFollowers = data.followers;
            userCollabs = data.collabs;
            userLoops = data.loops.map((loop: any) => ({
                title: loop.Title,
                audioFile: loop.id, 
                name: loop.Name
            }));

            console.log('Fetched user loops:', userLoops);

        } catch (err) {
            console.error('Fetch user data error:', err);
            if (err instanceof Error) {
                alert(`Error fetching user data: ${err.message}`);
            } else {
                alert('An unknown error occurred while fetching user data.');
            }
        }*/
    }

    async function downloadAudio(e: MouseEvent) {
        e.preventDefault(); 

        const token = sessionStorage.getItem('token');

        if (!token) {
            console.error('Token no encontrado');
            alert('No se encontró el token. Por favor, inicie sesión nuevamente.');
            return;
        }

        try {
            const response = await fetch("https://proyecto2024collaboback.vercel.app/download", {
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
            if (err instanceof Error) {
                alert(`Error downloading the file: ${err.message}`);
            } else {
                alert('An unknown error occurred while downloading the file.');
            }
        }
    }

    function openwrap(e: MouseEvent) {
        securityWrap.style.display = 'block';
    }

    function closeSecurityWrap() {
        securityWrap.style.display = 'none';
    }

    onMount(() => {
        fetchUserData().then(() => {
            audioElements.forEach((audioElement, index) => {
                if (audioElement) {
                    console.log('Creating WaveSurfer instance for:', audioElement);
                    const wavesurfer = WaveSurfer.create({
                        container: audioElement,
                        waveColor: '#4800B6',
                        progressColor: 'rgba(72, 0, 182, 0.5)',
                        barWidth: 7,
                        barHeight: 0.5,
                        barGap: 3,
                        barRadius: 5,
                    });

                    // Construye la URL de Cloudinary
                    const cloudinaryBaseUrl = "https://res.cloudinary.com/dw26qdtlf/video/upload/v1722284452/";
                    const audioUrl = `${cloudinaryBaseUrl}${userLoops[index].audioFile}.mp3`;
                    
                    wavesurfer.load(audioUrl);  // Usa audioUrl para cargar el audio en WaveSurfer
                    wavesurfers.push(wavesurfer);
                } else {
                    console.error('audioElement not found');
                }
            });
        });
    });

    function togglePlayPause(index: number) {
        wavesurfers[index].playPause();
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
                    <img src={profile} alt="">
                </div>
                <div class="user-name">
                    <h2>{userName}</h2>
                </div>
                <div class="user-desc">
                    <span>-</span>
                </div>
                <div class="buttons-upload-edit">
                    <button>Uploads</button>
                    <button>Edit profile</button>
                </div>
                <div class="user-info">
                    <div class="uploads-info">
                        <span>Uploads</span>
                        <span>-</span>
                    </div>
                    <div class="followers-info">
                        <span>Followers</span>
                        <span>-</span>
                    </div>
                    <div class="Collabs-info">
                        <span>Collabs</span>
                        <span>-</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="loops-container">
            <h2>My loops</h2>
            <div class="loops">
                {#each userLoops as loop, index}
                    <div class="loop-container">
                        <div class="loop-info">
                            <img class="loop-img" src={artista} alt="">
                            <div class="artist-upload-info">
                                <div class="loop-title">{loop.name}</div>
                                <div class="artist-detail">
                                    <img class="profile-img" src={profile} alt="">
                                    <p class="artist-follow">{userName}</p>
                                </div>
                                <div bind:this={audioElements[index]} class="audio-container" id="audio-container">
                                    <source src={loop.audioFile} type="audio" class="audio">
                                </div>
                                <div class="buttons-container">
                                    <button class="pause-play-button" on:click={() => togglePlayPause(index)}>play/pause</button>
                                    <button class="dowload-button">Collab</button>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
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
        margin-bottom: 30px; 
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
        max-height: 600px; /* Set a fixed height */
        overflow-y: auto; /* Enable vertical scrolling */
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