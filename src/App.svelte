<Options></Options>
<main style='background: center / cover no-repeat url("{$backgrounds.current}")'>
	<div class="global-wrapper">
		<div class="menu">
			{#each $websites as website}
				<section class="category">
	
					<h2>{website.category}</h2>
					<ul>
						{#each website.sites as site}
							<li style="list-style: url('https://s2.googleusercontent.com/s2/favicons?domain_url=https://{site.link}');">
								<a href="https://{site.link}">{site.name}</a>
							</li>						
						{/each}
					</ul>
				</section>
			{/each}	
		</div>
		<form on:submit|preventDefault={() => {search(searchTerm)}}>
			<input class="searchbar" type="search" placeholder="Search here ..." bind:value="{searchTerm}">
		</form>	
	</div>
</main>


<script lang="ts">
	import { websites } from './stores/websites';
	import { backgrounds } from './stores/backgrounds';

	import Options from "./Components/Options.svelte";

	let searchTerm: string;
	function search(q: string){
		const websiteExpr = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

		if(q.match(websiteExpr)){
			window.location.replace(`https://${q}`);
		}
		else{
			window.location.replace(`https://www.google.com/search?q=${q}`);
		}
	};

</script>

<style>

	/*	
		Both light and dark gruvbox color scheme are used for the startpage.
		All the colors with duplicate names are followed by _v (for variant)
		you can find the colorscheme at https://github.com/morhetz/gruvbox
	*/

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

	form{
		display: flex;
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
		text-decoration: underline;
		margin: 1rem 0;
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
</style>