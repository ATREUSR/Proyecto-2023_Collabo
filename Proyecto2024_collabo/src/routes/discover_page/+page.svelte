
<script lang="ts">
    import artista from "../images/artista.png";
    import artista2 from "../images/artista2.png";
    import artista3 from "../images/artista3.png";
    import brawl from "../images/brawlstars.png";
    import bethoven from "../images/bethoven.png";
    import artista4 from "../images/artista4.png";
    import artista5 from "../images/artista5.png";
    import artista6 from "../images/artista6.png";

    import profile from "../images/defaultpfp.png"

    import audio from "../audios/sunflower-street-drumloop-85bpm-163900.mp3"
    import audio2 from "../audios/amen-break-no-copyright-remake-120bpm-25924.mp3"
    import audio3 from "../audios/typical-trap-loop-140bpm-129880.mp3"
    import brawlaudio from "../audios/brawl-stars-loading-sound.mp3"
    import orquesta from "../audios/dramatic-ochestral-loop-154350.mp3"
    import audio4 from "../audios/bass-loops-012-with-drums-short-loop-120-bpm-6392.mp3"
    import audio5 from "../audios/beat-loop-by-mary.mp3"
    import audio6 from "../audios/beat-loop-by-marie-louise-janneman-21287.mp3"

    import WaveSurfer from 'wavesurfer.js';
    import { onMount, tick } from "svelte";
    import { goto } from '$app/navigation';
    
    let audioElements: HTMLElement[] = [];
    let wavesurfers: WaveSurfer[] = [];

    let Usuarios = [
        {
            nombre: "Down with me",
            artista: "@AlvaritoMusic",
            imagenArtista: artista3,
            imagenPerfil: profile,
            audio: audio3,
            uploadTime: "30 mins ago"
        },
        {
            nombre: "Brawl Stars Epic Loop",
            artista: "@WaterdyLoops",
            imagenArtista: brawl,
            imagenPerfil: profile,
            audio: brawlaudio,
            uploadTime: "30 mins ago"
        },
        {
            nombre: "Orquesta Beat God",
            artista: "@Bethoven",
            imagenArtista: bethoven,
            imagenPerfil: profile,
            audio: orquesta,
            uploadTime: "30 mins ago"
        },
        {
            nombre: "Loops with drums",
            artista: "@BlurJuanElPatan",
            imagenArtista: artista4,
            imagenPerfil: profile,
            audio: audio4,
            uploadTime: "30 mins ago"
        },
        {
            nombre: "Acoustic Piano Loop",
            artista: "@ScoobyDoo",
            imagenArtista: artista6,
            imagenPerfil: profile,
            audio: audio5,
            uploadTime: "30 mins ago"
        },
        {
            nombre: "SuperDuperEpic Loop",
            artista: "@Shredder",
            imagenArtista: artista5,
            imagenPerfil: profile,
            audio: audio6,
            uploadTime: "30 mins ago"
        },
    ];

    type Resultado = {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        Title: string;
        Description: string;
        Tags: string;
    }

    interface Loop {
        nombre: string;
        audio: string;
    }

    function gotoAudio(loop: Resultado, audio: string) {
        const params = new URLSearchParams({
            title: loop.Title,
            audioFile: audio
        }).toString();
        goto(`/dowload_page?${params}`);
    }

    onMount(() => {
        setwavesurfer();
    });

    function togglePlayPause(index: number) {
        wavesurfers[index].playPause();
    }

    function setwavesurfer(){

        wavesurfers.forEach(wavesurfer => {
            if (wavesurfer) {
                wavesurfer.destroy();
            }
        });
        wavesurfers = [];

        audioElements.forEach((elem, index) => {
            const audios = [audio, audio2, audio3, brawlaudio, orquesta, audio4, audio5, audio6];
            if (!wavesurfers[index]) { 
                wavesurfers[index] = WaveSurfer.create({
                    container: elem,
                    waveColor: '#4800B6',
                    progressColor: 'rgba(72, 0, 182, 0.5)',
                    barWidth: 7,
                    barHeight: 0.5,
                    barGap: 3,
                    barRadius: 5,
                    
                });
            }

            wavesurfers[index].load(audios[index]);
        });
    }

    let terminoBusqueda = ''; 
    let resultadosFiltrados: Resultado[] = [];

    async function filtrarLoops() {
        const response = await fetch("http://localhost:8003/searchloops?title=" + terminoBusqueda, {
          method: 'GET',
          credentials: 'include',
        })

        console.log(response);
        
        if (!response.ok) {
            // TODO: Handle 404 or error
            return
        }
        
        const data = await response.json();
        data.forEach((element: any) => {
            element.createdAt = new Date(element.createdAt);
            element.updatedAt = new Date(element.updatedAt);
        });
        resultadosFiltrados = data;

        /*resultadosFiltrados = Usuarios.filter(usuario => {
            return usuario.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                   usuario.artista.toLowerCase().includes(terminoBusqueda.toLowerCase());
            // Puedes añadir más campos de comparación aquí
        });*/
        await tick();
        audioElements = Array.from(document.querySelectorAll('.audio-container')).map(elem => elem as HTMLElement);
        
        setwavesurfer(); 
    }

</script>


<div class="discover-container">
    <h1>Discover</h1>
    <div class="gradient-line"></div>
    <div class="filter-loops-container">
        <div class="search-container">
            <input class="search-input" type="text" bind:value="{terminoBusqueda}" placeholder="Buscar...">
            <button class="search-button" on:click="{filtrarLoops}">Buscar</button>
        </div>
    </div>
    <h2 class="trending-loops">trending loops</h2>
    <div class="loops-container">
        {#each resultadosFiltrados as resultado, index}
        <div class="loop-container">
            <div class="loop-info">
                <img class="loop-img" src={artista} alt="">
                <div class="artist-upload-info">
                    <div class="loop-title">{resultado.Title}</div>
                    <div class="artist-detail">
                        <img class="profile-img" src={profile} alt="">
                        <p class="artist-follow">user</p> <!-- {resultado.userId.toString()} -->
                        <p>{new Date(new Date().valueOf() - resultado.createdAt.valueOf()).getMinutes() + "minutes"}</p> <!-- esta linea tambien -->
                    </div>
                    <div bind:this={audioElements[index]} class="audio-container" id="audio-container">
                        <source src={audio} type="audio" class="audio">
                    </div>
                    <button class="pause-play-button" on:click={() => togglePlayPause(index)}>play/pause</button>
                </div>
            </div>
            <div class="dowload-btn-conatainer">
                <button on:click={() => gotoAudio(resultado, audio)} class="dowload-button" >Collab</button>
            </div>
        </div>
        {/each}
    </div>
    <div class="trending-artists-container">
        {#each Usuarios as usuario}
        <div class="artist-container">
            <div class="artist-info">
                <img class="profile-info-img" src={usuario.imagenArtista} alt="">
                <p class="artist-info-follow">{usuario.artista}</p>
                <button class="follow-button">follow</button>
            </div>
        </div>
        {/each}
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

    .discover-container{
        margin: 0 20px
    }

    .gradient-line {
        height: 6px;
        background: linear-gradient(to right, #B700BD, #4800B6);
        border-radius: 5px;
        margin-bottom: 20px;
    }

    .search-container {
        display: flex; /* Esto alinea los elementos horizontalmente */
        align-items: center; /* Centra los elementos verticalmente */
        gap: 10px; /* Espacio entre el campo de búsqueda y el botón */
    }
  
    .search-input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        flex-grow: 1; /* Hace que el campo de búsqueda ocupe el espacio disponible */
    }
  
    .search-button {
        padding: 8px 16px;
        background-color: #4800B6;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
  
    .search-button:hover {
        background-color: #B700BD;
    }

    .search-container input[type=text] {
        width: 100%;
        padding: 6px;
        border: none;
        margin-right:0;
        font-size: 17px;
        border: solid 1px black;
        border-radius: 20px;
        font-weight: 700;
        background-color: #E9E9E9;
    }

    .trending-loops {
        margin-top: 20px;
        margin-bottom: 20px;
    }
        
    .loops-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }

    .loop-container {
      position: relative;
      background: #fff;
      width: 95%;
      height: 85%;
      border-radius: 10px;
      margin-right: 100px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      align-items: start;
    }

    .loop-img {
        width: 150px; 
        height: 150px; 
        object-fit: cover;
        border-radius: 10px; /* Opcional: Añade bordes redondeados si lo deseas */
    }

    .loop-info {
        display: flex; 
        align-items: start;
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
        font-size: 30px;
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
        width: 150%;
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
        transform: translateX(90px) translateY(-55px);
    }

    .pause-play-button:hover {
        background-color: #935ce0;
        cursor: pointer;
    }

    .dowload-btn-conatainer {
        position: absolute; 
        bottom: 10px; 
        right: 10px; 
        width: auto; 
        height: auto; 
    }

    .dowload-button {
      width: 100%;
      height: 10%;
      background-color: #4800B6;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
    }

    .dowload-button:hover {
      background-color: #B700BD;
    }

    .trending-artists-container {
        display: flex;
        overflow-x: auto;
        white-space: nowrap;
        margin-top: 300px;
    }

    .trending-artists-container > div {
        flex: 0 0 auto; 
    
    }

    .artist-container{
        width: 250px;
        display: flex;
        flex-direction: column;
        text-align: center;
        border: 1px solid #777877;
        border-radius: 15px;
        box-shadow: 0px 0px 10px 0px #777877;
        margin: 10px;
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