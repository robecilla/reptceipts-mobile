import React, { Component } from 'react';
// import { TextInput } from 'react-native';
import { View, TextInput, Text } from '@shoutem/ui';


const TextField = ({ input, placeholder, secureTextEntry, style,  meta: { touched, error }, ...custom }) => (
    <View styleName="md-gutter-bottom rounded-corners">
        <TextInput
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            {...input}
        />
        {touched && (error && <Text styleName="md-gutter-left" style={{ color : 'red'}}>{error}</Text>)}
    </View>
);

export default TextField;