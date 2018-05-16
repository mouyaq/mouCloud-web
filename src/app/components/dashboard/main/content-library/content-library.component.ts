import { LibraryItem } from './../../../../shared/model/library-item.model';
import { ContentLibraryService } from './../../../../shared/services/content-library.service';
import { Library } from './../../../../shared/model/library.model';
import { Subscription } from 'rxjs/Subscription';
import { InventoryService } from './../../../../shared/services/inventory.service';
import { Router, ActivatedRoute, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../../shared/services/task.service';
import { Task } from '../../../../shared/model/task.model';

@Component({
  selector: 'app-content-library',
  templateUrl: './content-library.component.html',
  styleUrls: ['./content-library.component.css']
})
export class ContentLibraryComponent implements OnInit, OnDestroy {
  library: Library;
  librarySubscription: Subscription;
  item: LibraryItem;
  items: Array<LibraryItem> = [];
  error: Object;
  private task: Task = new Task();
  private date: Date = new Date();

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private contentLibraryService: ContentLibraryService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.routes
      .data
      .subscribe(data => {
        this.items = data['LibraryItemsResolverGuard'];
      });

    this.library = this.contentLibraryService.getLibrary();
    this.librarySubscription = this.contentLibraryService.onLibraryChange()
      .subscribe(library => {
        this.library = library;
      });
  }

  ngOnDestroy() {
    this.librarySubscription.unsubscribe();
  }

  private getId() {
    const urlTree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    return s[2].path;
  }

  isOvf(item: LibraryItem): boolean {
    return item.type === 'ovf';
  }

}
