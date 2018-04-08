import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome';

export default class QRButtonHeader extends Component {
    render() {
        return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('QRScan')} >
            <Icons name={'qrcode'} size={25} style={{ marginRight: 20, color: 'whitesmoke' }} />
        </TouchableOpacity>
        );
    }
}