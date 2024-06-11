<div class="log-sign-in-container">
    <div class="log-in-container">
        <h1>Create account</h1>
        <div class="gradient-line"></div>
        <form action="">
            <div class="input">
                <label for="">Username</label>
                <input type="text" placeholder="example" required>
            </div>
            <div class="input">
                <label for="">Email</label>
                <input type="email" placeholder="example@gmail.com" required>
            </div>
            <div class="input">
                <label for="">Password</label>
                <input type="password" placeholder="password" required>
            </div>
            <div class="input">
                <label for="">Confirm Password</label>
                <input type="password" placeholder="password" required>
            </div>
            <div class="input">
                <input type="submit" class="submit-btn" placeholder="Register" required>
            </div>
        </form>
    </div>
</div>

<style>
    @import url('https://fonts.cdnfonts.com/css/utendo');

    *{
        font-family: 'Utendo', sans-serif;
    }

    .log-sign-in-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        margin: auto;
        padding: 0;
    }

    .log-in-container {
        transform: translateX(-30%);
    }

    .log-in-container h1 {
        display: flex;
        justify-content: center;    
        align-items: center;
        transform: translateX(30%);
    }

    .gradient-line {
        height: 6px;
        width: 170%;
        background: linear-gradient(to right, #B700BD, #4800B6);
        border-radius: 5px;
        margin-bottom: 25px;
    }
    
    .log-in-container label {
        font-weight: 600;
    }

    input {
        width: 165%;
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
    }

    input::placeholder {
        color: #a0a8a2;
        font-weight: 600;
    }


    .submit-btn{
        width: 170%;
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
</style>