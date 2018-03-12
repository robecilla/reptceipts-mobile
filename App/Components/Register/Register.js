import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { View, Heading, Tile, Title, Overlay, Button, Text, Divider, Subtitle } from '@shoutem/ui';
import Loader from '../Helpers/Loader';

import { connect } from 'react-redux';
import * as actions from '../../Actions/Auth';

import TField from '../Helpers/Field';
import { SHOW_LOADER } from '../../Actions/UI';

const validate = values => {
    const errors = {};
  
    if (!values.username) {
      errors.username = 'Please choose an username';
    } else if (values.username.length > 15) {
      errors.username = 'Must be 15 characters or less';
    }
    if (!values.email) {
      errors.email = 'We need your e-mail!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!values.password) {
      errors.password = 'Please create a password';
    } else if (values.password.length > 15) {
      errors.password = 'Must be 15 characters or less';
    }
  
    return errors;
  };

class Register extends Component {

    onSubmit = (values) => {

      this.props.dispatch({
        type: SHOW_LOADER
      });

      this.props.registerUser(values);
    }

    render() {
      const { handleSubmit, submitting } = this.props;
      return (
        <View styleName="md-gutter">
            <Loader
              loading={this.props.loading ? this.props.loading : false} />
            <Heading styleName="h-center md-gutter">Welcome,</Heading>
            <Subtitle styleName="h-center">register to continue</Subtitle>

            <Divider/>

                <Field
                    name="username"
                    component={TField}
                    placeholder={'Your Name'}
                />

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
                    <Text>REGISTER</Text>
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

const RegisterForm = reduxForm({
    form: 'register',
    validate
})(Register);


export default connect(mapStateToProps, actions)(RegisterForm);
