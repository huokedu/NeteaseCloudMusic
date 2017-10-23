/**
 * Copyright 2017-present, chenghao.
 * All rights reserved.
 *
 * 垂直分割线
 * Created by SEELE on 2017/10/16
 *
 */
import React from 'react';
import { View } from 'react-native';
import { screen, color } from '../utils';

export default VerticalSeparator = ({height = 20}) => (
    <View style={{width: screen.onePixel, height, backgroundColor: color.border}} />
)