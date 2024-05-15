import { Component } from "@angular/core";
import { FeedComponent } from "../../../shared/components/feed/feed.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatChipsModule } from "@angular/material/chips"
import { BannerComponent } from "../../../shared/components/banner/banner.component";
import { PopularTagsComponent } from "../../../shared/components/popularTags/popularTags.component";
import { FeedTogglerComponent } from "../../../shared/components/feedToggler/feedToggler.component";

@Component({
    selector: 'app-global-feed',
    standalone: true,
    imports: [FeedComponent, BannerComponent, MatTabsModule, MatChipsModule, PopularTagsComponent, FeedTogglerComponent],
    templateUrl: './globalFeed.component.html',
    styleUrl: './globalFeed.component.css'
})
export class GlobaFeedComponent {
    apiUrl = '/articles'
}