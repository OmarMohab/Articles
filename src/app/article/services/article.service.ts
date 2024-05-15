import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private http = inject(HttpClient);

    deleteArticle(slug: string) {
        const url = environment.apiUrl + `/articles/${slug}`
        return this.http.delete(url);
    }
}