import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-feed-toggler',
    standalone: true,
    imports: [MatTabsModule, CommonModule, RouterLink, RouterLinkActive, MatButtonModule],
    templateUrl: './feedToggler.component.html',
    styleUrl: './feedToggler.component.css'
})
export class FeedTogglerComponent {
    @Input() tagName?: string;

    private store = inject(Store);
    currentUser$ = this.store.select(selectCurrentUser);
}