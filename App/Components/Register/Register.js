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
  
    if (!values.username) {
      errors.username = 'Please enter an username';
    } else if (values.username.length > 20) {
      errors.username = 'Max. 20 characters';
    }
    if (!values.email) {
      errors.email = 'Please enter an email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Please enter a valid email address';
    }
  
    if (!values.password) {
      errors.password = 'Please create a password';
    } else if (values.password.length < 8) {
      errors.password = 'Needs to be a minimun of eight characters';
    } else if (values.password.length > 15) {
      errors.password = 'Needs to be a maximum of fifteen characters';
    }
  
    return errors;
  };

class Register extends Component {

    onSubmit = (values) => {
      this.props.authActions.registerUser(values);
    }

    registerError() {
      this.props.registerError ? 
          Alert.alert(
              'Sorry!',
              //'An error occurred trying create your account, please try again later!',
              this.props.registerError,
              [
                  {text: 'OK', onPress: () => this.props.dispatch({type: 'REGISTER_ERROR' , payload: false })}
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

            { this.registerError() }

            <View>
              <Heading styleName="h-center">Welcome,</Heading>
              <Subtitle styleName="h-center">register to continue</Subtitle>
            </View>
            
            <Divider/>

            <Field
                name="username"
                component={TField}
                placeholder={'Username'}
                characterRestriction={20}
            />

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
                title={"Choose wisely"}
                characterRestriction={15}
            />
            <Button 
                styleName="secondary xl-gutter-top"
                onPress={handleSubmit(props => this.onSubmit(props))} >
                <Text>REGISTER</Text>
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
    registerError: state.auth.registerError
  };
}

function mapDispatchToProps(dispatch) {
  return {
      authActions: bindActionCreators(authActions, dispatch),
  };
}

const RegisterForm = reduxForm({
    form: 'register',
    validate
})(Register);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
