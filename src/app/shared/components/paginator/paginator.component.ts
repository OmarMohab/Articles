import { Component, Input, OnInit, inject } from "@angular/core";
import { UtilsService } from "../../services/utils.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-paginator',
    standalone: true,
    imports: [CommonModule, RouterLink, MatButtonModule],
    templateUrl: './paginator.component.html',
    styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {
    private utils = inject(UtilsService);

    @Input() total: number = 0;
    @Input() limit: number = 20;
    @Input() currentPage: number = 1;
    @Input() url: string = '';

    pagesCount: number = 1;
    pages: number[] = [];

    ngOnInit(): void {
        this.pagesCount = Math.ceil(this.total / this.limit);
        this.pages = this.pagesCount > 0 ? this.utils.range(1, this.pagesCount) : [];
    }
}