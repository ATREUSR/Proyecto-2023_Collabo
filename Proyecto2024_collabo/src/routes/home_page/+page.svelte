<div class="container">
    <div class="uncolor-half">
        <h1>Get<br> <span class="different-color">collabs</span><br> with other<br> producers</h1>
        <button class="go-button">Upload your stuff</button>
    </div>
    <div class="color-half">
        <h1 class="color-half-h1-increase">Increase <br> your <br> reach</h1>
        <h1>And <br> get sales</h1>
    </div>
</div>
<style>

    @import url('https://fonts.cdnfonts.com/css/utendo');

    *{
        font-family: 'Utendo', sans-serif;
    }

    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;  
    }

    .uncolor-half {
        background-color: #fff;
        margin-bottom: 50vh;
        font-size: 1.5em;
        margin-left: 100px;
        margin-top: 50px;
    }

    .different-color{
        background: linear-gradient(to right, #B700BD, #4800B6);
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .go-button{
        display: flex;
        width: 300px;
        height: 50px;
        background-color: #4800B6;
        border: 0.5px solid #777877;
        color: white;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 0.9em;
        font-weight: 600;
    }

    .go-button:hover{
        background-color: #935ce0;
        cursor: pointer;
    }

    .color-half{
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, #B700BD, #4800B6);
    }

    .color-half h1{
        color: white;
        font-size: 3em;
        margin: 50px;
    }

    .color-half-h1-increase{
        display: flex;
        align-items: end;
        justify-content: flex-end;
    }
</style>