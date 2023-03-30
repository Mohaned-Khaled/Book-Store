import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FetchBooksService } from 'src/app/services/fetch-books.service';
import { Book } from '../books-list.component';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css'],
})
export class SingleBookComponent implements OnInit, OnDestroy {
  bookId: string;
  bookData: Book;
  bookSub: Subscription;
  loading: boolean;
  loadingSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private fetchBooksService: FetchBooksService
  ) {}

  ngOnInit(): void {
    this.loadingSub = this.fetchBooksService.isLoading.subscribe((bol) => {
      this.loading = bol;
    });

    this.route.snapshot.params;
    this.bookId = this.route.snapshot.params['id'];

    this.fetchBooksService.fetchSpecificBook(this.bookId).subscribe((data) => {
      this.bookData = data;
      this.fetchBooksService.isLoading.next(false);
    });
  }

  ngOnDestroy(): void {
    this.bookSub?.unsubscribe();
    this.loadingSub?.unsubscribe();
  }
}
