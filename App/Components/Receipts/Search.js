import React, { Component } from 'react';
import { View } from 'react-native'
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import { TOGGLE_SEARCH } from '../../Actions/UI';
import { connect } from 'react-redux';

import { DropDownMenu } from '@shoutem/ui';

class Search extends Component {
    render() {
        return (
            <Icons
                /* Toggle search bar display */
                onPress={() => this.props.dispatch({ type: TOGGLE_SEARCH, display : this.props.displaySearch ? !this.props.displaySearch : true })}
                name={'magnifier'} 
                size={25} 
                style={{ marginRight: 20 }} />
        );
    }
}

function mapStateToProps(state) {
    return {
      displaySearch: state.ui.displaySearch
    };
  }

function mapDispatchToProps(dispatch) {
    return {
      dispatch: dispatch
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Search);