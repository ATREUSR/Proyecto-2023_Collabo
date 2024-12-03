<script lang="ts">
    import defaultImg from '../images/defaultImgSelect.png';
    import audio from "../audios/sunflower-street-drumloop-85bpm-163900.mp3"
    import WaveSurfer from 'wavesurfer.js';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Modal from '../Modal.svelte';

    let loopImgSrc = defaultImg;
    let waveSurfer: WaveSurfer;
    let audioElement: HTMLDivElement;
    let audioFileName: string;
    let inputValue: File;
    let nameValue: string;
    let descriptionValue: string;
    let input: HTMLInputElement; 
    let tags: string[] = [];
    let availableTags: string[] = ["rock", "pop", "trap", "rap"];
    let openDropdown = false;
    let selectedTag = "";

    let showModal = false;

    const token = sessionStorage.getItem('token');

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
            if (file instanceof File) {
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
        console.log(audioLink);
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

        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    function togglePlayPause() {
        waveSurfer.playPause();
    }

    function uploadAudio() {
        let formData = new FormData();
        console.log(inputValue);
        console.log(nameValue);
        console.log(descriptionValue);
        formData.append("audio", inputValue);
        formData.append("name", nameValue);
        formData.append("descripcion", descriptionValue);
        formData.append("tags", JSON.stringify(tags)); // Append tags as a JSON string

        fetch("https://proyecto2024collaboback.vercel.app/uploadloops", {
            method: 'POST',
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`,          
            },
            body: formData,
        }).then((response) => {
            if (response.ok) {
                showModal = true;
            } else {
                response.text().then(text => console.error(text));
            }
 
            console.log("Token: ", token);   
            console.log("FormData:", Array.from(formData.entries()));

            //console.log(token);
        }).catch(err => {
            console.log(err);
        });
    }

    function handleModalClose() {
        showModal = false;
        goto(`/discover_page`);
    }

    function addTag(tag: string) {
        if (!tags.includes(tag)) {
            tags = [...tags, tag];
        }
        openDropdown = false;
    }

    function removeTag(index: number) {
        tags = tags.filter((_, i) => i !== index);
    }

    function handleDocumentClick(event: MouseEvent) {
        if (!(event.target as HTMLElement).closest('.custom-select')) {
            openDropdown = false;
        }
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            openDropdown = false;
        }
    }
</script>

<div class="page-container">
    <div class="form-section">
        <div class="section-info">
            <h1>Upload</h1>
            <div class="gradient-line"></div>
        </div>
        <div class="upload-form-container">
            <form action="">
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
                        <div class="input">
                            <label for="tags">Tags</label>
                            <div class="custom-select" role="button" tabindex="0" id="tag-dropdown-button" on:click={() => openDropdown = !openDropdown} on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (openDropdown = !openDropdown)}>
                                <div class="select-selected">{selectedTag || "Selecciona un tag"}</div>
                                {#if openDropdown}
                                    <div class="select-items">
                                        {#each availableTags as tag}
                                            <button type="button" on:click={() => addTag(tag)}>{tag}</button>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                            
                            <div class="tags-list">
                                {#each tags as tag, index}
                                    <span class="tag">
                                        {tag}
                                        <button type="button" on:click={() => removeTag(index)}>x</button>
                                    </span>
                                {/each}
                            </div>
                        </div>
                        <button on:click={uploadAudio} class="submit-btn" type="submit">Upload</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
{#if showModal}
    <Modal message="Audio uploaded successfully!" onClose={handleModalClose} />
{/if}

<style>
    .page-container {
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(-8%);
        height: 80vh;
        margin-top: 40px;
    }

    .form-section {
        width: 100%;
        max-width: 500px;
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

    .img-container {
        width: 200px;
        height: 200px;
        border-radius: 15px;
        margin-bottom: 15px;
        overflow: hidden;
    }

    .loop-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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

    .submit-btn {
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

    .audio-container {
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

    .tags-list {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-top: 10px;
    }

    .tag {
        background-color: #4800B6;
        color: white;
        padding: 5px 10px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .tag button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
    }

    .custom-select {
        position: relative;
        display: inline-block;
        width: 200%;
        margin-top: 5px;
    }

    .select-selected {
        background-color: #E9E9E9;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        cursor: pointer;
    }

    .select-items {
        position: absolute;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
        z-index: 99;
        max-height: 150px;
        overflow-y: auto;
    }

    .select-items button {
        background: none;
        border: none;
        padding: 10px;
        width: 100%;
        text-align: left;
        cursor: pointer;
    }

    .select-items button:hover {
        background-color: #ddd;
    }
</style>