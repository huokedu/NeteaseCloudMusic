/**
 * Created by 叶子 on 2017/10/15.
 */
import React from 'react';
import { View } from 'react-native';
import { color } from '../utils';

export default ListSectionHeader = ({style, children}) => (
    <View style={[{height: 30, backgroundColor: color.border, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center'}, style]}>
        {children}
    </View>
)