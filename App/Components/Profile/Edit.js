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
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
    } else if (values.password.length > 15) {
        errors.password = 'Must be 15 characters or less';
    }

    return errors;
};

class Edit extends Component {

    onSubmit = (values) => {
        this.props.authActions.signinUser(values);
    }

    render() {
        const { handleSubmit, submitting, user } = this.props;
        return (
            <View style={styles.fieldsView}>
                <Field
                    name="username"
                    component={TField}
                    placeholder={'Update user name'}
                    value={user.username}
                />

                <Field
                    name="email"
                    component={TField}
                    placeholder={'Update email'}
                    keyboardType="email-address"
                    value={user.email}
                />

                <Field
                    name="password"
                    component={TField}
                    placeholder={'Update Password'}
                    secureTextEntry={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    fieldsView: {
        margin: 10
    }
});

function mapStateToProps(state) {
    return {
        loading: state.ui.loading,
        errorMessage: state.auth.error,
        user: state.user.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
}

const EditForm = reduxForm({
    form: 'edit',
    validate
})(Edit);

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);