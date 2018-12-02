import React , {PropTypes} from 'react';
import {Link} from 'react-router';

const MyLink = props => {
    if(props.disabled){
        return <span>{props.children}</span>;
    }
    return <Link to={props.to}>{props.children}</Link>;
};

MyLink.displayName = "MyLink";
MyLink.propTypes = {
    disabled: PropTypes.bool,
    to: PropTypes.string,
    children: PropTypes.object
};

export default MyLink;