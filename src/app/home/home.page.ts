import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Movie {
  title: string ;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  movies: Movie[] = [] ;

  constructor(
    private readonly router: Router
  ) {}

  getMovies(input: string): void {
    if (input.length >= 3) {
      this.movies.push({title: input}) ;
    } else {
      this.movies = [] ;
    }
  }

  showDetails(movie: Movie): void {
    this.router.navigate(['/details']) ;
  }
}
