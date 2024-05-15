import { createFeature, createReducer, on } from '@ngrx/store'
import { PopularTagsStateInterface } from '../types/popularTagsState.interface'
import { popularTagsActions } from './actions'
import { routerNavigatedAction } from '@ngrx/router-store'

const initialState: PopularTagsStateInterface = {
    isLoading: false,
    error: null,
    data: null
}

const populaTagsFeature = createFeature({
    name: 'popularTags',
    reducer: createReducer(
        initialState,
        on(popularTagsActions.getPopularTags, (state) => ({
            ...state,
            isLoading: true,
            error: null
        })),
        on(popularTagsActions.getPopularTagsSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            data: action.popularTags
        })),
        on(popularTagsActions.getPopularTagsFailure, (state) => ({
            ...state,
            isLoading: false
        })),

    )
})

export const {
    name: popularTagsFeatureKey,
    reducer: popularTagsFeature,
    selectIsLoading,
    selectError,
    selectData: selectPopularTagsData
} = populaTagsFeature