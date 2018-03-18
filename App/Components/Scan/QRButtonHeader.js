import React, { Component } from 'react';
import { View } from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome';
import { Button } from '@shoutem/ui';

export default class QRButtonHeader extends Component {
    render() {
        return (
        <Button
            onPress={() => this.props.navigation.navigate('QRScan')} >
            <Icons name={'qrcode'} size={25} style={{ marginRight: 20 }} />
        </Button>
        );
    }
}