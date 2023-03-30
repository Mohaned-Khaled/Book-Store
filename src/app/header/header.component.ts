import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchBooksService } from '../services/fetch-books.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showSearchBar: boolean;
  constructor(
    private fetchBooksService: FetchBooksService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      const myLoc = this.location.path();
      this.showSearchBar =
        myLoc === 'store' || myLoc === '/store' ? true : false;
    });
  }

  onSearch(form: NgForm) {
    const searchInput = form.value.search;

    this.fetchBooksService.fetchData(searchInput);

    form.reset();
  }
}
