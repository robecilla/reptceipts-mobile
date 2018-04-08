import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome';
import { TOGGLE_SEARCH } from '../../Actions/UI';
import { connect } from 'react-redux';

class Search extends Component {
    render() {
        return (
          <TouchableOpacity 
            /* Toggle search bar display */
            onPress={() => this.props.dispatch({ type: TOGGLE_SEARCH, display : this.props.displaySearch ? !this.props.displaySearch : true })} >
            <Icons
                name={'search'} 
                size={25} 
                style={{ marginRight: 20, color: 'white' }} />
          </TouchableOpacity>
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