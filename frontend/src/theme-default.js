import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { grey900, cyan600} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme(darkBaseTheme, {
  palette: {
  },
  appBar: {
    height: 57,
    color: grey900
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