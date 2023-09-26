export interface Movies {
    title: string,
    thumbnail: string,
    video: string,
    desc1: string,
    desc2: string,
    view: number,
    type: string,
    year: number,
    id: string,
    userFavourite: string[];
}
export interface User {
    name: string,
    avatar: string,
    bio: string,
    email: string,
    favourites: Movies[],
    watched: string[],
    watchings: string[],
    id: string,
}