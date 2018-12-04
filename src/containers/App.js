import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import Data from '../data';
import { black } from 'material-ui/styles/colors';
import axios from 'axios';
import {browserHistory} from 'react-router';

const baseUrlUsers = 'https://pablomont-controle-de-jogos-b.herokuapp.com/users';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userLogged: false,
      navDrawerOpen: true
    };
  }

  componentDidMount(){
    axios.get(`${baseUrlUsers}`).then(resp => {
      const userLogged = resp.data.find(u => u.isLogged === true);
      if(!userLogged){
        browserHistory.push('login');
      }
      else{
        this.setState({userLogged});
      }
    });
  }
 
  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
      },
      container: {
        margin: '57px 20px 20px 15px',
        backgroundColor: black,
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };
    return(
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

            <LeftDrawer navDrawerOpen={navDrawerOpen}
                        menus={Data.menus}
                        username="User Admin"/>

            <div style={styles.container}>
              {this.props.children}
            </div>
        </div>
      </MuiThemeProvider>
    );
    
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
};

export default withWidth()(App);
