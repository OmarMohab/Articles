import { Component, Input, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BannerComponent } from "../../shared/components/banner/banner.component";
import { FeedComponent } from "../../shared/components/feed/feed.component";
import { FeedTogglerComponent } from "../../shared/components/feedToggler/feedToggler.component";
import { PopularTagsComponent } from "../../shared/components/popularTags/popularTags.component";

@Component({
    selector: 'app-tag-feed',
    standalone: true,
    imports: [BannerComponent, FeedComponent, FeedTogglerComponent, PopularTagsComponent],
    templateUrl: './tagFeed.component.html',
    styleUrl: './tagFeed.component.css'
})
export class TagFeedComponent implements OnInit {
    private route = inject(ActivatedRoute);

    apiUrl: string = '';
    tagName: string = '';

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.tagName = params['slug'];
            this.apiUrl = `/articles?tag=${this.tagName}`
        });
    }
}