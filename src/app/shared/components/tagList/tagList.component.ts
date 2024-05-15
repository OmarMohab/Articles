import { Component, Input } from "@angular/core";
import { PopularTagType } from "../../types/popularTag.type";
import { MatChipsModule } from "@angular/material/chips";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-tag-list',
    standalone: true,
    imports: [CommonModule, MatChipsModule],
    templateUrl: './tagList.component.html',
    styleUrl: './tagList.component.css'
})
export class TagListComponent {
    @Input() tags: PopularTagType[] = []
}