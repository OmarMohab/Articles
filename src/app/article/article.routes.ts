import { Route } from "@angular/router";
import { ArticleComponent } from "./components/article.component";
import * as articleEffects from './store/effects'
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { articleFeatureKey, articleReducer } from "./store/reducers";

export const routes: Route[] = [
    {
        path: '',
        component: ArticleComponent,
        providers: [
            provideState(articleFeatureKey, articleReducer),
            provideEffects(articleEffects)
        ]
    }
]