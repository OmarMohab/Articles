import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, MatToolbarModule, MatIconModule, MatButtonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    private store = inject(Store);

    data$ = combineLatest({
        currentUser: this.store.select(selectCurrentUser)
    });
}