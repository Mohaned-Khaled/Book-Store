import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FetchBooksService } from '../services/fetch-books.service';

export interface Book {
  author: string[];
  category: string[];
  description: string;
  id: string;
  imagePath: string;
  language: string;
  title: string;
}

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit, OnDestroy {
  myBooks: Book[];
  bookSub: Subscription;
  loadingSub: Subscription;
  errorSub: Subscription;
  pageSize = 10;
  currentPage = 1;
  loading: boolean;
  errorMsg: string;

  constructor(
    private fetchBooksService: FetchBooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadingSub = this.fetchBooksService.isLoading.subscribe((bol) => {
      this.loading = bol;
    });

    this.errorSub = this.fetchBooksService.errorMsg.subscribe((error) => {
      this.errorMsg = error;
    });

    this.bookSub = this.fetchBooksService.myBooks.subscribe((data) => {
      if (!data) this.fetchBooksService.fetchData();
      this.myBooks = data;
    });
  }

  onIncrease() {
    console.log(this.currentPage);
    if (this.currentPage > 1) return;
    this.currentPage += 1;
  }

  onDecrease() {
    console.log(this.currentPage);
    if (this.currentPage === 1) return;
    this.currentPage -= 1;
  }

  onDetail(id: string) {
    this.router.navigate(['book', id], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.bookSub?.unsubscribe();
    this.loadingSub?.unsubscribe();
    this.errorSub?.unsubscribe();
  }
}
