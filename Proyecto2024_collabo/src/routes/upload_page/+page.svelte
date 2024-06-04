<script lang="ts">
    import { onMount } from 'svelte';
    import rectangle from '../images/rectangulo_color.png';
    import { page } from '$app/stores';
    import WaveSurfer from 'wavesurfer.js';

    let dropArea: HTMLElement;
    let input: HTMLInputElement;
    let inputValue: File;
    let fileView: HTMLElement;
    let submitBtn: HTMLElement;
    let wavesurfer: WaveSurfer;
    let audioContaier: HTMLDivElement;
    let playPauseBtn: HTMLElement;
    
    
    onMount(() => {

        if (input) {
            input.addEventListener("change", uploadaudio);
            dropArea.addEventListener("dragover", handleDragOver); 
            dropArea.addEventListener("drop", handleDrag);
        } else {
            console.error("El elemento con ID 'input-file' no se encontró en el DOM.");
        }
    });

    function uploadaudio() {
        if (input.files) {
            inputValue = input.files[0];
            let audioLink = URL.createObjectURL(input.files[0]);
            let audioElement = document.createElement('audio');
            let waveformContainer = document.createElement('div'); 
            audioElement.src = audioLink;
            audioElement.style.display = 'none';
            fileView.textContent = "";
            fileView.style.display = "flex";
            fileView.style.flexDirection = "column";
            fileView.style.justifyContent = "center";
            fileView.style.alignItems = "center";
            submitBtn.style.display = "flex";
            playPauseBtn.style.display = 'flex';
            playPauseBtn.style.marginBottom = '10px';
            waveformContainer.style.width = "60%";
            waveformContainer.appendChild(audioElement);
            fileView.appendChild(audioElement);
            fileView.appendChild(waveformContainer); 
            fileView.appendChild(playPauseBtn);
            fileView.appendChild(submitBtn);
            //console.log("Audio subido correctamente.");
            
            wavesurfer = WaveSurfer.create({
                container: waveformContainer,
                waveColor: '#4800B6',
                progressColor: 'rgba(72, 0, 182, 0.5)',
                barWidth: 7,
                barHeight: 0.5,
                barGap: 3,
                barRadius: 5,
            })

            wavesurfer.load(audioLink);

            playPauseBtn.addEventListener('click', function() {
                if (wavesurfer.isPlaying()) {
                    wavesurfer.pause();
                } else {
                    wavesurfer.play();
                }
            });
        }     
    }
    
    function handleDragOver(e: DragEvent) {
        e.preventDefault();
    }
    
    function handleDrag(e: DragEvent) {
        e.preventDefault();
        if (e.dataTransfer) {
            input.files = e.dataTransfer.files;
            uploadaudio();
        }
    }

    function handleContinue() {
        let formData = new FormData();
        formData.append("audio", inputValue);
        
        fetch("http://localhost:8080/uploadloops", {
          method: 'POST',
          body: formData
        }).then((response) => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
    };

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
                <div class="audioContaier" bind:this={audioContaier}><input type="file" class="btn-file" accept="audio/*" id="input-file" bind:this={input} on:change={uploadaudio}></div>
                <button class="pause-play-button" bind:this={playPauseBtn}>play/pause</button>
                <button on:click={handleContinue} bind:this={submitBtn} class="submit-btn" type="submit">Continue</button>
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

    .label-select-files:hover{
        cursor: pointer;
    }

    .centrado{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-weight: 600;
    }

    .pause-play-button {
        display: none;
        width: 100px;
        height: 40px;
        background-color: #4800B6;
        border: 0.5px solid #777877;
        color: white;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .pause-play-button:hover {
        background-color: #935ce0;
        cursor: pointer;
    }

    .submit-btn {
        display: none;
        width: 100px;
        height: 40px;
        background-color: #4800B6;
        color: white;
        border: 0.5px solid #777877;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-top: 50px;
    }

    .submit-btn:hover {
        background-color: #935ce0;
        cursor: pointer;
    }
</style>

