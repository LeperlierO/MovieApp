import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  genres: Genre[] = [];
  error = '';
  selected: number = 0;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.getGenres(); 
  }

  getGenres(){
    this.movieService.getGenres()
      .subscribe({
        next: (genres) => {
          this.genres = genres;
        },
        error: (error) => {
          this.error = error;
          console.log(error);
        }
      })
  }

  selectGenre(genre: Genre){
    this.selected = genre.id;
    this.router.navigate(['/movies/'+genre.name])
  }

}
