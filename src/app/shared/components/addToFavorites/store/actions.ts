import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleInterface } from "../../../types/atricle.interface";

export const addToFavoriteActions = createActionGroup({
    source: 'addToFavorite',
    events: {
        'Add to favorites': props<{ isFavorited: boolean, slug: string }>(),
        'Add to favorites success': props<{ article: ArticleInterface }>(),
        'Add to favorites failure': emptyProps()
    }
})