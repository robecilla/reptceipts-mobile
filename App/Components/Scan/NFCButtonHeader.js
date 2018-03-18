import React, { Component } from 'react';
import { View } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@shoutem/ui';

export default class QRButtonHeader extends Component {
    render() {
        return (
        <Button
            onPress={() => this.props.navigation.navigate('NFCScan')} >
            <Icons name={'nfc'} size={25} style={{ marginRight: 20 }} />
        </Button>
        );
    }
}