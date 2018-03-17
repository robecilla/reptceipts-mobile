import React, { Component } from 'react';
import { View } from 'react-native'
import Icons from 'react-native-vector-icons/SimpleLineIcons';

import { DropDownMenu } from '@shoutem/ui';

export default class Fav extends Component {
    render() {
        return (
            <Icons name={'star'} size={25} style={{ marginRight: 20 }} />
        );
    }
}