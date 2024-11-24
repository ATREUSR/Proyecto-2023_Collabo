<!-- Modal.svelte -->
<script>
    export let message = '';
    export let onClose;
</script>

<div class="modal-backdrop">
    <div class="modal">
        <p>{message}</p>
        <button on:click={onClose}>Continuar</button>
    </div>
</div>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .modal button {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #4800B6;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .modal button:hover {
        background-color: #935ce0;
    }
</style>