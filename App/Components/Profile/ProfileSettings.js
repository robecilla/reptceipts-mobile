import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { Heading, Button, Text, Divider, Subtitle } from '@shoutem/ui';
import Loader from '../Helpers/Loader';
import TField from '../Helpers/Field';
import Icons from 'react-native-vector-icons/SimpleLineIcons';

import * as authActions from '../../Actions/Auth';
import { SHOW_LOADER } from '../../Actions/UI';

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length > 15) {
        errors.password = 'Must be 15 characters or less';
    }

    return errors;
};

class ProfileSettings extends Component {

    onSubmit = (values) => {

        this.props.dispatch({
            type: SHOW_LOADER
        });

        this.props.authActions.signinUser(values);
    }

    componentWillUnmount() {
        if (this.props.errorMessage) {
            this.props.authActions.authError(null);
        }
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <View style={styles.errorContainer}>
                    <Icons name={'close'} size={25} />
                    <Text>{this.props.errorMessage}</Text>
                </View>
            );
        }
    }

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <View>
                <Field
                    name="username"
                    component={TField}
                    placeholder={'Update user name'}
                />

                <Field
                    name="email"
                    component={TField}
                    placeholder={'Update email'}
                />

                <Field
                    name="password"
                    component={TField}
                    placeholder={'Password'}
                    secureTextEntry={true}
                />
                <Button 
                    styleName="secondary"
                    onPress={() => console.log('Update Details')} >
                    <Text>UPDATE DETAILS</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    fieldsView: {
        marginTop: 50,
        margin: 10
    },
    errorContainer: {
        alignItems: 'center',
        marginTop: 50,
    }
});

function mapStateToProps(state) {
    return {
        loading: state.ui.loading,
        errorMessage: state.auth.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
}

const ProfileSettingsForm = reduxForm({
    form: 'login',
    validate
})(ProfileSettings);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettingsForm);