import { writable } from "svelte/store";

export let backgrounds = writable({
    list: [],
    current: './ressources/default_background.jpg'
});