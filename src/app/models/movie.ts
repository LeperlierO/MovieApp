import { CommentResponse } from "./comment";

export class Movie {
    id!: number;
    original_title!: string;
    overview!: string;
    poster_path!: string;
    tagline!: string;
    vote_average!: number;
    spoken_languages!: Language[];
    runtime!: number;
    release_date!: Date;
    genres!: Genre[];
    genre_ids!: number[];
    comments!: CommentResponse[];
}

export class Language {
    english_name!: string;
    iso_639_1!: string;
    name!: string;
}

export class Genre{
    id!: number;
    name!: string;
}