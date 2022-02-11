<section class="category">
	{#if type == "display"}
    <h2>
        <span>
            {websiteCategory.name}
        </span>
        <button on:click={() => {delCategory(websiteCategory.name)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    </h2>
    <ul>
        {#each websiteCategory.sites as site}
            <FavLink site={site} category={websiteCategory}></FavLink>					
        {/each}
            <li class="favForm">
                <form on:submit|preventDefault={addFav}>
                    <div class="favInputs">
                        <input type="text" name="favName" placeholder="Name" required>
                        <input type="url" name="favLink" placeholder="https://my.link" required>
                        <input type="hidden" name="favCategory" value="{JSON.stringify(websiteCategory)}" />
                    </div>
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                    </button>
                </form>
            </li>
    </ul>
    {:else if type == "create"}
    <h2 class="create_category">
        <input bind:value={newCategory} placeholder="Add category">
        <button on:click={() => {addCategory(newCategory)}} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
        </button>
    </h2>
    {/if}
</section>

<script lang="ts">
    import type { Website, WebsiteCategory } from '../types';
	import { websiteCategories, globals } from '../stores/websites';
    import FavLink from './FavLink.svelte';

    export let websiteCategory: undefined | WebsiteCategory;
    export let type: "display" | "create"; 

    let newCategory: string;

    function addCategory(categoryName: string){
		const category: WebsiteCategory = {
			name: categoryName,
			sites: []
		}
		if (!$websiteCategories.some(e => e.name == categoryName) && categoryName != "" && categoryName != undefined ){
			$websiteCategories.push(category);
		}
		categoryName = "";
		setFavs();
	}
    
    function addFav(e): void{
		
		const formData = new FormData(e.target);
		const data: any = {};
		for (let field of formData) {
		const [key, value] = field;
			data[key] = value;
		}
		
		const newFav: Website = {
			name: data.favName,
			link: data.favLink
		};
		$websiteCategories[
			$websiteCategories.findIndex(() => { 
				return JSON.parse(data.favCategory)
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

    function delCategory(categoryName: string): void{
		$websiteCategories.forEach(e => {
			e.name == categoryName ? $websiteCategories.splice($websiteCategories.indexOf(e),1): false;
		})
		setFavs();
	}

</script>

<style>
    form{
		display: flex;
	}

    button{
		height: 2rem;
		background: none;
		border: none;
		color: var(--fg);
		filter: drop-shadow(2px 2px 2px #000000);
	}

	svg{
		width: 1.8rem;
	}

    .category{
		display: flex;
		flex-direction: column;
		padding: 1rem;
		border-left: var(--fg) 2px solid;
	}

	h2{
		display: flex;
		text-decoration: underline;
		margin: 1rem 0;
	}

	input{
		color: var(--fg);
		outline: none;
		font-family: 'Fira Sans', sans-serif;
		background: none;
		border: none;
		
	}

    .create_category input{
        font-size: 1.5rem;
		font-weight: bold;
        text-decoration: underline;
    }

    .category h2 span{
		flex: 4 1 auto;
	}

	.category h2 button{
		flex: 1 0 auto;
	}

	.category ul{
		margin: 0;
		padding-left: 0;
	}
	.category li{
		margin: 0.5rem;
	}

	.favForm{
		display: flex;
	}

    .favForm form button{
        text-align: center;
        height: 1rem;
        margin-left: auto;
		background: none;
		border: none;
		color: var(--fg);
		filter: drop-shadow(2px 2px 2px #000000);
        margin-right: 0;
	}

    .favForm form svg{
        height: 1rem;
    }

	.favInputs{
		display: flex;
		flex-direction: column;
	}

</style>