import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { userProfileActions } from "../store/actions";
import { combineLatest, filter, map } from "rxjs";
import { selectError, selectIsLoading, selectUserProfileData } from "../store/reducers";
import { selectCurrentUser } from "../../auth/store/reducers";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { UserProfileInterface } from "../types/userProfile.interface";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { FeedComponent } from "../../shared/components/feed/feed.component";
import { MatButtonModule } from "@angular/material/button";
import { FollowComponent } from "../../shared/components/follow/follow.component";

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule, FeedComponent, FollowComponent, RouterLink, MatIconModule, MatButtonModule, RouterLinkActive],
    templateUrl: './userProfile.component.html',
    styleUrl: './userProfile.component.css'
})
export class UserProfileComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private store = inject(Store);
    private router = inject(Router);

    slug: string = '';

    isCurrentUserProfile$ = combineLatest({
        currentUser: this.store.pipe(
            select(selectCurrentUser),
            filter((currentUser): currentUser is CurrentUserInterface => Boolean(currentUser))
        ),
        userProfile: this.store.pipe(
            select(selectUserProfileData),
            filter((userProfile): userProfile is UserProfileInterface => Boolean(userProfile))
        )
    }).pipe(map(({ currentUser, userProfile }) => {
        return currentUser.username === userProfile.username
    }))
    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
        userProfile: this.store.select(selectUserProfileData),
        isCurrentUserProfile: this.isCurrentUserProfile$
    })

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.slug = params['slug'];
            this.fetchUserProfile();
        })
    }

    fetchUserProfile(): void {
        this.store.dispatch(userProfileActions.getUserProfile({slug: this.slug}))
    }

    getApiUrl(): string {
        const isFavorites = this.router.url.includes('favorites');
        return isFavorites 
            ? `/articles/?favorited=${this.slug}` 
            : `/articles?author=${this.slug}`
    }
}