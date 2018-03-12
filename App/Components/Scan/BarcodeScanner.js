import React, {Component} from 'react';
import { View, Text, Button } from '@shoutem/ui';

import { connect } from 'react-redux';
import * as actions from '../../Actions/Auth';

class BarcodeScanner extends Component {

    render () {
        return (
            <View>
                <Text>Barcode Scanner</Text>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
      
    };
  }


export default connect(mapStateToProps, actions)(BarcodeScanner);
