import React from 'react';
import TextField from 'material-ui/TextField';

const MyTextField = props => {

    return (
        <TextField
            hintText={props.hintText}
            floatingLabelText={props.floatingLabelText}
            fullWidth={props.fullWidth}
            type={props.type}
            onChange={props.handleChange}
            value={props.value}
        />
    );
};

MyTextField.displayName = 'TextField';
export default MyTextField;