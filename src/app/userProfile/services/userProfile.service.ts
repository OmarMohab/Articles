import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { UserProfileInterface } from "../types/userProfile.interface";
import { environment } from "../../../environments/environment.development";
import { GetUserProfileResponseInterface } from "../types/getUserProfileResponse.interface";

Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    private http = inject(HttpClient);

    getProfile(slug: string): Observable<UserProfileInterface> {
        const url = `${environment.apiUrl}/profiles/${slug}`

        return this.http
            .get<GetUserProfileResponseInterface>(url)
            .pipe(map((response) => response.profile))
    }
}