<script lang="ts">
    import imagen from '../images/brawlstars.png';
    import pfp1 from '../images/artista.png';
    import pfp from '../images/artista2.png';
    import { page } from '$app/stores';

    interface User {
        id: number;
        email: string;
        name: string;
        password: string;
    }

    let name = '';
    let loopId = '';
    let users: User[] = [];

    $: {
        name = $page.url.searchParams.get('name') || 'default name';
        loopId = $page.url.searchParams.get('loopId') || 'default id';

        fetch(`http://localhost:8003/loop-downloads/${loopId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                //'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            //console.log('Fetched data:', data); // Agrega este registro para ver la estructura de los datos
            users = data;
            console.log(users);
        })
        .catch(err => {
            console.error('Error fetching data:', err);
            users = []; // Asigna un array vacío en caso de error
        });
    }
</script>

<div class="security-container">
    <div class="title">
        <h1>Security</h1>
        <div class="gradient-line"></div>
    </div>
    <div class="loop-info">
        <img class="loop-img" src={imagen} alt="">
        <div class="loop-details">
            <h2 class="loop-name">{name}</h2>
            <div class="artist-info">
                <img class="artist-pfp" src={pfp1} alt="">
                <span class="loop-user">@dante</span>
            </div>
            <span class="loop-uploaded-time">uploaded 2 days ago</span>
        </div>
    </div>
    <div class="collab-record">
        <div class="record-subtitle">
            <h2>user</h2>
            <div class="gradient-line"></div>
        </div>
        <div class="users-list">
            {#each users as user}
                <div class="user">
                    <img class="user-pfp" src="" alt="">
                    <span class="user-name">@{user.name}</span>
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

    .title h1 {
        font-size: 25px;
        margin-bottom: 10px;
    }

    .gradient-line {
        height: 6px;
        background: linear-gradient(to right, #B700BD, #4800B6);
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .security-container {
        padding: 10px;
        margin: 0px 100px 0px 100px;
    }

    .loop-info {
        display: flex;
        align-items: center;
        margin-top: 20px;
    }

    .loop-img {
        width: 150px;
        height: 150px;
        margin-right: 20px;
    }

    .loop-details {
        display: flex;
        flex-direction: column;
    }

    .artist-info {
        display: flex;
        align-items: center;
        margin: 5px 0;
    }

    .artist-pfp {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .loop-name, .loop-user, .loop-uploaded-time {
        margin: 5px 0;
    }

    .collab-record {
        padding: 10px;
        border: 1px solid #FFFFFF;
        margin-top: 10px;
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
    }

    .users-list {
        display: flex;
        flex-direction: column;
        max-height: 150px; 
        overflow-y: auto;
    }

    .users-list::-webkit-scrollbar {
        width: 10px; /* Ancho de la barra de desplazamiento */
    }

    .users-list::-webkit-scrollbar-track {
        background: #E9E9E9; /* Color de fondo de la pista de desplazamiento */
        border-radius: 10px;
    }

    .users-list::-webkit-scrollbar-thumb {
        background: #4800B6; /* Color de la barra de desplazamiento */
        border-radius: 10px;
    }

    .users-list::-webkit-scrollbar-thumb:hover {
        background: #935ce0; /* Color de la barra de desplazamiento al pasar el mouse */
        cursor: pointer;
    }

    .user {
        display: flex;
        align-items: center;
        margin: 10px 0;
    }

    .user-pfp {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .user-name {
        font-size: 16px;
        font-weight: 500;
    }
</style>