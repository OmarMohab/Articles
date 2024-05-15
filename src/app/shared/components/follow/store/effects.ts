import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FollowService } from "../services/follow.service";
import { followActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";

export const followEffect = createEffect((
    actions$ = inject(Actions),
    followService = inject(FollowService)
) => {
    return actions$.pipe(
        ofType(followActions.follow),
        switchMap(({ username, isFollowing }) => {
            const profile$ = isFollowing ? followService.unfollow(username) : followService.follow(username);
            return profile$.pipe(
                map((profile) => {
                    return followActions.followSuccess({ profile })
                }),
                catchError(() => {
                    return of(followActions.followFailure());
                })
            )
        })
    )
}, { functional: true })