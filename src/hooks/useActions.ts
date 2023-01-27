import {bindActionCreators} from "redux";
import allActions from '../store/reducers/actions'
import {useDispatch} from "react-redux";

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(allActions, dispatch)
}