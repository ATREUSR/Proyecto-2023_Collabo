<script>
    import imagen from '../images/brawlstars.png';
</script>

<div class="yourloops-container">
    <div class="title">
        <h1>Uploads</h1>
        <div class="gradient-line"></div>
    </div>
    <div class="loops-container">
        <div class="categories-container">
            <h2 class="loop-categorie">loop</h2>
            <h2 class="plays-categorie">plays</h2>
            <h2 class="collabs-categorie">collabs</h2>
            <h2 class="likes-categorie">likes</h2>
            <h2 class="comments-categorie">comments</h2>
            <h2 class="date-categorie">date</h2>
        </div>
        <div class="gradient-line"></div>
        <div class="loops">
            <div class="loop">
                <div class="loop-info">
                    <img class="loop-img" src={imagen} alt="">
                    <h2 class="loop-name">Brawl</h2>
                </div>
                <h2 class="loop-plays">47</h2>
                <h2 class="loop-collabs">55</h2>
                <h2 class="loop-likes">237</h2>
                <h2 class="loop-comments">50</h2>
                <h2 class="loop-date">27/8</h2>
            </div>
            <div class="loop">
                <div class="loop-info">
                    <img class="loop-img" src={imagen} alt="">
                    <h2 class="loop-name">Brawl</h2>
                </div>
                <h2 class="loop-plays">47</h2>
                <h2 class="loop-collabs">55</h2>
                <h2 class="loop-likes">237</h2>
                <h2 class="loop-comments">50</h2>
                <h2 class="loop-date">27/8</h2>
            </div>
            <div class="loop">
                <div class="loop-info">
                    <img class="loop-img" src={imagen} alt="">
                    <h2 class="loop-name">Brawl</h2>
                </div>
                <h2 class="loop-plays">47</h2>
                <h2 class="loop-collabs">55</h2>
                <h2 class="loop-likes">237</h2>
                <h2 class="loop-comments">50</h2>
                <h2 class="loop-date">27/8</h2>
            </div>
            <div class="loop">
                <div class="loop-info">
                    <img class="loop-img" src={imagen} alt="">
                    <h2 class="loop-name">Brawl</h2>
                </div>
                <h2 class="loop-plays">47</h2>
                <h2 class="loop-collabs">55</h2>
                <h2 class="loop-likes">237</h2>
                <h2 class="loop-comments">50</h2>
                <h2 class="loop-date">27/8</h2>
            </div>
            <div class="loop">
                <div class="loop-info">
                    <img class="loop-img" src={imagen} alt="">
                    <h2 class="loop-name">Brawl</h2>
                </div>
                <h2 class="loop-plays">47</h2>
                <h2 class="loop-collabs">55</h2>
                <h2 class="loop-likes">237</h2>
                <h2 class="loop-comments">50</h2>
                <h2 class="loop-date">27/8</h2>
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

    .yourloops-container {
        padding: 10px;
        margin: 0px 100px 0px 100px;
    }

    .title h1 {
        font-size: 25px;
    }

    .gradient-line {
        height: 6px;
        background: linear-gradient(to right, #B700BD, #4800B6);
        border-radius: 5px;
        margin: 20px 0;
    }

    .loops-container {
        padding: 10px;
        border: 1px solid #FFFFFF;
        margin-top: 10px;
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
    }

    .categories-container {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        margin-bottom: 10px;
        margin-left: 10px;
    }

    .loops {
        display: flex;
        flex-direction: column;
        max-height: 250px; 
        overflow-y: auto;
    }

    .loops::-webkit-scrollbar {
        width: 10px; /* Ancho de la barra de desplazamiento */
    }

    .loops::-webkit-scrollbar-track {
        background: #E9E9E9; /* Color de fondo de la pista de desplazamiento */
        border-radius: 10px;
    }

    .loops::-webkit-scrollbar-thumb {
        background: #4800B6; /* Color de la barra de desplazamiento */
        border-radius: 10px;
    }

    .loops::-webkit-scrollbar-thumb:hover {
        background: #935ce0; /* Color de la barra de desplazamiento al pasar el mouse */
        cursor: pointer;
    }

    .loop {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        align-items: center;
        padding: 10px 0;
    }

    .loop-info {
        display: flex;
        align-items: center;
    }

    .loop-img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }

    .loop h2 {
        margin: 0 10px;
    }
</style>