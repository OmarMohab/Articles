import { Component, Input, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AddToFavoritesService } from "./services/addToFavorites.service";
import { Store } from "@ngrx/store";
import { addToFavoriteActions } from "./store/actions";

@Component({
    selector: 'app-add-to-favorites',
    standalone: true,
    imports: [MatIconModule, MatButtonModule],
    templateUrl: './addToFavorites.component.html'
})
export class AddToFavoritesComponent {
    private store = inject(Store);

    @Input() isFavorited: boolean = false;
    @Input() favoritesCount: number = 0;
    @Input() articleSlug: string = '';

    handleLike(): void {
        this.store.dispatch(addToFavoriteActions.addToFavorites({
            isFavorited: this.isFavorited,
            slug: this.articleSlug
        }))

        if (this.isFavorited) {
            this.favoritesCount = this.favoritesCount - 1;
        } else {
            this.favoritesCount = this.favoritesCount + 1;
        }

        this.isFavorited = !this.isFavorited;
    }
}