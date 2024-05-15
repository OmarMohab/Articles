import { Component, Input, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { followActions } from "./store/actions";

@Component({
    selector: 'app-follow',
    standalone: true,
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './follow.component.html'
})
export class FollowComponent {
    private store = inject(Store);

    @Input() isFollowing: boolean = false;
    @Input() username: string = '';

    handleFollow(): void {
        this.store.dispatch(followActions.follow({ 
            username: this.username, 
            isFollowing: this.isFollowing 
        }));
        
        this.isFollowing = !this.isFollowing;
    }
}