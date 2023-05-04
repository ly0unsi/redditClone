import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubredditModel } from './subredditModel';

@Injectable({
  providedIn: 'root',
})
export class SubredditService {
  constructor(private httpClient: HttpClient) {}
  getAllSubreddits(): Observable<SubredditModel[]> {
    return this.httpClient.get<SubredditModel[]>(
      'http://localhost:8080/api/subreddit'
    );
  }
}
