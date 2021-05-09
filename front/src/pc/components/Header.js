import React from 'react';
import InputBox from './InputBox';


export default function Header(props) {
    const {title} = props;

    return (
        <header>
            <div className="logo">
                <img src={`${process.env.PUBLIC_URL}/title.png`} width="auto" height="200" className="d-block mx-auto"></img>
            </div>
        </header>
    );
}
