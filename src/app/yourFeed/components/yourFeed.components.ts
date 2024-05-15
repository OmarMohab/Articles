import { Component } from "@angular/core";
import { BannerComponent } from "../../shared/components/banner/banner.component";
import { FeedTogglerComponent } from "../../shared/components/feedToggler/feedToggler.component";
import { FeedComponent } from "../../shared/components/feed/feed.component";
import { PopularTagsComponent } from "../../shared/components/popularTags/popularTags.component";

@Component({
    selector: 'app-your-feed',
    standalone: true,
    imports: [BannerComponent, FeedTogglerComponent, FeedComponent, PopularTagsComponent],
    templateUrl: './yourFeed.component.html',
    styleUrl: './yourFeed.component.css'
})
export class YourFeedComponent {
    apiUrl = '/articles/feed'
}