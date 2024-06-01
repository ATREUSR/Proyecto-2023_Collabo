<script>
    import artista from "../images/artista.png";
</script>



<div class="upload-container">
    <h1>Post</h1>
    <div class="gradient-line"></div>
    <div class="post-header">
        <img src={artista} alt="">
        <div class="post-info">
            <h2>NLE CHOPPA TYPE LOOP | TRAP CHORDS</h2> <!-- esta linea usa valores planos pero que van a ser variables -->
            <p>@artisit you follow</p> <!-- esta linea tambien -->
            <p>upload 30 mins ago</p> <!-- esta linea tambien -->
        </div>
    </div>
    <audio controls>
            <!--<source src="horse.ogg" type="audio/ogg">
            <source src="horse.mp3" type="audio/mpeg"> -->
            Your browser does not support the audio element.
    </audio><!-- aca lo del audio que tengo que ver como se hace -->
    <button>collab</button>
</div>

<style>
    
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Coolvetica', sans-serif;
    }

    .gradient-line {
        height: 4px;
        background: linear-gradient(to right, #B700BD, #4800B6);
        border-radius: 5px;
    }

    .post-header {
        display: flex;
        align-items: start;
        margin-top: 10px;
    }

    .post-info {
        margin-left: 20px;
    }

</style>