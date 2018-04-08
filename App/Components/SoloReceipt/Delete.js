import React, { Component } from 'react';
import { Alert , TouchableOpacity} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as receiptActions from '../../Actions/Receipt';

class Delete extends Component {

    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteError = this.deleteError.bind(this);
    }

    handleDelete() {
        Alert.alert(
            'Delete receipt',
            'Are you sure you want to delete this receipt?',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Delete', onPress: () => this.props.receiptActions.deleteReceipt(this.props.receipt_id, this.props.navigate)}
            ],
            { cancelable: false }
        )
    }

    deleteError() {
        this.props.deleteError ? 
            Alert.alert(
                'Sorry!',
                'An error occurred trying to delete this receipt, please try again later!',
                [
                    {text: 'OK', onPress: () => this.props.dispatch({type: 'DELETE_ERROR' ,response: false})}
                ],
                { cancelable: false }
            )
        : false ;
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handleDelete}>
                {this.deleteError()}
                <Icons 
                    name={'delete'} 
                    size={25} 
                    style={{ marginRight: 20, color: 'white' }} />
            </TouchableOpacity>
        );
    }
}

function mapStateToProps(state) {
    return {
        deleteError: state.receipt.deleteError
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch : dispatch,
        receiptActions: bindActionCreators(receiptActions, dispatch)
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Delete);