import React ,{Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {grey500, grey400} from 'material-ui/styles/colors';
import {Card, CardActions,CardHeader,  CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';

import axios from 'axios';

const baseUrlUsers = 'https://pablomont-controle-de-jogos-b.herokuapp.com/users';
const baseUrlGames = 'https://pablomont-controle-de-jogos-b.herokuapp.com/gameIds';
const baseUrlGameApi = 'https://api-endpoint.igdb.com/games';
const baseUrlImageApi = 'https://images.igdb.com/igdb/image/upload/t';

const styles = {
  snackStyle:{
    backgroundColor: grey500,
  },

  cardStyle: {
    display: 'block',
    width: '70vw',
    transitionDuration: '0.3s',
  },
  img:{
    marginTop: 25
  },
  toggleDiv: {
    maxWidth: 300,
    marginTop: 40,
    marginBottom: 5
  },
  toggleLabel: {
    color: grey400,
    fontWeight: 100
  },
  buttons: {
    marginTop: 30,
    float: 'right'
  },
  saveButton: {
    marginLeft: 5
  }
};

export default class GamePage extends Component{

  constructor(props){
    super(props);
    this.state = {game: {},
                  open: false,
                  cloudinary_id: 0,
                  release_date_human: '',
                  userLogged: {}
                };
  }
 
  componentDidMount(){

    axios.get(`${baseUrlUsers}`).then(resp => {
      const userLogged = resp.data.find(u => u.isLogged === true);
      this.setState({userLogged});
    },
    axios.get(`${baseUrlGames}/1`).then(resp => {
      axios.get(`${baseUrlGameApi}/${resp.data.gameIdApi}?fields=*`,{
        headers: {
          "user-key": "510724fce12ac8a9d0d97787c5b2e6e5",
          Accept: "application/json"
        }
      })
      .then(response => {
        console.log(response.data[0]);
        this.setState({
          game: response.data[0],
          cloudinary_id: response.data[0].cover.cloudinary_id,
          release_date_human: response.data[0].release_dates[0].human
        });
      });
    }));
  }
  
  handleClick(){

    let user = this.state.userLogged;
    user.games.push({
      gameIdApi: this.state.game.id,
      name: this.state.game.name,
      estado: 'Não iniciado'
    });
    axios.put(`${baseUrlUsers}/${user.id}`, user).then(() => {
      this.setState({openDialog: true});
    });
    this.setState({
      open: true,
    });
  }
 
  handleRequestClose(){
    this.setState({
      open: false,
    });
  }

  render(){
    return (
      <div>
        <Card style={styles.cardStyle}>
          <CardHeader
            title="Data de lançamento:"
            subtitle={this.state.release_date_human}
          />
          <CardMedia
            overlay={<CardTitle title={this.state.game.name}/>}>
            <img style={styles.img} src={`${baseUrlImageApi}_screenshot_big/${this.state.cloudinary_id}.jpg`}/>
          </CardMedia>
          <CardText>
            {this.state.game.summary}
          </CardText>
          <CardActions>
            <FlatButton onClick={() => this.handleClick()} label="Adicionar a coleção" />
          </CardActions>
        </Card>
        <Snackbar bodyStyle={styles.snackStyle}
          open={this.state.open}
          message="Jogo adicionado na sua coleção"
          autoHideDuration={4000}
          onRequestClose={() => this.handleRequestClose()}/>
      </div> 
    );
  }
}

