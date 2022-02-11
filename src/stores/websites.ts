import type { WebsiteCategory } from "../types";
import { readable, Writable, writable } from "svelte/store";

export const websiteCategories: Writable<WebsiteCategory[]> = writable([
]);

export const globals = readable(
    {
        FAVORITES: "favorites"
    }
)