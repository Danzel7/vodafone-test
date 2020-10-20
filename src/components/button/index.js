import React from 'react';
import styled  from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({
    backgroundColor = '#666',
    textColor = 'white',
    onClick = () => {},
    children,
    ...props
}) => (
    <ButtonContainer
        onClick={onClick}
        backgroundColor={backgroundColor}
        textColor={textColor}
        {...props}
    >
        {children}
    </ButtonContainer>
)

const ButtonContainer = styled.button`
    width: 100%;
    height: 55px;
    font-size: 1em;
    margin: 1em;4
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.textColor};
    border: 0px; 
    margin: 0px;
    cursor: pointer;
`

export default Button;

Button.propTypes = {
    use: PropTypes.oneOf([
        'primary',
        'secondary'
    ]),
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
}
