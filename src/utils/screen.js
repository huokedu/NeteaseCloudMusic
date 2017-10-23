/**
 * Created by 叶子 on 2017/8/23.
 */
import { Dimensions, PixelRatio } from 'react-native';
export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    onePixel: 1 / PixelRatio.get(),
    pageHeader: 50,
}