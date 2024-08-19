<script lang="ts">
    import defaultImg from '../images/defaultImgSelect.png';
    import audio from "../audios/sunflower-street-drumloop-85bpm-163900.mp3"
    import WaveSurfer from 'wavesurfer.js';
    import { onMount } from 'svelte';

    let loopImgSrc = defaultImg;
    let waveSurfer: WaveSurfer;
    let audioElement: HTMLDivElement;
    let audioFileName: string;
    let inputValue: File;
    let nameValue: string;
    let descriptionValue: string;
    let input: HTMLInputElement; 
    

    /*function getCookie(name : string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() ?? '';
    }

    function decodeToken(token: string): string {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload); 
    }

    const token = getCookie('token');
    console.log(token);
    const user = token ? decodeToken(token) : null;
    console.log(user);
    */

    function handleImageChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            loopImgSrc = URL.createObjectURL(file);
        }
    }

    function handleAudioChange(event: Event) {
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            if (file instanceof File) { // Ensure the selected object is a File
                const url = URL.createObjectURL(file);
                waveSurfer.load(url);
                inputValue = file;
                console.log(inputValue.name);
            }
        } else {
            console.error("No file was selected.");
        }
        console.log(inputValue.name);
    }

    function handleTitleChange(event: Event) {
        const input = event.target as HTMLInputElement;
        nameValue = input.value;
    }

    function handleDescriptionChange(event: Event) {
        const input = event.target as HTMLInputElement;
        descriptionValue = input.value;
    }

    onMount(() => {
        const audioLink = localStorage.getItem('uploadedAudio');
        audioFileName = localStorage.getItem('audioFileName') || 'Uploaded Audio';
        //console.log(audioFileName);
        if (audioLink) {
            waveSurfer = WaveSurfer.create({
                container: audioElement,
                waveColor: '#4800B6',
                progressColor: 'rgba(72, 0, 182, 0.5)',
                barWidth: 7,
                barHeight: 0.5,
                barGap: 3,
                barRadius: 5,
            });

            waveSurfer.load(audioLink);

        } else {
            console.error("No se encontró el audio en localStorage.");
        }
    });

    function togglePlayPause() {
        waveSurfer.playPause();
    }

    function uploadAudio() {
        let formData = new FormData();
        console.log(inputValue.name);
        console.log(nameValue);
        console.log(descriptionValue);
        formData.append("audio", inputValue);
        formData.append("name", nameValue);
        formData.append("descripcion", descriptionValue);

        fetch("http://localhost:8003/uploadloops", {
            method: 'POST',
            credentials: "include",
            headers: {
                // Authorization: `Bearer ${token}`,
            },
            body: formData,
        }).then((response) => {
            if (response.ok) {
                alert("Audio uploaded successfully!");
            } else {
                response.text().then(text => console.error(text));
            }
        }).catch(err => {
            console.log(err);
        });
    }

</script>



<div class="page-container">
    <div class="form-section">
        <div class="section-info">
            <h1>Upload</h1>
            <div class="gradient-line"></div>
        </div>
        <div class="upload-form-container">
            <form action=""> <!--  action="http://localhost:3000/upload" method="POST" enctype="multipart/form-data -->
                <div class="form-content">
                    <div class="left-section">
                        <div class="input-file">
                            <div class="img-container"><img class="loop-img" src={loopImgSrc} alt=""></div>
                            <label class="img-label" for="img-file">
                                <span>Upload Image</span>
                                <input type="file" class="img-btn" name="file" id="img-file" accept="image/*" on:change={handleImageChange}>
                            </label>
                        </div>
                    </div>
                    <div class="right-section">
                        <div class="input-file">
                            <label class="exclude-label" for="">Audio file</label>
                            <div bind:this={audioElement} class="audio-container" id="audio-container">
                                <source src={audio} type="audio" class="audio">
                            </div>
                            <p>{audioFileName}</p>
                            <label for="audio-file">
                                <span>Change</span>
                                <input type="file" name="file" id="audio-file" bind:this={input} accept="audio/*" on:change={handleAudioChange}>
                            </label>
                            <button class="pause-play-button" on:click={togglePlayPause}>play/pause</button>
                        </div>
                        <div class="input">
                            <label for="title">Name</label>
                            <input on:input={handleTitleChange} type="text" name="title" id="title" placeholder="Title" required>
                        </div>
                        <div class="input">
                            <label for="description">Description</label>
                            <input on:input={handleDescriptionChange} type="text" name="description" id="description" placeholder="Description" required>
                        </div>
                        <button on:click={uploadAudio} class="submit-btn" type="submit">Upload</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<style>

    .page-container {
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(-8%);
        height: 80vh;
    }

    .form-section {
        width: 100%;
        max-width: 500px; /* Ajusta el ancho máximo del formulario */
    }


    .page-container h1 {
        display: flex;
        justify-content: center;    
        align-items: center;
        transform: translateX(20%);
    }

    .gradient-line {
        height: 6px;
        width: 153%;
        background: linear-gradient(to right, #B700BD, #4800B6);
        border-radius: 5px;
        margin-bottom: 25px;
    }

    .page-container label {
        font-weight: 600;
    }

    .form-content {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .left-section, .right-section {
        display: flex;
        flex-direction: column;
        width: 48%;
    }

    .input-file {
        margin-bottom: 10px;
    }

    .img-container{
        width: 200px;
        height: 200px;
        border-radius: 15px;
        margin-bottom: 15px;
        overflow: hidden; 
    }

    .loop-img {
        width: 100%;
        height: 100%;
        object-fit: cover;/*container is also useful*/
        border-radius: 15px;
        margin-bottom: 15px;
        background-color: #E9E9E9;
    }

    .input input {
        width: 200%;
        height: 30px;
        padding-top: 5px;
        padding-left: 10px;
        margin-top: 5px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-right: 20px;
        background-color: #E9E9E9;
        border: 0.5px solid #E9E9E9;
        font-family: 'Utendo', sans-serif;
        font-weight: 600;
    }

    input::placeholder {
        color: #a0a8a2;
        font-weight: 600;
    }

    .submit-btn{
        width: 207%;
        background-color: #4800B6;
        border-radius: 5px;
        border: 0.5px solid #E9E9E9;
        color: #fff;
        text-align: center;
        font-weight: 600;
        font-size: medium;
        margin-top: 20px;
    }

    .submit-btn:hover {
        background-color: #935ce0;
        cursor: pointer;
    }

    .input-file input[type="file"] {
        display: none;
    }

    .input-file label:not(.exclude-label) {
        width: 150px;
        background-color: #4800B6;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        cursor: pointer;
    }

    .input-file label:hover:not(.exclude-label) {
        background-color: #935ce0;
    }

    .audio-container{
        background-color: #E9E9E9;
        border-radius: 5px;
        margin-bottom: 20px;
        width: 500px;
        height: 45%;
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

    .img-label {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }
</style>