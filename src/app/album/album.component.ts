import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  movies: Movie[] = [];
  error = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies(); 
  }

  getMovies(){
    let genre = this.route.snapshot.paramMap.get('genre');

    this.movieService.getMovies()
      .subscribe({
        next: (movies) => {
          this.movies = movies;
          if(genre != null) this.movies = this.movies.filter(m => m.genre_ids != undefined && m.genre_ids.includes(this.getGenreNumber(genre)));
        },
        error: (error) => {
          this.error = error;
        }
      })
  }

  getGenreNumber(genre: string | null): number{
    switch(genre){
      case "Action":
        return 28;
      default:
        return 0;
    }
  }

}
