import React from 'react';
import { Dots } from 'react-activity';
import 'react-activity/dist/react-activity.css';

export const DotsLoader = () => {
    return(
        <Dots color="#727981" size={32} speed={1} animating={true} />
    )
}