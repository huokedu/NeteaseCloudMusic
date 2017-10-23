/**
 * Created by 叶子 on 2017/10/4.
 */

export const TYPE = {
    SET_PLAY_ID: 'SET_PLAY_ID',
    SET_PLAY_SONG: 'SET_PLAY_SONG',
    SET_PLAY_VIDEO: 'SET_PLAY_VIDEO',
};

// 设置播放歌曲id
export const setPlayId = id => ({
    type: TYPE.SET_PLAY_ID,
    id
});
// 设置播放歌曲详情
export const setPlaySong = song => ({
    type: TYPE.SET_PLAY_SONG,
    song
});

// 设置播放video详情
export const setPlayVideo = video => ({
    type: TYPE.SET_PLAY_VIDEO,
    video
});