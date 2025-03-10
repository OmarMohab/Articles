import { createFeature, createReducer, on } from "@ngrx/store";
import { ArticleStateInterface } from "../types/articleState.interface";
import { articleActions } from "./actions";
import { routerNavigatedAction } from "@ngrx/router-store";

const initialState: ArticleStateInterface = {
    isLoading: false,
    error: null,
    data: null
}

const articleFeature = createFeature({
    name: 'article',
    reducer: createReducer(
        initialState,
        on(articleActions.getArticle, (state) => ({
            ...state,
            isLoading: true,
            error: null
        })),
        on(articleActions.getArticleSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            data: action.article
        })),
        on(articleActions.getArticleFailure, (state) => ({
            ...state,
            isLoading: false
        })),

        on(routerNavigatedAction, () => initialState)
    )
})

export const {
    name: articleFeatureKey,
    reducer: articleReducer,
    selectIsLoading,
    selectError,
    selectData: selectArticleData
} = articleFeature