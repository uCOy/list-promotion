import React from 'react';
import './Button.css';

const UIButton = ({ 
    className,
    children, 
    component: Component,
    theme, 
    ...restProps }) =>{

    return <Component 
    className={`uiButton uiButton--${theme} ${className}`} 
    {...restProps}
    >
       {children}
    </Component>
}

UIButton.defaultProps = {
    Component: 'a',
    className: '',
    theme: 'bordered-primary',
}

export default UIButton;