import { Component, OnInit } from '@angular/core';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { SubredditModel } from 'src/app/subreddit/subredditModel';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css'],
})
export class SubredditSideBarComponent implements OnInit {
  subreddits: Array<SubredditModel> = [];
  constructor(private subredditService: SubredditService) {}
  displayViewAll: boolean;

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe((data) => {
      console.log(data);

      if (data.length >= 4) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });
  }
}
