import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, CommentResponse } from '../models/comment';
import { Genre, Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  serverUrl = 'https://movie-api.benoithubert.me'
  moviesPath = '/movies'
  genresPath = '/genres'

  constructor(
    private http: HttpClient
  ) { }

  getMovies(): Observable<Movie[]>{
    return this.http
      .get<Movie[]>(
        `${this.serverUrl}${this.moviesPath}`
      );
  }

  GetMoviesByGenre(genre: string): Observable<Movie[]>{
    const params = new HttpParams()
      .set('genre', genre);

    return this.http
    .get<Movie[]>(
      `${this.serverUrl}${this.moviesPath}`,
      {params}
    );
  }

  getMovie(id: number): Observable<Movie>{
    return this.http
      .get<Movie>(
        `${this.serverUrl}${this.moviesPath}/${id}`
      )
  }

  comments(id: number, comment: Comment){
    return this.http.post<CommentResponse>(
      `${this.serverUrl}${this.moviesPath}/${id}/comments`,
      comment
    );
  }

  getGenres(): Observable<Genre[]>{
    return this.http
      .get<Genre[]>(
        `${this.serverUrl}${this.genresPath}`
      );
  }
}
