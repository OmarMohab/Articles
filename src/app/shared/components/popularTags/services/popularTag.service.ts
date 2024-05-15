import { Injectable, inject } from "@angular/core";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { PopularTagType } from "../../../types/popularTag.type";
import { Observable } from "rxjs/internal/Observable";
import { GetPopularTagsResponse } from "../types/getPopularTagsResponse.interface";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PopularTagService {
    private http = inject(HttpClient);

    getTags(response: GetPopularTagsResponse): PopularTagType[] {
        return response.tags;
    }

    getPopularTags(): Observable<PopularTagType[]> {
        const url = environment.apiUrl + '/tags';
        return this.http.get<GetPopularTagsResponse>(url).pipe(map(this.getTags));
    }
}