import React, { Component } from 'react';
import { StyleSheet, View, Switch, ScrollView } from 'react-native';
import { View as RowView, Text, Button, Subtitle, Divider, Title, Row, Icon, Caption } from '@shoutem/ui';
import ProfileSettings from './ProfileSettings';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../../Actions/Auth';
import * as userActions from '../../Actions/User';

class Profile extends Component {

    componentDidMount() {
      if (typeof this.props.user === 'undefined') {
        this.props.userActions.getUser();
      }
    }

    onSubmit = () => {
      this.props.authActions.signoutUser();
    }

    render() {
      return (
        <ScrollView style={styles.view} >
          <ProfileSettings />
          <Divider />
          <Title>App Settings</Title>
          <Divider />
          <RowView>
            <Row styleName="small">
                <Text>Default scan method</Text>
                <Text styleName="collapsible">NFC</Text>
                <Switch
                  
                />
                <Text styleName="collapsible">QR</Text>
            </Row>
          </RowView>
          <Divider />
          <Button 
            styleName="secondary"
            onPress={() => this.onSubmit()} >
            <Text>SIGN OUT</Text>
          </Button>
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  view: {
      flex: 1,
      margin: 10
  },
  errorContainer: {
      alignItems: 'center',
      marginTop: 50,
  }
});

function mapStateToProps(state) {
  return {
    user: state.user.user,
    switch: state.ui.scanMethod
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    authActions: bindActionCreators(authActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
