import React from 'react';
import {white} from 'material-ui/styles/colors';
import Search from 'material-ui/svg-icons/action/search';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

const baseUrl = 'https://api-endpoint.igdb.com/games/?search';

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
    this.state = {dataSource: [],
                };
  }

  searchGameByName(value){
    axios.get(`${baseUrl}=${value}&fields=id,name,cover`, {
      headers: {
        "user-key": "510724fce12ac8a9d0d97787c5b2e6e5",
        Accept: "application/json"
      }
    })
    .then(response => {
      //const dataSourceArr = this.getDataSource(response.data);
      // this.setState({
      //   dataSource: [
      //     {
      //       text: 'oi',
      //       value: (
      //         <MenuItem primaryText="text-value1">
      //           <img style={styles.img} src="https://unsplash.it/40/40"/>
      //         </MenuItem>
      //       ),
      //     },
      //     {
      //       text: 'text-value2',
      //       value: (
      //         <MenuItem
      //           primaryText="text-value2"
      //           secondaryText="&#9786;"
      //         />
      //       ),
      //     },  
      //   ]
      // });
      const dataSourceArr = this.getDataSource(response.data);
      this.setState({
        dataSource: dataSourceArr
      });
    })
    .catch(e => {
      console.log("error", e);
    });
  }

  getDataSource(data){
    let arr = [];
    data.forEach(e => {
      //const url = e.cover.url;
      let cover = {...e.cover};
      let obj = {
        text: e.name,
        value:(
          <MenuItem primaryText={e.name}>
            <img style={styles.img} src={`https:${cover.url}`}/>
            {/* <img style={styles.img} src=""/> */}
          </MenuItem>
        )
      };
      arr.push(obj);
    });
    return arr;
  }

  handleUpdateInput(value){
    this.searchGameByName(value);
  }

  render(){
    return (
      <div>
        <Search style={styles.SearchIcon} color={white} />
        <AutoComplete style={styles.AutoComplete}
          hintText="Search Game"
          fullWidth={true}
          dataSource={this.state.dataSource}
          onUpdateInput={value => this.handleUpdateInput(value)}
        />
      </div>
    );
  }  
}
export default SearchBox;
