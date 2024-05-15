import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ProfileInterface } from "../../../types/profile.interface";

export const followActions = createActionGroup({
    source: 'follow',
    events: {
        follow: props<{ username: string, isFollowing: boolean }>(),
        'Follow success': props<{ profile: ProfileInterface }>(),
        'Follow Failure': emptyProps()
    }
})