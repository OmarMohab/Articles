import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { GetFeedResponeInterface } from "../types/getFeedResponse.interface";
import { environment } from "../../../../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FeedService {
    private http = inject(HttpClient);

    getFeed(url: string): Observable<GetFeedResponeInterface> {
        const fullUrl = environment.apiUrl + url;
        return this.http.get<GetFeedResponeInterface>(fullUrl)
    }
}