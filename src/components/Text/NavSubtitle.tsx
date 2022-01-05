import React, { FC } from 'react';

import Text from './Text';
import Color from '../../constants/Color';

const NavSubtitle: FC <Props> = props =>{

    return(
        <Text
            style={{
                fontSize: 24, 
                color: Color.blue3, 
                marginTop: -6,
                ...props.style
            }}
        >
            {props.children}
        </Text>
    )
}
export default NavSubtitle;
export interface Props{
    style?: any
}