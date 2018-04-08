import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'; 
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../Actions/User';

class SaveEdit extends Component {

    constructor() {
        super();
        this.handleTouch = this.handleTouch.bind(this);
        this.updateError = this.updateError.bind(this);
    }

    handleTouch() {
        let { values } = this.props.form;
        values.id = this.props.user_id;
        this.props.userActions.updateUser(values, this.props.navigate);
    }
    
    updateError() {
        this.props.updateError ? 
            Alert.alert(
                'Sorry!',
                'An error occurred trying to update your details, please try again later!',
                [
                    {text: 'OK', onPress: () => this.props.dispatch({type: 'UPDATE_ERROR' , response: false})}
                ],
                { cancelable: false }
            )
        : false ;
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handleTouch}>
                {this.updateError()}
                <Icons name={'check'} size={25} style={{ marginRight: 20, color: 'whitesmoke' }} />
            </TouchableOpacity>
        );
    }
}

function mapStateToProps(state) {
    return {
        updateError: state.user.updateError,
        form: state.form.edit,
        user_id: state.user.user.id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SaveEdit);