<form on:submit|preventDefault={() => {search(searchTerm)}}>
    <input class="searchbar" type="search" placeholder="Search here ..." bind:value="{searchTerm}">
</form>	


<script lang="ts">
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
</style>