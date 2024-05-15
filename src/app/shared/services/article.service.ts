import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ArticleInterface } from "../types/atricle.interface";
import { Observable, map } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { ArticleResponseInterface } from "../types/articleResponse.interface";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private http = inject(HttpClient);

    getArticle(slug: string): Observable<ArticleInterface> {
        const url = environment.apiUrl + `/articles/${slug}` 
        return this.http
            .get<ArticleResponseInterface>(url)
            .pipe(map((res) => res.article));
    }
}