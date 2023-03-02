export interface Pokemon {
    id: number;
    name: string;
    url: string;
    image: string;
}


export interface PokemonApiResponse {
    name: string;
    url: string;
}


export interface PokeApiResponse {
    count: number;
    next: string;
    previous?: any;
    results: PokemonApiResponse[];
}