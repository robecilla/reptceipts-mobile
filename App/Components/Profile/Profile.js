import React, { Component } from "react";
import { StyleSheet, View, Switch, ScrollView, Alert } from "react-native";
import {
  View as RowView,
  Text,
  Button,
  Subtitle,
  Divider,
  Title,
  Row,
  Icon,
  Caption
} from "@shoutem/ui";

import Loader from "../Helpers/Loader";

import sStorage from "../../Actions/Storage";
import Icons from "react-native-vector-icons/Feather";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as authActions from "../../Actions/Auth";
import * as userActions from "../../Actions/User";

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

class Profile extends Component {
  constructor() {
    super();
    this.signoutUser = this.signoutUser.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteError = this.deleteError.bind(this);
    this.onSwitchChange = this.onSwitchChange.bind(this);
  }

  componentDidMount() {
    this.props.userActions.getUser();
  }

  signoutUser() {
    this.props.authActions.signoutUser();
  }

  handleDelete() {
    Alert.alert(
      "Delete account",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () =>
            this.props.userActions.deleteAccount(this.props.user.id)
        }
      ],
      { cancelable: false }
    );
  }

  deleteError() {
    this.props.deleteAccError
      ? Alert.alert(
          "Sorry!",
          "An error occurred trying to delete your account, please try again later!",
          [
            {
              text: "OK",
              onPress: () =>
                this.props.dispatch({
                  type: "DELETE_ACC_ERROR",
                  payload: false
                })
            }
          ],
          { cancelable: false }
        )
      : false;
  }

  onSwitchChange = value => {
    let values = {};
    /* */
    values.scan_type = value ? 1 : 2;
    values.id = this.props.user.id;

    this.props.userActions.updateUser(values, this.props.navigation);
  };

  render() {
    if (typeof this.props.user === "undefined") {
      return false;
    }

    return (
      <ScrollView style={styles.view}>
        <Loader loading={this.props.loading ? this.props.loading : false} />
        {this.deleteError()}
        <Row styleName="small">
          <Icons name={"user"} size={25} style={{ marginRight: 15 }} />
          <RowView styleName="vertical">
            <Subtitle>Username</Subtitle>
            <Text>{this.props.user.username}</Text>
          </RowView>
        </Row>

        <Row styleName="small">
          <Icons name={"mail"} size={25} style={{ marginRight: 15 }} />
          <RowView styleName="vertical">
            <Subtitle>Email</Subtitle>
            <Text>{this.props.user.email}</Text>
          </RowView>
        </Row>

        <Divider />

        <RowView>
          <Row styleName="small">
            <Text>Default scan method</Text>
            <Text styleName="collapsible">NFC</Text>
            <Switch
              onValueChange={value => this.onSwitchChange(value)}
              value={this.props.user.scan_type === 1 ? true : false}
            />
            <Text styleName="collapsible">QR</Text>
          </Row>
        </RowView>
        <Divider />
        <Button styleName="secondary" onPress={this.signoutUser}>
          <Text>SIGN OUT</Text>
        </Button>
        <Divider />
        <Button styleName="danger" onPress={this.handleDelete}>
          <Text>DELETE ACCOUNT</Text>
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    margin: 10
  }
});

function mapStateToProps(state) {
  return {
    loading: state.ui.loading,
    user: state.user.user,
    deleteAccError: state.user.deleteAccError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
