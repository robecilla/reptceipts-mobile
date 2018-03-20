import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import { Text, Title, Button, Caption, Row, Icon, ListView, Divider, Subtitle, View as RowView } from '@shoutem/ui';
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

class SoloReceipt extends Component {

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const id = params ? params.id : null;
    this.props.receiptActions.getReceiptDetail(id);
  }

  renderItem(item) {
    return (
    <Row>
        <Icon name="right-arrow" />
        <RowView styleName="vertical stretch space-between">
          <Subtitle>{item.name}</Subtitle>
          <Caption>ID: {item.serial_no}</Caption>
        </RowView>
        <View style={styles.price}>
          <Subtitle>{item.price}</Subtitle>
          <Caption>x {item.quantity}</Caption>
        </View>
    </Row>
    );
  }

  render() {

    if (!this.props.receiptDetail) {
        return (
        <View style={styles.view}>
            <Loader loading={true} />
        </View>
        )
    }

    const retailer = this.props.receiptDetail.retailer;
    const receipt = this.props.receiptDetail.receipt;
    const items = JSON.parse(this.props.receiptDetail.receipt.items);

    return (
      <View styleName="md-gutter">
        <View style={styles.view}>
            <Title styleName="md-gutter-top">{retailer.name}</Title>
            <Text>{retailer.address1}, {retailer.address2}</Text>
            <Text>{retailer.address3} - {retailer.postcode}</Text>
            <Text>{retailer.phone_number} - {retailer.mobile_number}</Text>
            <Text>{retailer.email}</Text>
            <Divider />
            <Text>When: {receipt.created_at}</Text>
            <Text>Payment: {receipt.payment_method}</Text>
        </View>
        <Divider />
        <ListView
          data={items}
          renderRow={this.renderItem}
        />
        <Divider />
          <View style={styles.totals}>
            <Subtitle>Total: {receipt.total}</Subtitle>
          </View>
          <View style={styles.totals}>
            <Subtitle>VAT({receipt.VAT_value}%): {receipt.VAT}</Subtitle>
          </View>
          <View style={styles.totals}>
            <Title>Subtotal: {receipt.subtotal}</Title>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
  },
  price: {
    alignSelf: 'flex-end',
  },
  totals: {
    alignSelf: 'flex-end',
    right: 15,
  }
});

function mapStateToProps(state) {
  return {
    loading: state.ui.loading,
    receiptDetail: state.receipt.receiptDetail
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiptActions: bindActionCreators(receiptActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    UIActions: bindActionCreators(UIActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SoloReceipt);