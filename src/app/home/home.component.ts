import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuotesService } from '../services/quotes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  ourQuote: string;
  quoteSub: Subscription;
  loading: boolean;
  errorMsg: string = null;

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.quotesService.isLoading.subscribe((bol) => {
      this.loading = bol;
    });

    this.ourReq();
  }

  onChangeQuote() {
    this.ourReq();
  }

  ourReq() {
    this.quoteSub = this.quotesService.fetchQuotes().subscribe(
      (data) => {
        this.errorMsg = null;
        this.quotesService.isLoading.next(false);

        this.ourQuote = data;
      },
      (error) => {
        this.quotesService.isLoading.next(false);
        this.errorMsg = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.quoteSub?.unsubscribe();
  }
}
