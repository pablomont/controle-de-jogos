import React ,{Component} from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import {grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import axios from 'axios';



const styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  editButton: {
    fill: grey500
  },
  columns: {
    id: {
      width: '10%'
    },
    name: {
      width: '40%'
    },
    price: {
      width: '20%'
    },
    category: {
      width: '20%'
    },
    edit: {
      width: '10%'
    }
  }
};

const baseUrlUsers = 'https://pablomont-controle-de-jogos-b.herokuapp.com/users';
const baseUrlGames = 'https://pablomont-controle-de-jogos-b.herokuapp.com/gameIds';

export default class TablePage extends Component{

  constructor(props){
    super(props);
    this.state = {games: []};
  }

  componentDidMount(){

    const game = {
      gameIdApi: 0
    };
    axios.put(`${baseUrlGames}/1`, game).then(() => {

    });

    axios.get(`${baseUrlUsers}`).then(resp => {
      const userLogged = resp.data.find(u => u.isLogged === true);
      this.setState({games: userLogged.games});
    });
  }

  handleClick(gameIdApi){
    const game = {
      gameIdApi
    };
    axios.put(`${baseUrlGames}/1`, game).then(() => {

    });
  }

  render(){
    return (
      <PageBase title="Minha coleção">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.category}>Estado</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.state.games.map(item =>
                <TableRow key={item.gameIdApi}>
                  <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
                  <TableRowColumn style={styles.columns.price}>{item.estado}</TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to="/edit_jogo">
                      <FloatingActionButton zDepth={0}
                                            mini={true}
                                            backgroundColor={grey200}
                                            iconStyle={styles.editButton}
                                            onClick={() => this.handleClick(item.gameIdApi)}>
                        <ContentCreate  />
                      </FloatingActionButton>
                    </Link>
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>    
        </div>
      </PageBase>
    );
  }
}

