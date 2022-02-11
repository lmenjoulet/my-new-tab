<Options></Options>
<main style='background: center / cover no-repeat url("{$backgrounds.current}")'>
	<div class="global-wrapper">
		<div class="menu">
			{#each $websiteCategories as websiteCategory}
			<FavCategory websiteCategory={websiteCategory} type="display"></FavCategory>
			{/each}	
			<FavCategory websiteCategory={undefined} type="create" ></FavCategory>
		</div>
		<SearchBar></SearchBar>
	</div>
</main>


<script lang="ts">
	import { websiteCategories, globals } from './stores/websites';
	import { backgrounds } from './stores/backgrounds';
	import Options from "./Components/Options.svelte";
	import SearchBar from "./Components/SearchBar.svelte";
	import FavCategory from "./Components/FavCategory.svelte";

	function getFavs(){
		if(localStorage.getItem($globals.FAVORITES)){
			$websiteCategories = JSON.parse(localStorage.getItem($globals.FAVORITES));
		}
		else{
			$websiteCategories = [];
		}
	}

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

</style>