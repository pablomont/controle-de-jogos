import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { grey900, cyan600,blueGrey900} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme(darkBaseTheme, {
  palette: {
    color: blueGrey900
  },
  appBar: {
    height: 57,
    color: blueGrey900
  },
  drawer: {
    width: 230,
    color: grey900
  },
  raisedButton: {
    primaryColor: cyan600,
  }
});


export default themeDefault;