import { createFeature, createReducer, on } from "@ngrx/store";
import { SettingsStateInterface } from "../types/settingsState.interface";
import { authActions } from "../../auth/store/actions";
import { routerNavigatedAction } from "@ngrx/router-store";

const initialState: SettingsStateInterface = {
    isSubmitting: false,
    validationsErrors: null
}

const settingsFeature = createFeature({
    name: 'settings',
    reducer: createReducer(
        initialState,
        on(authActions.updateCurrentUser, (state) => ({
            ...state,
            isSubmitting: false
        })),
        on(authActions.updateCurrentUserSuccess, (state) => ({
            ...state,
            isSubmitting: false,
        })),
        on(authActions.updateCurrentUserFailure, (state, action) => ({
            ...state,
            isSubmitting: false,
            validationsErrors: action.errors
        })),

        on(routerNavigatedAction, () => initialState)
        
    )
})

export const {
    name: settingsFeatureKey,
    reducer: settingsReducer,
    selectIsSubmitting,
    selectValidationsErrors
} = settingsFeature;