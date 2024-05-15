import { Component, Input } from "@angular/core";
import { BackendErrorsInterface } from "../../types/backendErrors.interface";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-backend-error-messages',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './backendErrorMessages.component.html'
})
export class BackendErrorMessagesComponent {
    @Input() backendErrors: BackendErrorsInterface = {};

    errorMessages: string[] = [];

    ngOnInit(): void {
        this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
            const messages = this.backendErrors[name].join(' ')
            return `${ name } ${ messages }`
        })
    }
}