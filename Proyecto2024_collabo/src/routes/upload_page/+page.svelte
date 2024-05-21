<script>
	import rectangle from '../images/rectangulo_color.png';
    /*import { page } from '$app/stores';

    const dropArea = $page.params.dropArea;
    const input = $page.params;
    const fileView = $page.params.fileView;

    input.addEventListener("change", uploadimage)

    function uploadimage() {
        let audioLink = URL.createObjectURL(input.files[0]);
        fileView.style.backgroundImage = `url(${audioLink})`;
    }*/
</script>

<div class="space">
    <label for="input-file" id="drop-area">
        <div id="file-view">
            <p>Drag your stuff to upload:</p>
            <div class="btn-file-container">
                <label class="label-container" for="">
                    <img src={rectangle} alt="">
                    <p class="centrado">Or select your files here</p>
                </label>
                <input multiple type="file" class="btn-file" accept=".wav/.flac/.alac/.aiff" id="input-file">
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
        background: #0A3403;
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

    .label-container{
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