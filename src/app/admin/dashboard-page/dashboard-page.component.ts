import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postSub: Subscription;
  delSub: Subscription;
  searchStr = '';

  constructor(private postsService: PostsService, private alertService: AlertService) { }

  ngOnInit() {
    this.postSub = this.postsService.getPosts().subscribe(posts => {
      console.log('Posts: ', posts);
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    if (this.delSub) {
      this.delSub.unsubscribe();
    }
  }


  remove(id: string) {
    this.delSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.warning('Пост удален!');
    });
  }
}
