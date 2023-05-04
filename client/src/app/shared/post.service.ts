import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from '../home/postModel';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}
  getAllPosts(): Observable<PostModel[]> {
    return this.httpClient.get<PostModel[]>('http://localhost:8080/api/post');
  }
}
