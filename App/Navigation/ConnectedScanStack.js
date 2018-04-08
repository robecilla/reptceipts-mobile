import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigationFocus } from '@patwoz/react-navigation-is-focused-hoc';
import * as userActions from '../Actions/User';

import styles from '../styles';

import QRScan from '../Components/Scan/QRScan';
import NFCScan from '../Components/Scan/NFCScan';

import QRButtonHeader from '../Components/Scan/QRButtonHeader';
import NFCButtonHeader from '../Components/Scan/NFCButtonHeader';

export const ScanStack = (initialRouteName) => {
    const Scan = StackNavigator({
        QRScan: {
            screen: QRScan,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'QR',
                    headerRight: <NFCButtonHeader navigation={navigation} />,
                    headerStyle: {
                        backgroundColor: styles.headerColor
                    },
                    headerTintColor: '#fff'
                }
            },
        },
        NFCScan: {
            screen: NFCScan,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'NFC',
                    headerRight: <QRButtonHeader navigation={navigation} />,
                    headerStyle: {
                        backgroundColor: styles.headerColor
                    },
                    headerTintColor: '#fff'
                }
            },
        },
    },
    {
        ...initialRouteName
    });

    return <Scan />;
};

class ConnectedScanStack extends React.Component {


    componentWillMount() {
        this.props.userActions.getUser();
    }
  
    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            this.props.userActions.getUser();
        }
    }

    render() {
        console.log(this.props.user)
        if (typeof this.props.user === 'undefined') {
            return false;
        } 
    
        console.log(this.props.user.scan_type);
        let initialRoute = this.props.user.scan_type === 1 ? 'QRScan' : 'NFCScan';
        console.log(initialRoute);

        return (
            <ScanStack initialRouteName={initialRoute}  />
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
      userActions: bindActionCreators(userActions, dispatch)
    };
}
  
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(ConnectedScanStack));