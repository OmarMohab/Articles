import { ArticleInterface } from "../../shared/types/atricle.interface";

export interface ArticleStateInterface {
    isLoading: boolean,
    error: string | null,
    data: ArticleInterface | null
}