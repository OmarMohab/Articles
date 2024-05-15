import { Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { popularTagsActions } from "./store/actions";
import { combineLatest } from "rxjs";
import { selectError, selectIsLoading, selectPopularTagsData } from "./store/reducers";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ErrorMessageComponent } from "../errorMessage/errorMessage.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-popular-tags',
    standalone: true,
    imports: [CommonModule, MatChipsModule, MatProgressSpinnerModule, ErrorMessageComponent, RouterLink],
    templateUrl: './popularTags.component.html',
    styleUrl: './popularTags.component.css'
})
export class PopularTagsComponent implements OnInit {
    private store = inject(Store);

    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
        popularTags: this.store.select(selectPopularTagsData)
    });

    ngOnInit(): void {
        this.store.dispatch(popularTagsActions.getPopularTags())
    }
}