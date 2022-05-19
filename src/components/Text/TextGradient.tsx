import React from 'react';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../Text/Text';

const TextGradient = ({colors, type, weight, ...rest}: GradientTextProps) => {
    return (
        <MaskedView
            maskElement={<Text {...rest} type={type} weight={weight}/>}
        >
            <LinearGradient 
                colors={colors} 
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 0}}
                {...rest}
            >
                <Text 
                    {...rest} 
                    style={{opacity: 0}}
                    type={type}
                    weight={weight}
                />
            </LinearGradient>
        </MaskedView>
    );
};

export default TextGradient;
interface GradientTextProps {
    colors: string[];
    type?: 'd1' | 'd2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'b1' | 'b2' | 'p1' | 'p2' | 'c1' | 'c2' | 'o1',
    weight?: 'regular' | 'semibold' | 'medium' | 'bold',
    [x: string]: any;
}