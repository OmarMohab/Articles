import { ArticleInterface } from "../../../types/atricle.interface";

export interface GetFeedResponeInterface {
    articles: ArticleInterface[],
    articlesCount: number
}