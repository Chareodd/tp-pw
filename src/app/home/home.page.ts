import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

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
    private readonly http: HttpClient,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {}

  private async askTMDB(api: string, params: object): Promise<Movie[]> {
    const loading = await this.loadingController.create({
      message: 'Waiting',
    });
    await loading.present() ;
    const { results } = await this .http.get<TMDBReponse>(
    `https://api.themoviedb.org/3/${api}/movie`,
    { params: { api_key: apiKey, ...params } }
    ).toPromise();
    await loading.dismiss() ;
    return results;
  }

  private searchMovies(search: string): Promise<Movie[]> {
    return this.askTMDB('search', {query: search}) ;
  }

  private discoverMovies(): Promise<Movie[]> {
    return this.askTMDB('discover', { primary_release_year: 2019 }) ;
  }

  getMovies(input: string): void {
    if (input.length >= 3) {
      this.movies = this.searchMovies(input) ;
    } else {
      this.movies = Promise.resolve([]) ;
    }
  }

  async getRandomMovie(): Promise<void> {
    const discoveredMovies: Movie[] = await this.discoverMovies();
    const randomMovie: Movie = discoveredMovies[Math.floor(Math.random() * discoveredMovies.length)];

    const alert = await this.alertController.create({
      header: randomMovie.title,
      subHeader: randomMovie.release_date,
      message: randomMovie.overview,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Show details',
          handler: () => {
            this.showDetails(randomMovie);
          }
        }
      ]
    });
    await alert.present();
  }

  showDetails(movie: Movie): void {
    this.router.navigate(['/details'], {state: movie}) ;
  }
}
