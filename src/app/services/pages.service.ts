import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private siteUrl = 'http://3.126.134.171/';

  constructor( private http: HttpClient) { }

  getPages() {
    const url = `${this.siteUrl}/wp-json/wp/v2/pages/`
    return this.http.get(url)
  }

  getSinglePage(id: any) {
    const url = `${this.siteUrl}/wp-json/wp/v2/pages/${id}`
    return this.http.get(url)
  }


}
