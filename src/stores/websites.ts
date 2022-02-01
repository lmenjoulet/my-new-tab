import type { WebsiteCategory } from "../types";
import { Writable, writable } from "svelte/store";

export const websiteCategories: Writable<WebsiteCategory[]> = writable([
]);