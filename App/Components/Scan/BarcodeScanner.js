import React, {Component} from 'react';
import { StyleSheet, Alert } from 'react-native';
import { View, Text, Button } from '@shoutem/ui';
import Camera from 'react-native-camera';

import { connect } from 'react-redux';
import * as actions from '../../Actions/Auth';

class BarcodeScanner extends Component {

    onBarCodeRead = (e) => {
        Alert.alert(JSON.stringify(e));
    }

    render () {
        return (
        <Camera
            ref={(cam) => {
                this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
        </Camera>
        )
    }
}

const styles = StyleSheet.create({
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  });

export default BarcodeScanner;

// function mapStateToProps(state) {
//     return {
      
//     };
//   }


// export default connect(mapStateToProps, actions)(BarcodeScanner);
