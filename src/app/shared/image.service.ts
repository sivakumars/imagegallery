import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
// npm install rxjs@6 rxjs-compat@6 --save
@Injectable()
export class ImageService{
  private query: string;
  private API_KEY: string = environment.PIXABAY_API_KEY;
  private API_URL: string = environment.PIXABAY_API_URL;
  private URL: string = this.API_URL + this.API_KEY + '&q=';
  private perPage: string = "&per_page=200";

  constructor(private _http: Http){ }

  getImage(query) {
    console.log("Inside the Image service URL get method " + this.URL + query + this.perPage);
    return this._http.get(this.URL + query + this.perPage).map(res => res.json());
  }

}
