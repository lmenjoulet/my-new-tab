<button class="menu clickable" on:click={toggleOptionsBar}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
</button>
<div class="global-wrapper" class:no-width={!options.visible}>
    <div class="selected-option" class:invisible={!options.visibleDelay}>
        <svelte:component this={selectedOption}/>
    </div>
</div>

<script lang="ts">
    import BackgroundPicker from "./BackgroundPicker.svelte";

    let selectedOption = BackgroundPicker;
    let options = {
        selected: BackgroundPicker,
        visible: false,
        visibleDelay: false
    }

    function toggleOptionsBar(){
        options.visible = !options.visible;
        
        if(!options.visible){ // si les options deviennent invisibles
            setTimeout(()=>{
                options.visibleDelay = !options.visibleDelay;
            },200)
        }
        else{
            options.visibleDelay = !options.visibleDelay;
        }
        
    }
</script>

<style>
    .global-wrapper{
        background-color: var(--bg);
        backdrop-filter: blur(var(--blur_size));
        box-sizing: border-box;
        border-right: var(--fg) 2px solid;
        position: fixed;
        display: flex;
        width: 18rem;
        height: 100vh;
        flex-direction: column;
        transition: width 300ms;        
    }


    .no-width{
        width: 0;
        border: 0;
    }

    .invisible{
        width: 0;
        visibility: hidden;
    }
    
    .menu{
        background: none;
        border: none;
        color: var(--fg);
        width: 3rem;
        position: absolute;
        z-index: 1;
    }

    .menu:hover{
        color: var(--color3);
    }

    .selected-option{
        width: 100%;
        height: 100%;

        margin-top: 5rem;
    }

    .clickable{
        cursor: pointer;
        transition: filter 100ms, transform 100ms, color 200ms;
        filter: drop-shadow(3px 3px 2px rgba(0,0,0,.5))
    }

    .clickable:hover{
        color: var(--fg_light);
    }

    .clickable:active{
        transform: translate(2px, 2px);
        filter: drop-shadow(3px 3px 0 rgba(0,0,0,0))
    }
</style>