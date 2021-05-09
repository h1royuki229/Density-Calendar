import React from 'react';
import InputBox_SP from './InputBox';

export default function Header(props) {
    const {title} = props;

    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
}
