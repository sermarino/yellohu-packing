import { PagesService } from './../../services/pages.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pages: any;

  constructor(
    private router: Router,
    private pagesService: PagesService
  ) { }

  ngOnInit(): void {
   this.getPages();
  }

  openSettings() {
    this.router.navigate(['/settings']);
  }

  getPages(){
    this.pagesService.getPages().subscribe(
      data => {
        this.pages = data
        console.log(data)
      }
    )
  }


}
