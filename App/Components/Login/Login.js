import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { View, TextInput, Heading, Tile, Title, Overlay, Button, Text, Divider, Subtitle } from '@shoutem/ui';

export default class Login extends Component {
    render() {
      return (
        <View styleName="md-gutter">

            <Heading styleName="h-center md-gutter">Welcome back,</Heading>
            <Subtitle styleName="h-center">log in to continue</Subtitle>

            <Divider/>

                <TextInput
                    placeholder={'Your Email'}
                />
                <TextInput
                    placeholder={'Your Password'}
                    secureTextEntry
                />

                <Button styleName="secondary">
                    <Text>LOG IN</Text>
                </Button>

        </View>
      );
    }
}

// export default reduxForm({
//     form: 'register'
// })(Register);
  