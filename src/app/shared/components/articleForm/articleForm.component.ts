import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { ArticleFormValuesInterface } from "./types/articleFormValues.interface";
import { BackendErrorsInterface } from "../../types/backendErrors.interface";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { BackendErrorMessagesComponent } from "../backendErrorMessages/backendErrorMessages.component";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-article-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, BackendErrorMessagesComponent, MatInputModule, MatButtonModule],
    templateUrl: './articleForm.component.html',
    styleUrl: './articleForm.component.css'
})
export class ArticleFormComponent implements OnInit {
    private fb = inject(FormBuilder);

    @Input() initialValues?: ArticleFormValuesInterface;
    @Input() isSubmitting: boolean = false;
    @Input() errors: BackendErrorsInterface | null = null;

    @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

    form = this.fb.nonNullable.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        body: ['', Validators.required],
        tagList: ['', Validators.required]
    })

    ngOnInit(): void {
        this.initilizeForm()
    }

    initilizeForm(): void {
        if (!this.initialValues) {
            throw new Error('Inputs are not provided')
        }
        this.form.patchValue({
            title: this.initialValues.title,
            description: this.initialValues.description,
            body: this.initialValues.body,
            tagList: this.initialValues.tagList.join(' ')
        })
    }

    onSubmit(): void {
        const formValue = this.form.getRawValue();
        const articleFormValues: ArticleFormValuesInterface = {
            ...formValue,
            tagList: formValue.tagList.split(' ')
        };
        this.articleSubmit.emit(articleFormValues);
    }
}