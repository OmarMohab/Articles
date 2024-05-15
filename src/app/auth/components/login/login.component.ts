import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { authActions } from "../../store/actions";
import { LoginRequestInterface } from "../../types/loginRequest.interface";
import { combineLatest } from "rxjs";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducers";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { BackendErrorMessagesComponent } from "../../../shared/components/backendErrorMessages/backendErrorMessages.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        BackendErrorMessagesComponent,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private store = inject(Store);

    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidationErrors)
    });

    form = this.fb.nonNullable.group({
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required]
    });

    hide = true;

    onSubmit() {
        const request: LoginRequestInterface = { 
            user: this.form.getRawValue() 
        }

        this.store.dispatch(authActions.login({ request }));
    }
}