import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { UserProfileInterface } from "../../../../userProfile/types/userProfile.interface";
import { Observable, map } from "rxjs";
import { GetUserProfileResponseInterface } from "../../../../userProfile/types/getUserProfileResponse.interface";
import { environment } from "../../../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class FollowService {
    private http = inject(HttpClient);

    getUrl(username: string): string {
        return `${environment.apiUrl}/profiles/${username}/follow`;
    }

    follow(username: string): Observable<UserProfileInterface> {
        const url = this.getUrl(username);

        return this.http
            .post<GetUserProfileResponseInterface>(url, {})
            .pipe(map((response) => response.profile));
    }

    unfollow(username: string): Observable<UserProfileInterface> {
        const url = this.getUrl(username);

        return this.http
            .delete<GetUserProfileResponseInterface>(url)
            .pipe(map((response) => response.profile));
    }
}