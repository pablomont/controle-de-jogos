import React from 'react';

import MyLink from '../components/MyLink';

import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {grey500, white} from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import ThemeDefault from '../theme-default';

const LoginPage = () => {

  const styles = {
    loginContainer: {
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
    checkRemember: {
      style: {
        float: 'left',
        maxWidth: 180,
        paddingTop: 5
      },
      labelStyle: {
        color: grey500
      },
      iconStyle: {
        color: grey500,
        borderColor: grey500,
        fill: grey500
      }
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
    },
    btnFacebook: {
      background: '#4f81e9'
    },
    btnGoogle: {
      background: '#e14441'
    },
    btnSpan: {
      marginLeft: 5
    },
  };

  return (
    <MuiThemeProvider muiTheme={ThemeDefault}>
      <div>
        <div style={styles.loginContainer}>

          <Paper style={styles.paper}>

            <form>
              <TextField
                hintText="E-mail"
                floatingLabelText="E-mail"
                fullWidth={true}
              />
              <TextField
                hintText="Senha"
                floatingLabelText="Senha"
                fullWidth={true}
                type="password"
              />

              <div>
                <Checkbox
                  label="Lembre-se de mim"
                  style={styles.checkRemember.style}
                  labelStyle={styles.checkRemember.labelStyle}
                  iconStyle={styles.checkRemember.iconStyle}
                />

                <MyLink to="/login" disabled={false}>
                  <RaisedButton label="Entrar"
                                primary={true}
                                style={styles.loginBtn}/>
                </MyLink>
              </div>
            </form>
          </Paper>

          <div style={styles.buttonsDiv}>
            <MyLink to="/register" disabled={false}>
              <FlatButton
                label="Registre-se"
                style={styles.flatButton}
                icon={<PersonAdd />}
              />
            </MyLink>

            <FlatButton
              label="Esqueceu a senha?"
              href=""
              style={styles.flatButton}
              icon={<Help />}
            />
          </div>

          <div style={styles.buttonsDiv}>
            <Link to="" style={{...styles.btn, ...styles.btnFacebook}}>
              <i className="fa fa-facebook fa-lg"/>
              <span style={styles.btnSpan}>Entre com o Facebook</span>
            </Link>
            <Link to="" style={{...styles.btn, ...styles.btnGoogle}}>
              <i className="fa fa-google-plus fa-lg"/>
              <span style={styles.btnSpan}>Entre com o Google</span>
            </Link>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default LoginPage;
