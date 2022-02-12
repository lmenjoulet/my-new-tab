{#if type === "display"}
<div class="fav-wrapper">
    <img src="https://s2.googleusercontent.com/s2/favicons?domain_url={site.link}" alt="img">
    <a href="{site.link}">{site.name}</a>
    <button on:click={() => {delFav(site, category)}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </button>
</div>
{:else if type === "create"}
<form class="favForm" on:submit|preventDefault={addFav}>
    <div class="favInputs">
        <input type="text" name="favName" placeholder="Name" bind:value={newFav.name} required>
        <input type="url" name="favLink" placeholder="https://my.link" bind:value={newFav.link} required>
    </div>
    <button type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
    </button>
</form>
{/if}


<script lang="ts">
    import type {Website, WebsiteCategory} from '../types';
    import {websiteCategories, globals} from '../stores/websites';

    export let site: Website;
    export let category: WebsiteCategory;

    export let type: "display" | "create";

    let newFav: Website = {
        name: "",
        link: ""
    }

    function delFav(fav: Website, category: WebsiteCategory)	{
		const categoryIndex: number = $websiteCategories.indexOf(category);
		$websiteCategories[categoryIndex].sites = $websiteCategories[categoryIndex].sites.filter(site => site !== fav);

        localStorage.setItem($globals.FAVORITES, JSON.stringify($websiteCategories));
	}

    function addFav(): void{

		$websiteCategories[
			$websiteCategories.findIndex((_category) => { 
				return _category.name === category.name;
			})
		].sites.push(newFav);

		setFavs();

	}

    function getFavs(): void{
		if(localStorage.getItem($globals.FAVORITES)){
			$websiteCategories = JSON.parse(localStorage.getItem($globals.FAVORITES));
		}
		else{
			$websiteCategories = [];
		}
	}

	function setFavs(): void{
		localStorage.setItem($globals.FAVORITES, JSON.stringify($websiteCategories));
		getFavs();
	}
</script>

<style>

    svg{
		width: 1.8rem;
	}

    input{
		color: var(--fg);
		outline: none;
		font-family: 'Fira Sans', sans-serif;
		background: none;
		border: none;
		
	}
    
    form{
		display: flex;
	}

    .fav-wrapper{
		width: 100%;
        display: flex;
        padding: 0.25rem 0;
    }

    img{
        width: 1rem;
        height: 1rem;
    }

    a{
        margin-left: 1rem;
        text-decoration: none;
        text-align: left;
		color: var(--fg);
		transition: 400ms color;
    }

    a:hover{
        color: var(--fg_light);
    }

    button{
        flex: 0 0 1;
        height: 100%;
        margin-left: auto;
		background: none;
		border: none;
		color: var(--fg);
		filter: drop-shadow(2px 2px 2px #000000);
	}

    svg{
        height: 1rem;
    }

    .favForm{
		width: 100%;
        display: flex;
        margin: 0.25rem 0;

		border: solid var(--fg) 2px;
	}

    .favForm button{
        margin-left: auto;
		background: none;
		border: none;
		color: var(--fg);
		filter: drop-shadow(2px 2px 2px #000000);
	}

    .favForm svg{
        height: 100%;
		position: relative;
		right: 0;
    }

	.favInputs{
		display: flex;
		flex-direction: column;
	}
</style>