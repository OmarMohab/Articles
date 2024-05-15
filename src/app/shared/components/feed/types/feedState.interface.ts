import { GetFeedResponeInterface } from "./getFeedResponse.interface";

export interface FeedStateInterface {
    isLoading: boolean,
    error: string | null,
    data: GetFeedResponeInterface | null
}