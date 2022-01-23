<div class="global-wrapper">
    <div class="backgrounds-wrapper">
        <ul class="backgrounds-display">
            {#each $backgrounds.list as background}
                <li class="background-item">
                    <img class="background-image" src="{background.image}" alt="background lel">
                    <div class="background-options">
                        <button class="select-wp clickable" on:click={()=>{selectBackground(background.name)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <button class="remove-wp clickable" on:click={()=> {removeImage(background.name)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </li>
            {/each}    
        </ul>
        <div class="background-empty">

        </div>
    </div>
    
    <form class="background-form">
        <label for="image-upload" class="form-element clickable">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span>Upload a file UwU</span>
        </label>
        <input id="image-upload" class="display-none" type="file" bind:files={submitted.files} on:change|preventDefault={()=>{saveImage(submitted.files[0])}}>
    </form>
</div>


<script lang="ts">
    import Vibrant from 'node-vibrant/dist/vibrant';
    import {backgrounds} from '../stores/backgrounds';

    const dbParams = {
        dbName: "wallpapers",
        storeName: "wallpapers"
    }

    const request = window.indexedDB.open(dbParams.dbName);
    let db : IDBDatabase;

    request.onupgradeneeded = function (event) {
        db = request.result;
        if(db.objectStoreNames.contains(dbParams.storeName)){
        }
        else{
            db.createObjectStore(dbParams.storeName, {autoIncrement: true});
        }
    };

    let dbAvailable = new Promise((res, rej) => {
        if(request.readyState === 'done'){
            res(true);
        }
        else{
            request.onsuccess = (e) => {
                db = request.result;
                res(true);
            }

            request.onerror = (e) => {
                res(false);
            }
        }
    });

    let submitted: {
        files: any
    } = {
        files: {}
    };

    async function updateBackgroundsList() {
        await dbAvailable;
        const transaction = db.transaction(dbParams.storeName,'readwrite');
        const store = transaction.objectStore(dbParams.storeName).getAllKeys();
        store.onsuccess = (e) => {
            const keys = store.result;
            let result = [];
    
            const getTransaction = db.transaction(dbParams.storeName, 'readonly');
            const wpStore = getTransaction.objectStore(dbParams.storeName);
            keys.forEach(name => {
                const file = wpStore.get(name);
                file.onsuccess = () => {
                    result = [...result, {name, 'image': URL.createObjectURL(file.result.thumbnail)}]
                };
            });
            
            getTransaction.oncomplete = (e) => {
                $backgrounds.list = result;
            }

            getTransaction.onerror = (e) => {
                console.log(e.target);
            }
        }
    }

    async function saveImage(blob: Blob){
        await dbAvailable;
        const thumbSize = {
            x: 384,
            y: 216
        }
        var canvas = document.createElement("canvas");
        canvas.style.width = `${thumbSize.x}px`;
        canvas.style.height = `${thumbSize.y}px`;
        let context = canvas.getContext("2d");
        let img = document.createElement("img");

        img.src = URL.createObjectURL(blob);

        img.onload = async function () {
            context.scale(thumbSize.x/img.width,  thumbSize.y/img.height);
            context.drawImage(img, 0, 0); 
            
            const thumbnail = await new Promise( res => canvas.toBlob(res));

            let transaction = db.transaction([dbParams.storeName], "readwrite");
            let add = transaction.objectStore(dbParams.storeName).add({'raw': blob, 'thumbnail': thumbnail});

            add.onsuccess = updateBackgroundsList;
        }
    }

    async function removeImage(key: string){
        await dbAvailable;
        let transaction = db.transaction([dbParams.storeName], "readwrite");
        let remove = transaction.objectStore(dbParams.storeName).delete(key);
        remove.onsuccess = ()=>{
            updateBackgroundsList();
        }
    }

    async function selectBackground(key: number){
        await dbAvailable;
        let transaction = db.transaction([dbParams.storeName], "readwrite");
        let get = transaction.objectStore(dbParams.storeName).get(key);
        get.onsuccess = (()=>{
            if(get.result === undefined){
                $backgrounds.current = './ressources/default_background.jpg';
                updateColorPalette();
            }
            else{
                localStorage.setItem('currentBackground', key.toString());
                $backgrounds.current = URL.createObjectURL(get.result.raw);
                updateColorPalette();
            }
        })
        get.onerror = (()=>{
        })
    }

    function updateColorPalette(){

        Vibrant.from($backgrounds.current).getPalette()
            .then((palette) => {
                console.log(palette);
                const root = document.documentElement;
                root.style.setProperty('--fg', palette.DarkMuted.getHex());
                root.style.setProperty('--fg_light', palette.Muted.getHex());
                root.style.setProperty('--bg', `rgba(${palette.Muted.getRgb()[0]},${palette.Muted.getRgb()[1]},${palette.Muted.getRgb()[2]},.6)`);
                root.style.setProperty('--color3', palette.Vibrant.getHex());
                root.style.setProperty('--color4', palette.DarkVibrant.getHex());

            });
    }

    updateBackgroundsList();
    selectBackground(parseInt(localStorage.getItem('currentBackground')));


</script>

<style>
    *{
        font-family: 'Fira Sans', sans-serif;
        font-size: 16px;
    }

    .display-none{
        display: none;
    }
    
    .global-wrapper{
        display: flex;
        flex-direction: column;
        max-height: 100vh;
    }

    .backgrounds-wrapper{
        display: flex;
        border: 3px solid var(--fg);
        margin: 0 0.5rem;
        padding: 0;
        box-sizing: border-box;
    }

    .background-empty{
        width: 1rem;
    }

    .backgrounds-display{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
        overflow-y: scroll;
        overflow-x: hidden;
        max-height: 70vh;
        padding: 0.5rem;

    }

    .background-item{
        height: 8rem;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin: 0.5rem;
    }

    .background-image{
        max-width: 80%;
        margin-left: 0.5rem;
        box-shadow: 3px 3px 2px 0px rgba(0, 0, 0, .5);
    }

    .background-options{
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 100%;
        height: 100%;
        padding: auto;
    }

    .background-options button{
        width: 2.5rem;
        height: 2.5rem;
        background: none;
        border: none;
        color: var(--fg);
        padding-left: 0.5rem;
    }

    .clickable{
        cursor: pointer;
        transition: filter 100ms, transform 100ms, color 100ms;
        filter: drop-shadow(3px 3px 2px rgba(0,0,0,.5));
    }

    .clickable:hover{
        color: var(--fg_light);
    }

    .clickable:active{
        transform: translate(2px, 2px);
        filter: drop-shadow(3px 3px 0px rgba(0,0,0,0))
    }

    .background-form{
        display: flex;
        flex-direction: column;
        padding: 0 0.5rem;
        align-items: stretch;
        flex-shrink: 0;
    }

    .form-element{
        margin: 0.5rem 0;
        outline: none;
        color: var(--fg);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .form-element svg{
        width: 2rem;
        height: 2rem;
    }

    *::-webkit-scrollbar-track
	{
		background-color: none;
	}

	*::-webkit-scrollbar
	{
		width: 5px;
		background-color: none;
	}

	*::-webkit-scrollbar-thumb
	{
		background-color: var(--fg);
	}
</style>