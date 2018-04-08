import React, { Component } from 'react';
import { View, TextInput, Caption } from '@shoutem/ui';
import { TextField } from 'react-native-material-textfield';
import styles from './styles';

export default class Input extends React.Component {
    render() {
    let { input, title, placeholder, value, keyboardType, characterRestriction, secureTextEntry, meta: { touched, error }, ...custom } = this.props;
    return (
        <View styleName="sm-gutter">
            <TextField
                label={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                error={error && touched ? error : ''}
                errorColor='#ff3860'
                tintColor={styles.headerColor}
                characterRestriction={characterRestriction}
                title={title}
                //value={'kepasa'}
                {...input}
            />
        </View>
    );
    }
}