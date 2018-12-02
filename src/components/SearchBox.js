import React from 'react';
import {browserHistory} from 'react-router';
import {white} from 'material-ui/styles/colors';
import Search from 'material-ui/svg-icons/action/search';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

//Adicionar o prefixo --> 'https://cors-anywhere.herokuapp.com/'
const baseUrlGameApi = 'https://api-endpoint.igdb.com/games/?search';
const baseUrlImageApi = 'https://images.igdb.com/igdb/image/upload/t';
const baseUrl = 'https://pablomont-controle-de-jogos-b.herokuapp.com/gameIds';


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

  componentDidMount(){
    axios.get(baseUrl).then(resp => {
      this.setState({actualGameId: resp.data[0].idApi});
    });
  }
  handleUpdateInput(value){
  
    if (value.length) {
      axios.get(`${baseUrlGameApi}=${value}&fields=id,name,cover`, {
        headers: {
          "user-key": "510724fce12ac8a9d0d97787c5b2e6e5",
          Accept: "application/json"
        }
      })
        .then((res) => this.handleSuccess(res.data));
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

  getDataSource(data){
    let arr = [];
    data.forEach(g => {
      if(g.cover != undefined){
        let obj = {
          text: g.name,
          value:(
            <MenuItem primaryText={<span style={styles.span}>{g.name}</span>} onClick={() => this.changeIdApiGameSelect(g.id)}>
              <img style={styles.img} src={`${baseUrlImageApi}_micro/${g.cover.cloudinary_id}.jpg`}/>
            </MenuItem>
          )
        };
        arr.push(obj);
      }
    });
    return arr;
  }

  changeIdApiGameSelect(id){
    const game = {
      gameIdApi: id
    };
    axios.put(`${baseUrl}/1`, game).then(() => {
      this.setState({openDialog: true});
    });

    this.goToGamePage();
  }

  goToGamePage(){
    setTimeout(() => {
      window.location.reload();
    },500);
    browserHistory.push('/jogo');
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
