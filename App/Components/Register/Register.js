import React, { Component } from 'react';
import { Alert } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { View, Heading, Tile, Title, Overlay, Button, Text, Divider, Subtitle } from '@shoutem/ui';

import TField from '../Helpers/Field';

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
        Alert.alert('', JSON.stringify(values));
    }

    render() {
      const { handleSubmit, submitting } = this.props;
      return (
        <View styleName="md-gutter">

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

export default reduxForm({
    form: 'register',
    validate
})(Register);
  