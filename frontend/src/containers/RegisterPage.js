import React, {Component} from 'react';

import {grey500, white} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Help from 'material-ui/svg-icons/action/help';
import TextField from '../components/TextField';
import {Link} from 'react-router';
import ThemeDefault from '../theme-default';



const styles = {
  
  registerContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto'
  },
  paper: {
    padding: 20,
    overflow: 'auto'
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10
  },
  flatButton: {
    color: grey500
  },
  loginBtn: {
    float: 'right'
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13
  }
};


export default class RegisterPage extends Component{

  constructor(props){
    super(props);
    this.state = {email: '', 
                  senha:'', 
                  repitaSenha: ''};
  }

  handleChangeEmail(e){
    this.setState({email: e.target.value});
  }

  handleChangeSenha(e){
    this.setState({senha: e.target.value});
  }

  handleChangeRepitaSenha(e){
    this.setState({repitaSenha: e.target.value});
  }

  render(){
    return (
      <MuiThemeProvider muiTheme={ThemeDefault} >
        <div >
          <div style={styles.registerContainer}>
  
            <Paper style={styles.paper}>
  
              <form>
                <TextField
                  hintText="E-mail"
                  floatingLabelText="E-mail"
                  fullWidth={true}
                  handleChange={(e) => this.handleChangeEmail(e)}
                  value={this.state.email}
                />
                <TextField
                  hintText="Senha"
                  floatingLabelText="Senha"
                  fullWidth={true}
                  type="password"
                  handleChange={(e) => this.handleChangeSenha(e)}
                  value={this.state.senha}
                />
                <TextField
                  hintText="Repita a senha"
                  floatingLabelText="Repita a senha"
                  fullWidth={true}
                  type="password"
                  handleChange={(e) => this.handleChangeRepitaSenha(e)}
                  value={this.state.repitaSenha}
                />
  
                <div>
                  <Link to="/">
                    <RaisedButton label="Registre-se"
                                  primary={true}
                                  style={styles.loginBtn}/>
                  </Link>
                </div>
              </form>
            </Paper>
  
            <div style={styles.buttonsDiv}>
            <FlatButton
                label="Já possui uma conta?"
                href="/login"
                style={styles.flatButton}
                icon={<Help />}
              />
            </div>
            
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}