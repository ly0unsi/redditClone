import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { PostModel } from 'src/app/home/postModel';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
})
export class PostTileComponent implements OnInit {
  posts$: Array<PostModel> = [];
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComments = faComments;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((post) => {
      this.posts$ = post;
    });
  }
}
