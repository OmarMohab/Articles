import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { feedActions } from "./store/actions";
import { combineLatest } from "rxjs";
import { selectError, selectFeedData, selectIsLoading } from "./store/reducers";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { ErrorMessageComponent } from "../errorMessage/errorMessage.component";
import { MatPaginatorModule } from "@angular/material/paginator"
import { environment } from "../../../../environments/environment.development";
import { PaginatorComponent } from "../paginator/paginator.component";
import queryString from 'query-string'
import { TagListComponent } from "../tagList/tagList.component";
import { MatIconModule } from "@angular/material/icon";
import { AddToFavoritesComponent } from "../addToFavorites/addToFavorites.component";

@Component({
    selector: 'app-feed',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        ErrorMessageComponent, 
        PaginatorComponent,
        TagListComponent,
        AddToFavoritesComponent,
        MatProgressSpinnerModule, 
        MatCardModule, 
        MatButtonModule,
        MatPaginatorModule,
        MatIconModule
    ],
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit, OnChanges {
    @Input() apiUrl: string = '';

    private store = inject(Store);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    limit = environment.limit;
    baseUrl = this.router.url.split('?')[0];
    currentPage: number = 0;

    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
        feed: this.store.select(selectFeedData)
    });


    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.currentPage = Number(params['page'] || 1);
            this.fetchFeed();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const isApiUrlChanged = 
            !changes['apiUrl'].firstChange 
            && changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue

        if (isApiUrlChanged) {
            this.fetchFeed()
        }
    }

    fetchFeed(): void {
        const offset = this.currentPage * this.limit - this.limit;
        const parsedUrl = queryString.parseUrl(this.apiUrl);
        const stringfiedParams = queryString.stringify({
            limit: this.limit,
            offset: offset,
            ...parsedUrl.query
        });
        const apiUrlWithParams = `${parsedUrl.url}?${stringfiedParams}`
        this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }));
    }
}