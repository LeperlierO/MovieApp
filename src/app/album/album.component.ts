import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  search : string ="";
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  error = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) { 
    this.getMovies();
   }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.getMovies();
    });
  }

  getMovies(){
    let genre = this.route.snapshot.paramMap.get('genre');

    if(genre != undefined){
      this.movieService.GetMoviesByGenre(genre)
      .subscribe({
        next: (movies) => {
          this.movies = movies;
          this.filteredMovies = movies;
        },
        error: (error) => {
          this.error = error;
        }
      })
    }else{
      this.movieService.getMovies()
      .subscribe({
        next: (movies) => {
          this.movies = movies;
          this.filteredMovies = movies;
        },
        error: (error) => {
          this.error = error;
        }
      })
    }
    
  }

  searchChanged(){
    this.filteredMovies = this.movies.filter(m => m.original_title.toUpperCase().includes(this.search.toUpperCase()));
  }

}
