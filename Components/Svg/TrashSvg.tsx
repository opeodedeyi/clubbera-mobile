import React from 'react';
import Svg, { Path } from 'react-native-svg';

function WelcomeSvg(props: any) {
    return (
        <Svg width="16" height="17" viewBox="0 0 16 17" fill="none">
            <Path d="M14 4.48665C11.78 4.26665 9.54667 4.15332 7.32 4.15332C6 4.15332 4.68 4.21999 3.36 4.35332L2 4.48665" stroke="#FB5E5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M5.66602 3.81337L5.81268 2.94004C5.91935 2.30671 5.99935 1.83337 7.12602 1.83337H8.87268C9.99935 1.83337 10.086 2.33337 10.186 2.94671L10.3327 3.81337" stroke="#FB5E5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M12.5669 6.59338L12.1336 13.3067C12.0603 14.3534 12.0003 15.1667 10.1403 15.1667H5.86026C4.00026 15.1667 3.94026 14.3534 3.86693 13.3067L3.43359 6.59338" stroke="#FB5E5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M6.88672 11.5H9.10672" stroke="#FB5E5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M6.33398 8.83337H9.66732" stroke="#FB5E5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    );
}

export default WelcomeSvg;