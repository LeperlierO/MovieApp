import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import { Comment, CommentResponse } from '../models/comment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  // For
  commentForm: FormGroup = new FormGroup({});
  comment = new FormControl('', [Validators.required]);
  rating = new FormControl('', [Validators.required]);
  error = '';

  movie?:Movie;

  // Column table comments
  displayedColumns: string[] = ['id', 'text', 'rating', 'date'];
  dataSource: MatTableDataSource<CommentResponse> = new MatTableDataSource<CommentResponse>([]);

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) { 
    this.commentForm = new FormGroup({
      comment: this.comment,
      rating: this.rating
    });
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService.getMovie(id)
      .subscribe({
        next: (movie) => {
          this.movie = movie;
          this.movie.comments.map(c => this.dataSource?.data.push(c));
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  getCommentError() {
    if (this.comment.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  onSubmit(){
    const { comment, rating } = this.commentForm.value;
    let newComment: Comment = new Comment();
    newComment.rating = rating*2;
    newComment.text = comment;

    if(this.movie!=undefined){
      this.movieService.comments(this.movie.id, newComment).subscribe({
        next: (response) => {
          this.dataSource.data.push(response);
          this.dataSource.data = this.dataSource.data;
          this.commentForm.reset();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
      
  }

}
