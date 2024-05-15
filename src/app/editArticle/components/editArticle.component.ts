import { Component, OnInit, inject } from "@angular/core";
import { ArticleFormValuesInterface } from "../../shared/components/articleForm/types/articleFormValues.interface";
import { ArticleFormComponent } from "../../shared/components/articleForm/articleForm.component";
import { Store, select } from "@ngrx/store";
import { Observable, combineLatest, filter, map } from "rxjs";
import { selectIsSubmitting, selectValidationErrors, selectIsLoading, selectArticle } from "../store/reducers";
import { ArticleRequestInterface } from "../../shared/types/articleRequest.interface";
import { editArticleActions } from "../store/actions";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ActivatedRoute } from "@angular/router";
import { ArticleInterface } from "../../shared/types/atricle.interface";

@Component({
    selector: 'app-edit-article',
    standalone: true,
    imports: [CommonModule, ArticleFormComponent, MatProgressSpinnerModule],
    templateUrl: './editArticle.component.html',
    styleUrl: './editArticle.component.css'
})
export class EditArticleComponent implements OnInit {
    private store = inject(Store);
    private route = inject(ActivatedRoute);

    slug = this.route.snapshot.paramMap.get('slug') ?? '';

    initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
        select(selectArticle),
        filter((article): article is ArticleInterface => article !== null),
        map((article: ArticleInterface) => {
            return {
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: article.tagList
            }
        })
    )

    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidationErrors),
        isLoading: this.store.select(selectIsLoading),
        initialValues: this.initialValues$
    })

    ngOnInit(): void {
        this.store.dispatch(editArticleActions.getArticle({ slug: this.slug }))
    }

    onSubmit(ArticleFormValues: ArticleFormValuesInterface): void {
        const request: ArticleRequestInterface = {
            article: ArticleFormValues
        }
        this.store.dispatch(editArticleActions.updateArticle({ request, slug: this.slug }))
    }
}