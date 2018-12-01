import React from 'react';
import {white} from 'material-ui/styles/colors';
import Search from 'material-ui/svg-icons/action/search';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

//Adicionar o prefixo --> 'https://cors-anywhere.herokuapp.com/'
const baseUrl = 'https://api-endpoint.igdb.com/games/?search';
const baseUrlImage = 'https://images.igdb.com/igdb/image/upload/t';

const styles = {
  SearchIcon: {
    float: 'left',
    paddingTop: 17
  },
  span:{
    float: 'flex'
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
    this.state = {
      dataSource: [],
    };
  }

  getDataSource(data){
    let arr = [];
    data.forEach(e => {
      if(e.cover != undefined){
        let obj = {
          text: e.name,
          value:(
            <MenuItem primaryText={<span style={styles.span}>{e.name}</span>}>
              <img style={styles.img} src={`${baseUrlImage}_micro/${e.cover.cloudinary_id}.jpg`}/>
            </MenuItem>
          )
        };
        arr.push(obj);
      }
    });
    return arr;
  }

  handleUpdateInput(value){
  
    if (value.length) {
      axios.get(`${baseUrl}=${value}&fields=id,name,cover`, {
        headers: {
          "user-key": "510724fce12ac8a9d0d97787c5b2e6e5",
          Accept: "application/json"
        }
      })
        .then((res) => this.handleSuccess(res.data),
              (err) => this.handleFailure(err));
    } else {
      this.setState({
        dataSource: []
      });
    }

  }
  
  handleSuccess (response) {
    const arr = this.getDataSource(response);
    this.setState({dataSource: arr});
  }
  handleFailure (err) {
    console.log(err);
  }

  render(){
    return (
      <div>
        <Search style={styles.SearchIcon} color={white} />
        <AutoComplete style={styles.AutoComplete}
          hintText="Search Game"
          filter={() => true} 
          fullWidth={true}
          dataSource={this.state.dataSource}
          onUpdateInput={value => this.handleUpdateInput(value)}
        />
      </div>
    );
  }  
}
export default SearchBox;
