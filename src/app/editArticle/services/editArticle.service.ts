import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ArticleInterface } from "../../shared/types/atricle.interface";
import { environment } from "../../../environments/environment.development";
import { Observable, map } from "rxjs";
import { ArticleRequestInterface } from "../../shared/types/articleRequest.interface";
import { ArticleResponseInterface } from "../../shared/types/articleResponse.interface";

@Injectable({
    providedIn: 'root'
})
export class EditArticleService {
    private http = inject(HttpClient);

    updateArticle(articleRequest: ArticleRequestInterface, slug: string): Observable<ArticleInterface> {
        const url = environment.apiUrl + `/articles/${slug}`;

        return this.http
            .put<ArticleResponseInterface>(url, articleRequest)
            .pipe(map((response) => response.article));
    }
}