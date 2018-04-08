import React, { Component } from 'react';
import {
  Text as RNText,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Linking
} from 'react-native';

import { Text, Title, Button, Caption, Row, Icon, ListView, Divider, Subtitle, View as RowView } from '@shoutem/ui';
import Moment from 'react-moment';

import Loader from '../Helpers/Loader';

import color from '../../styles';

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
    <Row style={{backgroundColor: '#e9e9ef'}}>
        <Icon><Text>{item.quantity} x</Text></Icon>
        <RowView styleName="vertical stretch space-between">
          <Subtitle>{item.name}</Subtitle>
          <Caption>ID: {item.serial_no}</Caption>
        </RowView>
        <View style={styles.price}>
          <Subtitle>{item.price}</Subtitle>
        </View>
    </Row>
    );
  }

  render() {

    if (!this.props.receiptDetail) {
        return false;
    }

    const retailer = this.props.receiptDetail.retailer;
    const receipt = this.props.receiptDetail.receipt;
    const items = JSON.parse(this.props.receiptDetail.receipt.items);

    return (
      <ScrollView styleName="md-gutter">
        <Loader
          loading={this.props.loading ? this.props.loading : false} />
        <View style={styles.view}>
            <Title styleName="md-gutter-top">{retailer.name.toUpperCase()}</Title>
            <Text>{retailer.address1}, {retailer.address2}</Text>
            <Text>{retailer.address3} - {retailer.postcode}</Text>
            <Text>{retailer.phone_number} - {retailer.mobile_number}</Text>
            <TouchableOpacity><RNText style={styles.email} onPress={() => Linking.openURL(`mailto:${retailer.email}`) }>{retailer.email}</RNText></TouchableOpacity>
            <Divider />
            <Moment element={Text} format="DD MMMM YYYY">{receipt.created_at}</Moment>
        </View>
        <Divider />
        <View style={styles.view}>
          <Subtitle>ITEMS & PAYMENT</Subtitle>
        </View>
        <ListView
          data={items}
          renderRow={this.renderItem}
        />
        <Divider />
        <View style={styles.totals}>
          <Text>Total: {receipt.total}</Text>
        </View>
        <View style={styles.totals}>
          <Text>VAT({receipt.VAT_value}%): {receipt.VAT}</Text>
        </View>
        <View style={styles.totals}>
          <Title>Subtotal: {receipt.subtotal}</Title>
          <Caption>Paid with {receipt.payment_method}</Caption>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
  },
  price: {
    alignSelf: 'flex-end',
    right: 10
  },
  totals: {
    alignSelf: 'flex-end',
    right: 15,
    bottom: 10
  },
  email: {
    color: color.headerColor,
    textDecorationLine: 'underline'
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