/**
 * Created by 叶子 on 2017/10/15.
 */
import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Normal, Tip, H4 } from './TextTool';
import MenuRow from './MenuRow';
import Avatar from './Avatar';
import { color, screen } from '../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { setPlayId } from '../redux/actions';
import { withNavigation } from 'react-navigation';

class EventItem extends PureComponent {
    transDate = (time) => {
        const date = new Date(time);
        return `${date.getMonth() + 1}月${date.getDate()}日`;
    };
    playSong = id => {
        const { data } = this.props;
        data.type === 18 && this.props.dispatch(setPlayId(id));
        data.type === 13 && this.props.navigation.navigate('Detail', {title: '歌单', id})
    };
    renderItem = ({img, title, subTitle, id}) => (
        <View style={{padding: 6, flexDirection: 'row', height: 50, backgroundColor: color.border}}>
            <TouchableOpacity onPress={() => this.playSong(id)}>
                <Image style={{height: 38, width: 38}} source={{uri: img + '?param=80y80'}}>
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.3)', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name="ios-play-outline" size={20} color={color.white} />
                    </View>
                </Image>
            </TouchableOpacity>
            <View style={{flex: 1, justifyContent: 'space-around', marginLeft: 5}}>
                <H4 numberOfLines={1}>{title}</H4>
                <Tip color={color.gray} numberOfLines={1}>{subTitle}</Tip>
            </View>
        </View>
    );
    render() {
        const { data } = this.props;
        const json = JSON.parse(data.json);
        const pL = data.pics.length;
        const cW = screen.width - 80;
        const imgW = (pL === 1 && cW) || (pL === 2 && cW*0.48) || ((pL === 3 || pL > 4) && cW*0.32) || (pL === 4 && cW*0.35);
        return (
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Avatar img={{uri: data.user.avatarUrl + '?param=80y80'}} size={30} />
                </View>
                <View style={styles.contentContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity><Normal color={color.blue}>{data.user.nickname}</Normal></TouchableOpacity>
                        <Normal style={{marginLeft: 5}} color={color.gray}>
                            {data.type === 13 && '分享歌单'}
                            {data.type === 18 && '分享单曲'}
                            {data.type === 39 && '发布视频'}
                        </Normal>
                    </View>
                    <Tip>{this.transDate(data.eventTime)}</Tip>
                    {
                        !!json.msg && <Normal style={{marginTop: 20, marginBottom: 5, lineHeight: 25}}>{json.msg}</Normal>
                    }
                    {
                        data.type === 39 && (
                            <View style={{width: cW, height: cW / 2, paddingRight: 2, paddingBottom: 2}} >
                                <TouchableOpacity onPress={() => alert('暂无播放地址')}>
                                    <Image style={{width: '100%', height: '100%'}} source={{uri: json.video.coverUrl}}>
                                        <View style={{backgroundColor: 'rgba(0, 0, 0, 0.3)', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                            <Icon name="ios-play-outline" size={50} color={color.white} />
                                        </View>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    <View style={styles.imgContainer}>
                        {
                            data.pics.map((v, i) => (
                                <View key={i} style={{width: imgW, height: pL === 1 ? imgW / 2 : imgW, paddingRight: 2, paddingBottom: 2}} >
                                    <Image style={{width: '100%', height: '100%'}} source={{uri: v.rectangleUrl}}/>
                                </View>
                            ))
                        }
                    </View>
                    {
                        data.type === 18 && this.renderItem({img: json.song.album.picUrl, title: json.song.name, subTitle: json.song.artists.map(v => v.name).join('、'), id: json.song.id})
                    }
                    {
                        data.type === 13 && this.renderItem({img: json.playlist.coverImgUrl, title: json.playlist.name, subTitle: json.playlist.creator.nickname, id: json.playlist.id})
                    }
                    <View style={styles.iconContainer}>
                        <View style={styles.icon}>
                            <Icon name="ios-thumbs-up-outline" size={15} />
                            <Tip color={color.gray} style={{marginLeft: 3}}>{data.info.likedCount}</Tip>
                        </View>
                        <View style={styles.icon}>
                            <Icon name="ios-chatbubbles-outline" size={15} />
                            <Tip color={color.gray} style={{marginLeft: 3}}>{data.info.commentCount}</Tip>
                        </View>
                        <View style={styles.icon}>
                            <Icon name="ios-share-alt-outline" size={15} />
                            <Tip color={color.gray} style={{marginLeft: 3}}>分享</Tip>
                        </View>
                        <View style={styles.icon}>
                            <Icon name="ios-more" size={15} />
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: color.white,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    avatarContainer: {
        width: 60,
        alignItems: 'center'

    },
    contentContainer: {
        flex: 1,
    },
    imgContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'space-between'
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default connect()(withNavigation(EventItem));