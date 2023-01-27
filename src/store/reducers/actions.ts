import {AuthActionCreator} from "./auth/actionCreators";
import {EventActionCreator} from './event/actionCreators'

export default {
    ...AuthActionCreator,
    ...EventActionCreator
}