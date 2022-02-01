<Options></Options>
<main style='background: center / cover no-repeat url("{$backgrounds.current}")'>
	<div class="global-wrapper">
		<div class="menu">
			{#each $websiteCategories as websiteCategory}
				<section class="category">
	
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
							<li style="list-style: url('https://s2.googleusercontent.com/s2/favicons?domain_url={site.link}');">
								<div class="website-wrapper">
									<a href="{site.link}">{site.name}</a>
									<button on:click={() => {delFav(site, websiteCategory)}}>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									</button>
								</div>
							</li>						
						{/each}
							<li class=favForm>
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
				</section>
			{/each}	
				<section class="category">
					<h2>
						<input bind:value={newCategory} placeholder="Add category">
						<button on:click={() => {addCategory(newCategory)}} >
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
							  </svg>
						</button>
					</h2>
				</section>
		</div>
		<form on:submit|preventDefault={() => {search(searchTerm)}}>
			<input class="searchbar" type="search" placeholder="Search here ..." bind:value="{searchTerm}">
		</form>	
	</div>
</main>


<script lang="ts">
	import type { Website, WebsiteCategory } from './types';
	import { websiteCategories } from './stores/websites';
	import { backgrounds } from './stores/backgrounds';
	import Options from "./Components/Options.svelte";

	const FAVORITES: string = "favorites";

	let newCategory: string;

	let searchTerm: string;

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

	function delCategory(categoryName: string){
		$websiteCategories.forEach(e => {
			e.name == categoryName ? $websiteCategories.splice($websiteCategories.indexOf(e),1): false;
		})
		setFavs();
	}

	function addFav(e){
		
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

	function delFav(fav: Website, category: WebsiteCategory)	{
		const categoryIndex: number = $websiteCategories.indexOf(category);
		const favIndex: number = $websiteCategories[categoryIndex].sites.indexOf(fav)
		$websiteCategories[categoryIndex].sites.splice(favIndex,1);
		setFavs();
	}

	function getFavs(){
		if(localStorage.getItem(FAVORITES)){
			$websiteCategories = JSON.parse(localStorage.getItem(FAVORITES));
		}
		else{
			$websiteCategories = [];
		}
	}

	function setFavs(){
		localStorage.setItem(FAVORITES, JSON.stringify($websiteCategories));
		getFavs();
	}

	function search(q: string){
		const websiteExpr = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

		if(q.match(websiteExpr)){
			window.location.replace(`https://${q}`);
		}
		else{
			window.location.replace(`https://www.google.com/search?q=${q}`);
		}
	};

	getFavs();

</script>

<style>

	@import url('https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap');

	:root{
		--blur_size: 6px;
		--bg: rgba(29, 32, 33, 0.4);
		--fg: #ebdbb2;
		--fg_light: #edbfb4;

		--color3: #b16286;
		--color4: #c27387;

	}

	*::-webkit-scrollbar-track
	{
		box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		border-radius: 10px;
		background-color: #F5F5F5;
	}

	*::-webkit-scrollbar
	{
		width: 12px;
		background-color: #F5F5F5;
	}

	*::-webkit-scrollbar-thumb
	{
		border-radius: 10px;
		box-shadow: inset 0 0 6px rgba(0,0,0,.3);
		background-color: #D62929;
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

	main{
		box-sizing: border-box;
		font-family: 'Fira Sans', sans-serif;

		height: 100%;
		width: 100%;
		color: var(--fg);
		font-size: 16px;
		display: grid;
		place-items: center;

		transition: background 500ms;
	}

	

	.global-wrapper{
		display: flex;
		flex-direction: column;
		border: var(--fg) 2px solid;
		background: var(--bg);
		backdrop-filter: blur(var(--blur_size));
		box-shadow: 20px 20px 50px 20px rgba(0,0,0,0.75);
		padding: 1rem;
	}

	.menu{
		display: flex;
		margin-bottom: 1rem;
	}

	form{
		display: flex;
	}

	.website-wrapper{
		display: flex;
		width: 100%;
	}

	.website-wrapper a{
		width: 100%;
	}

	.website-wrapper button{
		vertical-align: middle;
	}



	.searchbar{
		outline: none;
		border: 2px solid var(--fg);
		background: none;
		color: var(--color4);
		caret-color: var(--fg);
		font-size: 1rem;
		font-family: 'Fira sans', sans-serif;
		font-weight: bold;
		width: 100%;
	}

	.searchbar::placeholder{
		color: var(--fg_light);
	}

	.category{
		display: flex;
		flex-direction: column;
		padding: 1rem;
		border-left: var(--fg) 2px solid;
	}

	.category h2{
		display: flex;
		text-decoration: underline;
		margin: 1rem 0;
	}

	.category h2 input{
		color: var(--fg);
		outline: none;
		font-size: 1.5rem;
		font-weight: bold;
		font-family: 'Fira Sans', sans-serif;
		background: none;
		border: none;
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
		padding-left: 2rem;
	}
	.category li{
		margin: 0.5rem;
	}
	.category a{
		text-decoration: none;
		color: var(--fg);
		transition: 400ms color;
	}

	.category a:hover{
		color: var(--fg_light);
	}

	.favForm{
		display: flex;
	}
	.favInputs{
		display: flex;
		flex-direction: column;
	}

</style>