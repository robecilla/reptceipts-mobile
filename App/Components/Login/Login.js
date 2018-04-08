import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { Heading, Button, Text, Divider, Subtitle } from '@shoutem/ui';
import Loader from '../Helpers/Loader';
import TField from '../Helpers/Field';

import * as authActions from '../../Actions/Auth';

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Please enter an email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!values.password) {
        errors.password = 'Please enter your password';
    }

    return errors;
};

class Login extends Component {

    onSubmit = (values) => {
        this.props.authActions.signinUser(values);
    }

    loginError() {
        this.props.loginError ? 
            Alert.alert(
                'Sorry!',
                /* Error message coming from API */
                this.props.loginError,
                [
                    {text: 'OK', onPress: () => this.props.dispatch({type: 'LOGIN_ERROR' , payload: false })}
                ],
                { cancelable: false }
            )
        : false ;
      }

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <View style={styles.view}>
                <View style={styles.fieldsView}>

                    <Loader loading={this.props.loading ? this.props.loading : false} />
                    { this.loginError() }

                    <Heading styleName="h-center">Welcome back,</Heading>
                    <Subtitle styleName="h-center">log in to continue</Subtitle>

                    <Divider />

                    <Field
                        name="email"
                        component={TField}
                        placeholder={'Email Address'}
                        keyboardType="email-address"
                    />

                    <Field
                        name="password"
                        component={TField}
                        placeholder={'Password'}
                        secureTextEntry={true}
                    />

                    <Button
                        styleName="secondary xl-gutter-top"
                        onPress={handleSubmit(props => this.onSubmit(props))} >
                        <Text>LOG IN</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    fieldsView: {
        marginTop: 25,
        margin: 10
    }
});

function mapStateToProps(state) {
    return {
        loading: state.ui.loading,
        loginError: state.auth.loginError
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
}

const LoginForm = reduxForm({
    form: 'login',
    validate
})(Login);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);