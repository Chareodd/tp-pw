import { Component } from '@angular/core';

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

  getMovies(input: string): void {
    if (input.length >= 3) {
      this.movies.push({title: input}) ;
    } else {
      this.movies = [] ;
    }
  }
}
