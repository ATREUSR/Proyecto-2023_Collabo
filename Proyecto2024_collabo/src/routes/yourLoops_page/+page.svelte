<script lang="ts">
    import { goto } from '$app/navigation';
    import imagen from '../images/brawlstars.png';
    import { onMount } from 'svelte';

    function decodeToken(token: string): string {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload); 
    }

    const token = sessionStorage.getItem('token');
    const user = token ? decodeToken(token) : null;

    interface Loop {
        id: string;
        name: string;
        plays: number;
        collabs: number;
        likes: number;
        comments: number;
        date: string; 
        email: string;
    }

    let loops: Loop[] = [];

    onMount(async () => {
        if (!user) {
            console.error('Token no encontrado');
            return;
        }

        const userId = user.sub;
        console.log(userId);
        console.log(token);
        console.log("alvarito saraviaaaaaaaaaaaaaaaa ");
        fetch(`http://localhost:8003/artist-loops/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            loops = data.map((loop: any) => ({
                id: loop.id,
                name: loop.Name,
                plays: loop.downloads,
                collabs: loop.collabs,
                likes: loop.likes,
                comments: loop.comments,
                date: new Date(loop.createdAt).toLocaleDateString(), // Convertir a string
            }));
            //console.log(loops);
        })
        .catch(err => {
            console.error('Error fetching data:', err);
        });
    
        //console.log(loops);
    });

    function gotoToSecurity(loop: Loop) {
        //console.log(loop.id);
        if (!loop.id) {
            console.error('loop.id is undefined');
            return;
        }
        const params = new URLSearchParams({
            name: loop.name,
            loopId: loop.id,
        });
        goto(`/security_page?${params}`);
    }
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
            {#each loops as loop}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="loop" on:click={() => gotoToSecurity(loop)}>
                    <div class="loop-info">
                        <img class="loop-img" src={imagen} alt="">
                        <h2 class="loop-name">{loop.name}</h2>
                    </div>
                    <h2 class="loop-plays">-</h2>
                    <h2 class="loop-collabs">-</h2>
                    <h2 class="loop-likes">-</h2>
                    <h2 class="loop-comments">-</h2>
                    <h2 class="loop-date">{loop.date}</h2>
                </div>
            {/each}
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
        margin-left: 40px;
    }

    .date-categorie{
        margin-left: 50px;
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

    .loop:hover {
        background-color: #E9E9E9;
        border-radius: 15px;
        cursor: pointer;
    }

    .loop > :not(.loop-info) {
        margin-left: 50px; 
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

</style>