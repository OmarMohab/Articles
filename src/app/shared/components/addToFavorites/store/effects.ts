import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AddToFavoritesService } from "../services/addToFavorites.service";
import { addToFavoriteActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";

export const addToFavortiesEffect = createEffect((
    actions$ = inject(Actions),
    addToFavoritesService = inject(AddToFavoritesService)
) => {
    return actions$.pipe(
        ofType(addToFavoriteActions.addToFavorites),
        switchMap(({ isFavorited, slug }) => {
            const article$ = isFavorited ? addToFavoritesService.removeFromFavorites(slug) : addToFavoritesService.addToFavorites(slug);
            return article$.pipe(
                map((article) => {
                    return addToFavoriteActions.addToFavoritesSuccess({ article })
                }),
                catchError(() => {
                    return of(addToFavoriteActions.addToFavoritesFailure())
                })
            )
        },)
    )
}, { functional: true })