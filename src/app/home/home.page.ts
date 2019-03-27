import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiKey } from 'src/tmdb';

export interface Movie {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}

interface TMDBReponse {
  results: Movie[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  movies: Promise<Movie[]> = Promise.resolve([]) ;

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  private async askTMDB(api: string, params: object): Promise<Movie[]> {
    const { results } = await this .http.get<TMDBReponse>(
    `https://api.themoviedb.org/3/${api}/movie`,
    { params: { api_key: apiKey, ...params } }
    ).toPromise();
    return results;
  }

  private searchMovies(search: string): Promise<Movie[]> {
    return this.askTMDB('search', {query: search}) ;
  }

  getMovies(input: string): void {
    if (input.length >= 3) {
      this.movies = this.searchMovies(input) ;
    } else {
      this.movies = Promise.resolve([]) ;
    }
  }

  showDetails(movie: Movie): void {
    this.router.navigate(['/details'], {state: movie}) ;
  }
}
