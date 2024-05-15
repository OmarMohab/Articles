import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { selectCurrentUser } from "../../auth/store/reducers";
import { Subscription, combineLatest, filter } from "rxjs";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { selectIsSubmitting, selectValidationsErrors } from "../store/reducers";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { BackendErrorMessagesComponent } from "../../shared/components/backendErrorMessages/backendErrorMessages.component";
import { CurrentUserRequestInterface } from "../../shared/types/currentUserRequest.interface";
import { authActions } from "../../auth/store/actions";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        BackendErrorMessagesComponent, 
        CommonModule, 
        ReactiveFormsModule, 
        MatInputModule, 
        MatIconModule, 
        MatButtonModule,
        MatFormFieldModule
    ],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit, OnDestroy {
    private store = inject(Store);
    private fb = inject(FormBuilder)

    hide = true;

    currentUser?:CurrentUserInterface;
    currentUserSubscription?: Subscription;

    form = this.fb.nonNullable.group({
        image: '',
        username: '',
        bio: '',
        email: '',
        password: ''
    });

    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidationsErrors)
    })

    ngOnInit(): void {
        this.currentUserSubscription = this.store.pipe(
            select(selectCurrentUser),
            filter(Boolean)
        ).subscribe(currentUser => {
            this.currentUser = currentUser;
            this.initializeForm();
        })
    }

    ngOnDestroy(): void {
        this.currentUserSubscription?.unsubscribe();
    }

    initializeForm() {
        if (!this.currentUser) {
            throw new Error('Current user is not set.')
        }
        this.form.patchValue({
            image: this.currentUser.image ?? '',
            username: this.currentUser.username,
            bio: this.currentUser.bio ?? '',
            email: this.currentUser.email,
            password: ''
        })
    }
    
    submit(): void {
        if (!this.currentUser) {
            throw new Error('current user is not set')
        }
        const currentUserRequest: CurrentUserRequestInterface = {
            user: {
                ...this.currentUser,
                ...this.form.getRawValue()
            }
        }
        this.store.dispatch(authActions.updateCurrentUser({ currentUserRequest }))
    }

    logout(): void {
        this.store.dispatch(authActions.logout());
    }
}