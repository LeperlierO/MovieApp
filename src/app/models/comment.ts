export class Comment{
    rating!: number;
    text!: string;
}

export class CommentResponse{
    id!: number;
    movieId!: number;
    text!: string;
    rating!: number;
    date!: Date;
}