import React, { Component } from "react";
import {
  Text as RNText,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Linking,
  Modal,
  Image
} from "react-native";
import {
  Text,
  Title,
  Button,
  Caption,
  Row,
  Icon,
  ListView,
  Divider,
  Subtitle,
  View as RowView
} from "@shoutem/ui";

import IconsQ from "react-native-vector-icons/FontAwesome";
import IconsN from "react-native-vector-icons/MaterialCommunityIcons";
import Moment from "react-moment";
import Loader from "../Helpers/Loader";
import color from "../../styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as receiptActions from "../../Actions/Receipt";
import * as userActions from "../../Actions/User";
import * as UIActions from "../../Actions/UI";

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

class SoloReceipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
    this.props.receiptDetail = null;
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const id = params ? params.id : null;
    this.props.receiptActions.getReceiptDetail(id);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  getBarcode() {
    let barcode = "Test, but should include some JSON";
    return `https://chart.googleapis.com/chart?cht=qr&chl=${JSON.stringify(
      barcode,
      null,
      0
    )}&chs=300x300&chld=L|0"`;
  }

  renderItem(item) {
    return (
      <Row style={{ backgroundColor: "#e9e9ef" }}>
        <Icon>
          <Text>{item.quantity} x</Text>
        </Icon>
        <RowView styleName="vertical stretch space-between">
          <Subtitle>{item.name}</Subtitle>
          <Caption>ID: {item.serial_no}</Caption>
        </RowView>
        <View style={styles.price}>
          <Subtitle>&#163;{item.price}</Subtitle>
        </View>
      </Row>
    );
  }

  render() {
    if (!this.props.receiptDetail) {
      return <Loader loading={true} />;
    }

    const retailer = this.props.receiptDetail.retailer;
    const receipt = this.props.receiptDetail.receipt;
    const items = JSON.parse(this.props.receiptDetail.receipt.items);

    return this.props.loading ? (
      <Loader loading={this.props.loading} />
    ) : (
      <ScrollView styleName="md-gutter">
        <View style={styles.view}>
          <Title styleName="md-gutter-top">{retailer.name.toUpperCase()}</Title>
          <Text>
            {retailer.address1}, {retailer.address2}
          </Text>
          <Text>
            {retailer.address3} - {retailer.postcode}
          </Text>
          <Text>
            {retailer.phone_number} - {retailer.mobile_number}
          </Text>
          <TouchableOpacity>
            <RNText
              style={styles.email}
              onPress={() => Linking.openURL(`mailto:${retailer.email}`)}
            >
              {retailer.email}
            </RNText>
          </TouchableOpacity>
          <Divider />
          <Moment element={Text} format="DD MMMM YYYY" style={{ bottom: 10 }}>
            {receipt.created_at}
          </Moment>
          <Text>
            Scanned via&nbsp;
            {receipt.scan_type === 1 ? "QR Code" : "NFC"}
          </Text>
        </View>
        <Divider />
        <View style={styles.view}>
          <Subtitle styleName="sm-gutter-bottom">ITEMS & PAYMENT</Subtitle>
        </View>
        <ListView data={items} renderRow={this.renderItem} />
        <Row style={{ backgroundColor: "#e9e9ef" }}>
          <View>
            <View style={styles.totals}>
              <Text>Total: &#163;{receipt.total}</Text>
            </View>

            <View style={styles.totals}>
              <Text>
                VAT({receipt.VAT_value}%): &#163;{receipt.VAT}
              </Text>
            </View>

            <View style={styles.totals}>
              <Title>Subtotal: &#163;{receipt.subtotal}</Title>
              <Caption>Paid with {receipt.payment_method}</Caption>
            </View>
          </View>
        </Row>
        {receipt.is_redeemable ? (
          <View>
            <Button
              styleName="secondary md-gutter"
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Text>REDEEM</Text>
            </Button>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {}}
            >
              <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                  <Title styleName="md-gutter-top">Redeem receipt</Title>
                  <Text>Scan barcode to redeem</Text>
                  <Image
                    style={{ width: 300, height: 300 }}
                    source={{
                      uri: this.getBarcode()
                    }}
                  />
                  <Button
                    styleName="secondary md-gutter"
                    onPress={() => {
                      this.setModalVisible(false);
                    }}
                  >
                    <Text>DONE</Text>
                  </Button>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          false
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center"
  },
  price: {
    alignSelf: "flex-end",
    right: 20,
    top: 10
  },
  email: {
    color: color.headerColor,
    textDecorationLine: "underline"
  },
  bottom: {
    flex: 1,
    flexDirection: "row"
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000090"
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 450,
    width: 325,
    borderRadius: 10,
    display: "flex",
    alignItems: "center"
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
