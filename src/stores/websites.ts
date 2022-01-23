import { Readable,readable } from "svelte/store";

type Website = {
    name: string,
    link: string
}

type WebsiteCategory = {
    category: string,
    sites: Website[]
}

export const websites: Readable<WebsiteCategory[]> = readable([
    {
        category: 'Google',
        sites: [
            {name: 'YouTube', link: 'youtube.com'},
            {name: 'Gmail', link: 'mail.google.com/mail/u/0/?tab=wm&ogbl#inbox'},
            {name: 'Maps', link: 'google.com/maps'}
        ]
    },
    {
        category: 'Misc',
        sites: [
            {name: 'Sketchfab', link: 'sketchfab.com/feed'},
            {name: 'Github', link: 'github.com'},
        ]
    }
]);