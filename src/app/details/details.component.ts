import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  movie?:Movie;
  displayedColumns: string[] = ['id', 'text', 'date'];

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService.getMovie(id)
      .subscribe({
        next: (movie) => {
          this.movie = movie;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  addComment(){
    let comment: Comment = new Comment();
    comment.rating = 10;
    comment.text = "on fleek";

    if(this.movie!=undefined){
      this.movieService.comments(this.movie.id, comment).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
      
    this.router.navigate(['']);
  }

}
