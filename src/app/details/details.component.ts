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
  comment = new FormControl('', [Validators.required, Validators.email]);
  error = '';

  movie?:Movie;

  // Column table comments
  displayedColumns: string[] = ['id', 'text', 'date'];
  dataSource: MatTableDataSource<CommentResponse> = new MatTableDataSource<CommentResponse>([]);

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) { 
    this.commentForm = new FormGroup({
      comment: this.comment,
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
    const { comment } = this.commentForm.value;
    let newComment: Comment = new Comment();
    newComment.rating = 10;
    newComment.text = comment;

    if(this.movie!=undefined){
      this.movieService.comments(this.movie.id, newComment).subscribe({
        next: (response) => {
          this.dataSource.data.push(response);
          this.dataSource.data = this.dataSource.data;
          console.log(this.movie);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
      
  }

}
