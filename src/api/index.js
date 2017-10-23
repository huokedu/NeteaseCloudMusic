/**
 * Created by 叶子 on 2017/9/22.
 */
const BASE_URL = 'http://ip:3000';

// 推荐音乐
export const PERSONALIZED = BASE_URL + '/personalized';
// 独家放送
export const PERSONALIZED_PRIVATECONTENT = PERSONALIZED + '/privatecontent';
// 最新音乐
export const PERSONALIZED_NEWSONG = PERSONALIZED + '/newsong';
// 推荐mv
export const PERSONALIZED_MV = PERSONALIZED + '/mv';
// banner
export const BANNER = BASE_URL + '/banner';
// 歌单
export const PLAYLIST = BASE_URL + '/playlist';
// 歌单详情
export const PLAYLIST_DETAIL = PLAYLIST + '/detail?id=';
// 精品标签
export const PLAYLIST_HIGHQUALITY = BASE_URL + '/top/playlist/highquality';
// 歌曲播放地址
export const MUSIC_URL = BASE_URL + '/music/url?id=';
// 歌曲详情
export const SONG_DETAIL = BASE_URL + '/song/detail?ids=';
// 歌词
export const SONG_LYRIC = BASE_URL + '/lyric?id=';
// 用户歌单
export const USER_PLAYLIST = BASE_URL + '/user/playlist?uid=';
// MV详情+播放地址接口
export const MV_DETIAL = BASE_URL + '/mv?mvid=';
// MV评论
export const MV_COMMENT = BASE_URL + '/comment/mv?id=';
// 用户详情
export const USER_DETAIL = BASE_URL + '/user/detail?uid=';
// 用户动态
export const USER_EVENT = BASE_URL + '/user/event?uid=';
// 朋友圈动态
export const FRIENDS_EVENT = BASE_URL + '/event';
// 榜单
export const TOP_LIST = BASE_URL + '/top/list?idx=';
// 推荐电台
export const DJPROGRAM_PERSONALIZED = BASE_URL + '/personalized/djprogram';
// 电台节目
export const DJ_PROGRAM = BASE_URL + '/dj/program?rid=';