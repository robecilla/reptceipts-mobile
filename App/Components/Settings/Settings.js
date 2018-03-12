import React, { Component } from 'react';
import { View, Text, Button } from '@shoutem/ui';

import { connect } from 'react-redux';
import * as actions from '../../Actions/Auth';

class Settings extends Component {

    onSubmit = () => {
      this.props.signoutUser();
    }

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button 
            styleName="secondary"
            onPress={() => this.onSubmit()} >
            <Text>Sign Out</Text>
          </Button>
        </View>
      );
    }
}

function mapStateToProps(state) {
  return {
    
  };
}


export default connect(mapStateToProps, actions)(Settings);
