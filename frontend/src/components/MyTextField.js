import React , {PropTypes} from 'react';
import TextField from 'material-ui/TextField';

const MyTextField = props => (
    <TextField
        errorText={props.errorText}
        hintText={props.hintText}
        floatingLabelText={props.floatingLabelText}
        fullWidth={props.fullWidth}
        type={props.type}
        onChange={props.handleChange}
        value={props.value}
    />
);

MyTextField.displayName = 'TextField';
MyTextField.propTypes = {
    errorText: PropTypes.string,
    hintText: PropTypes.string,
    floatingLabelText: PropTypes.string,
    fullWidth: PropTypes.bool,
    type: PropTypes.string,
    handleChange: PropTypes.func,
    value: PropTypes.string
};

export default MyTextField;