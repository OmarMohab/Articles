import { ArticleRequestInterface } from "../../shared/types/articleRequest.interface";
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";

export interface CreateArticleStateInterface {
    isSubmitting: boolean,
    validationErrors: BackendErrorsInterface | null,
}