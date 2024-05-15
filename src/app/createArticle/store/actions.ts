import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleRequestInterface } from "../../shared/types/articleRequest.interface";
import { ArticleInterface } from "../../shared/types/atricle.interface";
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";

export const createArticleActions = createActionGroup({
    source: 'create article',
    events: {
        'Create article': props<{ request: ArticleRequestInterface }>(),
        'Create article success': props<{ article: ArticleInterface }>(),
        'Create article failure': props<{ errors: BackendErrorsInterface }>()
    } 
});