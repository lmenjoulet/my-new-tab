<div class="fav-wrapper">
    <img src="https://s2.googleusercontent.com/s2/favicons?domain_url={site.link}" alt="img">
    <a href="{site.link}">{site.name}</a>
    <button on:click={() => {delFav(site, category)}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </button>
</div>

<script lang="ts">
    import type {Website, WebsiteCategory} from '../types';
    import {websiteCategories, globals} from '../stores/websites';
    export let site: Website;
    export let category: WebsiteCategory;

    function delFav(fav: Website, category: WebsiteCategory)	{
		const categoryIndex: number = $websiteCategories.indexOf(category);
		$websiteCategories[categoryIndex].sites = $websiteCategories[categoryIndex].sites.filter(site => site !== fav);

        localStorage.setItem($globals.FAVORITES, JSON.stringify($websiteCategories));
	}
</script>

<style>
    .fav-wrapper{
		width: 100%;
        display: flex;
        margin: 0.25rem 0;
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
        text-align: center;
        height: 1rem;
        margin-left: auto;
		background: none;
		border: none;
		color: var(--fg);
		filter: drop-shadow(2px 2px 2px #000000);
	}

    svg{
        height: 1rem;
    }
</style>