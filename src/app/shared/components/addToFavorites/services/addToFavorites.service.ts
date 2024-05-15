import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../../../environments/environment.development";
import { Observable, map } from "rxjs";
import { ArticleInterface } from "../../../types/atricle.interface";
import { ArticleResponseInterface } from "../../../types/articleResponse.interface";

@Injectable({
    providedIn: 'root'
})
export class AddToFavoritesService {
    private http = inject(HttpClient);

    addToFavorites(slug: string): Observable<ArticleInterface> {
        const url = this.getUrl(slug);
        return this.http
            .post<ArticleResponseInterface>(url, {})
            .pipe(map(this.getArticle));
    }

    removeFromFavorites(slug: string): Observable<ArticleInterface> {
        const url = this.getUrl(slug);
        return this.http
            .delete<ArticleResponseInterface>(url)
            .pipe(map(this.getArticle))
    }

    getUrl(slug: string): string {
        return `${environment.apiUrl}/articles/${slug}/favorite`
    }

    getArticle(response: ArticleResponseInterface): ArticleInterface {
        return response.article
    }
}