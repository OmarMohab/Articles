import { ArticleInterface } from "../../shared/types/atricle.interface";
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";

export interface EditArticleStateInterface {
    article: ArticleInterface | null,
    isLoading: boolean,
    isSubmitting: boolean,
    validationErrors: BackendErrorsInterface | null,
}