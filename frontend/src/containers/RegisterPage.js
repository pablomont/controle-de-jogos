import React, {Component} from 'react';
import {Link} from 'react-router';

import axios from 'axios';

import {grey500, white} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Help from 'material-ui/svg-icons/action/help';
import TextField from '../components/TextField';
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

const baseUrl = 'http://localhost:3001/users';
let urlButton = '';

export default class RegisterPage extends Component{

  constructor(props){
    super(props);
    this.state = {email:'', 
                  errorTextEmail: '',
                  username: '',
                  errorTextUsername: '',
                  repitaSenha: '',
                  errorTextRepitaSenha:'',
                  senha:'',
                  disabledButtonRegister: true,
                };
  }

  handleChangeEmail(e){
    
    this.setState({email: e.target.value});
  }

  handleChangeUsername(e){
   
      
      this.setState({username: e.target.value, disabledButtonRegister: false});
    
  }

  handleChangeSenha(e){
    if(e.target.value === this.state.repitaSenha && e.target.value !== ""){
      urlButton = 'http://localhost:3000/';
      this.setState({senha: e.target.value, disabledButtonRegister: false,
                    errorTextRepitaSenha: ''
      });
    }

    else{
      urlButton = null;
      this.setState({senha: e.target.value, disabledButtonRegister: true});
    }
  }

  handleChangeRepitaSenha(e){
    if(e.target.value === this.state.senha && e.target.value !== ""){
      urlButton = 'http://localhost:3000/';
      this.setState({repitaSenha: e.target.value, disabledButtonRegister: false,
        errorTextRepitaSenha: ''
      });
    }
    else{
      urlButton = null;
      this.setState({repitaSenha: e.target.value, disabledButtonRegister: true, 
        errorTextRepitaSenha: 'Senha não confere'});
    }
  }

  save(){

    const user = {
      username: this.state.username,
      senha: this.state.senha,
      email: this.state.email
    };

    const method = user.id ? 'put' : 'post';
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user).then(resp => {
              console.log(resp.data);
    });
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
                  errorText={this.state.errorTextEmail}
                  handleChange={(e) => this.handleChangeEmail(e)}
                  value={this.state.email}
                />
                <TextField
                  hintText="Username"
                  floatingLabelText="Username"
                  fullWidth={true}
                  errorText={this.state.errorTextUsername}
                  handleChange={(e) => this.handleChangeUsername(e)}
                  value={this.state.username}
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
                  errorText={this.state.errorTextRepitaSenha}
                  fullWidth={true}
                  type="password"
                  handleChange={(e) => this.handleChangeRepitaSenha(e)}
                  value={this.state.repitaSenha}
                />
  
                <div>
                <Link to={urlButton}>
                  <RaisedButton label="Registre-se"
                                primary={true}
                                style={styles.loginBtn}
                                disabled={this.state.disabledButtonRegister}
                                onClick={e => this.save(e)}
                                />
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