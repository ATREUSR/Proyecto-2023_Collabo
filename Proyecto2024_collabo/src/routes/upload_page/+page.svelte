<script lang="ts">
    import { onMount } from 'svelte';
	import rectangle from '../images/rectangulo_color.png';
    import { page } from '$app/stores';

    let dropArea: HTMLElement;
    let input: HTMLInputElement;
    let fileView: HTMLElement;

    onMount(() => {
        input = document.getElementById("input-file") as HTMLInputElement;
        fileView = document.getElementById("file-view") as HTMLElement;
        dropArea = document.getElementById("drop-area") as HTMLElement;
        if (input) {
            input.addEventListener("change", uploadaudio);
            dropArea.addEventListener("dragover", handleDragOver); 
            dropArea.addEventListener("drop", handleDrag);
        } else {
            console.error("El elemento con ID 'input-file' no se encontró en el DOM.");
        }
    });

    function uploadaudio() {
        if (input.files && input.files[0]) {
            let audioLink = URL.createObjectURL(input.files[0]);
            let audioElement = document.createElement('audio');
            audioElement.controls = true;
            audioElement.src = audioLink;
            fileView.textContent = "";
            fileView.style.display = "flex";
            fileView.style.justifyContent = "center";
            fileView.style.alignItems = "center";
            fileView.appendChild(audioElement);
            console.log("Audio subido correctamente.");
        }
    }

    function handleDragOver(e: DragEvent) {
        e.preventDefault();
    }

    function handleDrag(e: DragEvent) {
        e.preventDefault();
        input.files = e.dataTransfer.files;
        uploadaudio();
    }
</script>

<div class="space">
    <label for="input-file" id="drop-area" bind:this={dropArea} on:dragover={handleDragOver}>
        <div id="file-view" bind:this={fileView}>
            <p>Drag your stuff to upload:</p>
            <div class="btn-file-container">
                <div class="label-select-files">
                    <img src={rectangle} alt=""> <!-- this should be a button -->
                    <p class="centrado">Or select your files here</p>
                </div>
                <input multiple type="file" class="btn-file" accept="audio/*" id="input-file" bind:this={input} on:change={uploadaudio}> <!-- no se pueden archivos de audio raros -->
            </div>
            <span>Upload your files in WAV, FLAC, ALAC or AIFF for the highest quality</span>
        </div>
    </label>
</div>



<style>

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Coolvetica', sans-serif;
    }

    .space {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #drop-area {
        width: 1000px;
        height: 400px;
        padding: 30px;
        margin-top: 50px;
        text-align: center;
        border-radius: 20px;
        border: dashed 2px #000;
        background-color: #f0f0f0;
    }

    #file-view {
        width: 100%;
        height: 100%;
        border-radius: 20px;
    }

    #file-view p {
        margin-bottom: 80px;
        font-weight: 600;
    }

    #file-view span{
        display: block;
        font-size: 12px;
        color: #777;
        margin-top: 15px;
    }

    .btn-file{
        position: relative;
        width: 100%;
        height: 45px;
        border: none;
        outline: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1em;
        color: #fff;
        font-weight: 500;
        transition: .5s;
        bottom: 5px; 
        display: none; 
    }

    .btn-file-container{
        margin-bottom: 100px;
    }

    .label-select-files{
        position: relative;
        display: inline-block;
        text-align: center;
    }

    .centrado{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-weight: 600;
    }
    
</style>
