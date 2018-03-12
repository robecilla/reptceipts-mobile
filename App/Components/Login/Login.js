import React, { Component } from 'react';
import { Alert } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { View, TextInput, Heading, Tile, Title, Overlay, Button, Text, Divider, Subtitle } from '@shoutem/ui';
import Loader from '../Helpers/Loader';

import { connect } from 'react-redux';
import * as actions from '../../Actions/Auth';

import { SHOW_LOADER } from '../../Actions/UI';

import TField from '../Helpers/Field';

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

class Login extends Component {

    onSubmit = (values) => {

        this.props.dispatch({
            type: SHOW_LOADER
        });

        this.props.signinUser(values);
    }

    render() {
      const { handleSubmit, submitting } = this.props;
      return (
        <View styleName="md-gutter">
            <Loader
                loading={this.props.loading ? this.props.loading : false} />
            <Heading styleName="h-center md-gutter">Welcome back,</Heading>
            <Subtitle styleName="h-center">log in to continue</Subtitle>

            <Divider/>

                <Field
                    name="email"
                    component={TField}
                    placeholder={'Your Email'}
                />

                <Field
                name="password"
                    component={TField}
                    placeholder={'Your Password'}
                    secureTextEntry={true}
                />

                <Button 
                    styleName="secondary"
                    onPress={handleSubmit(props => this.onSubmit(props))} >
                    <Text>LOG IN</Text>
                </Button>

        </View>
      );
    }
}

function mapStateToProps(state) {
    return {
      loading: state.ui.loading
    };
}
  
const LoginForm = reduxForm({
    form: 'login',
    validate
})(Login);
  
export default connect(mapStateToProps, actions)(LoginForm);