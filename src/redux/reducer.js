/**
 * Created by 叶子 on 2017/10/4.
 */
import { combineReducers } from 'redux';
import { TYPE } from './actions';

const currentPlay = (state = {}, action) => {
    switch (action.type) {
        case TYPE.SET_PLAY_ID:
            return {...state, id: action.id};
        case TYPE.SET_PLAY_SONG:
            return {...state, ...action.song};
        default:
            return {...state};
    }
};

const currentPlayVideo = (state = {}, action) => {
    switch (action.type) {
        case TYPE.SET_PLAY_VIDEO:
            return {...state, ...action.video};
        default:
            return {...state};
    }
};

export default combineReducers({
    currentPlay,
    currentPlayVideo,
})