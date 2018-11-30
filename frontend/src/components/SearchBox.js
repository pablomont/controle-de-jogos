import React from 'react';
import {white} from 'material-ui/styles/colors';
import Search from 'material-ui/svg-icons/action/search';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

const styles = {
  SearchIcon: {
    float: 'left',
    paddingTop: 17
  },
  img:{
    float: 'left',
    paddingRight: 10
  },
  AutoComplete: {
   paddingLeft: 10
  },
};

class SearchBox extends React.Component {

  constructor(props){
    super(props);
    this.state = {dataSource: []
                };
  }

  handleUpdateInput(){
    this.setState({
      dataSource: [
        {
          text: 'oi',
          value: (
            <MenuItem primaryText="text-value1">
              <img style={styles.img} src="https://unsplash.it/40/40"/>
            </MenuItem>
          ),
        },
        {
          text: 'text-value2',
          value: (
            <MenuItem
              primaryText="text-value2"
              secondaryText="&#9786;"
            />
          ),
        },  
      ]
    });
  }

  render(){
    return (
      <div>
        <Search style={styles.SearchIcon} color={white} />
        <AutoComplete style={styles.AutoComplete}
          hintText="Search Game"
          fullWidth={true}
          dataSource={this.state.dataSource}
          onUpdateInput={() => this.handleUpdateInput()}
        />
      </div>
    );
  }  
}
export default SearchBox;
