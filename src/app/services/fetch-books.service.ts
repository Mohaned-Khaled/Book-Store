import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Subject, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/enviroment';
import { Book } from '../books-list/books-list.component';

interface fetchedData {
  kind: string;
  totalItems: number;
  items: any[];
}

@Injectable({ providedIn: 'root' })
export class FetchBooksService {
  myBooks = new BehaviorSubject<Book[]>(null);
  searchQuery = new Subject<string>();
  isLoading = new Subject<boolean>();
  errorMsg = new Subject<string>();

  constructor(private http: HttpClient) {}

  fetchData(query: string = 'subject:fiction') {
    this.searchQuery.next(query);

    this.isLoading.next(true);

    return this.http
      .get<fetchedData>(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&key=${environment.API_KEY}`
      )
      .pipe(
        map((data) => {
          const booksStore = [];
          data.items.forEach((data) => {
            const book = {
              id: data.id,
              author: data.volumeInfo.authors,
              category: data.volumeInfo.categories,
              imagePath: data.volumeInfo.imageLinks.thumbnail,
              language: data.volumeInfo.language,
              title: data.volumeInfo.title,
              description: data.volumeInfo.description,
            };
            booksStore.push(book);
          });
          return booksStore;
        }),
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe(
        (data) => {
          this.errorMsg.next(null);
          this.myBooks.next(data);
          this.isLoading.next(false);
        },
        (error) => {
          this.errorMsg.next('Please enter a valid search');
          this.isLoading.next(false);
        }
      );
  }

  fetchSpecificBook(id: string) {
    this.isLoading.next(true);
    return this.http
      .get<any>(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${environment.API_KEY}`
      )
      .pipe(
        map((data) => {
          const book = {
            id: data.id,
            author: data.volumeInfo.authors,
            category: data.volumeInfo.categories,
            imagePath: data.volumeInfo.imageLinks.thumbnail,
            language: data.volumeInfo.language,
            title: data.volumeInfo.title,
            description: data.volumeInfo.description,
          };
          return book;
        })
      );
  }
}
