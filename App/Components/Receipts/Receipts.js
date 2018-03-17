import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { Heading, Subtitle, Button, Text as ButtonText, Row, Icon, ListView, Caption, View } from '@shoutem/ui';
import Loader from '../Helpers/Loader';

import { SHOW_LOADER } from '../../Actions/UI';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as receiptActions from '../../Actions/Receipt';
import * as userActions from '../../Actions/User';
import * as UIActions from '../../Actions/UI';

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

class Receipts extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.props.userActions.getUserReceipts();
  }

  componentWillMount() {
    this.props.userActions.getUserReceipts();
  }

  onPressReceipt = (receipt) => { 
    this.props.navigation.navigate('SoloReceipt', { id: receipt.id, name: receipt.retailer_name });
  }

  renderRow(receipt) {
    return (
      <TouchableOpacity onPress={() => this.onPressReceipt(receipt)} >
        <Row>
          <View styleName="vertical stretch space-between">
            <Subtitle>{receipt.retailer_name}</Subtitle>
            <Caption>Subtotal: {receipt.subtotal}</Caption>
          </View>
          <Icon styleName="disclosure" name="right-arrow" />
        </Row>
      </TouchableOpacity>
    );
  }

  render() {
    const receipts = this.props.receipts;

    if (isEmpty(receipts)) {
      return (
        <View>
          <Heading styleName="md-gutter">No receipts found</Heading>
        </View>
      )
    }

    return (
      <View>
      <Loader
          loading={this.props.loading ? this.props.loading : false} />
        <ListView
          data={receipts}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});

function mapStateToProps(state) {
  return {
    loading: state.ui.loading,
    receipts: state.user.receipts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiptActions: bindActionCreators(receiptActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    UIActions: bindActionCreators(UIActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Receipts);