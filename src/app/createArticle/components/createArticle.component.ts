import { Component, inject } from "@angular/core";
import { ArticleFormValuesInterface } from "../../shared/components/articleForm/types/articleFormValues.interface";
import { ArticleFormComponent } from "../../shared/components/articleForm/articleForm.component";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { selectIsSubmitting, selectValidationErrors } from "../store/reducers";
import { ArticleRequestInterface } from "../../shared/types/articleRequest.interface";
import { createArticleActions } from "../store/actions";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-create-article',
    standalone: true,
    imports: [CommonModule, ArticleFormComponent],
    templateUrl: './createArticle.component.html',
    styleUrl: './createArticle.component.css'
})
export class CreateArticleComponent {
    private store = inject(Store);

    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidationErrors)
    })

    initialValues = {
        title: '',
        description: '',
        body: '',
        tagList: []
    }

    onSubmit(ArticleFormValues: ArticleFormValuesInterface): void {
        const request: ArticleRequestInterface = {
            article: ArticleFormValues
        }
        this.store.dispatch(createArticleActions.createArticle({ request }))
    }
}