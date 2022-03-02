import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, CommentResponse } from '../models/comment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  serverUrl = 'https://movie-api.benoithubert.me'
  moviesPath = '/movies'

  constructor(
    private http: HttpClient
  ) { }

  getMovies(): Observable<Movie[]>{
    return this.http
      .get<Movie[]>(
        `${this.serverUrl}${this.moviesPath}`
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
}
