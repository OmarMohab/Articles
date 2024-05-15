import { Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { articleActions } from "../store/actions";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { selectArticleData, selectError, selectIsLoading } from "../store/reducers";
import { combineLatest, filter, map } from "rxjs";
import { selectCurrentUser } from "../../auth/store/reducers";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-article',
    standalone: true,
    imports: [CommonModule, RouterLink, MatCardModule, MatChipsModule, MatButtonModule, MatIconModule],
    templateUrl: './article.component.html',
    styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
    private store = inject(Store);
    private route = inject(ActivatedRoute);

    slug = this.route.snapshot.paramMap.get('slug') ?? '';
    isAuthor$ = combineLatest({
        article: this.store.select(selectArticleData),
        currentUser: this.store
            .select(selectCurrentUser)
            .pipe(filter((currentUser): currentUser is CurrentUserInterface | null => currentUser !== undefined))
    }).pipe(map(({ article, currentUser }) => {
        if (!article || !currentUser) {
            return false
        }
        return article.author.username === currentUser.username
    }));
    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
        article: this.store.select(selectArticleData),
        isAuthor: this.isAuthor$
    });
    
    ngOnInit(): void {
        this.store.dispatch(articleActions.getArticle({ slug: this.slug }))
    }

    deleteArticle(): void {
        this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }))
    }
}