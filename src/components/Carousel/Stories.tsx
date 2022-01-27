import React, { forwardRef, useEffect, useState, Ref, useImperativeHandle } from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import ProgressBar from '../ProgressBar/StoriesProgressBar';

const Container = styled.View`
    flex: 1;
`
const ProgressBarView = styled.View`
    flex-direction: row;
    padding: 0px 24px;
    height: 30px;
    align-items: center;
`
const SafeArea = styled.SafeAreaView`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 100;
`
const ProgressBarGradient = styled(LinearGradient)`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
`
const PresableView = styled.View`
    flex-direction: row;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
`
const Pressable = styled.Pressable`
    flex: 1;
`

const Stories = forwardRef((props: Props, ref: Ref<StoriesRef>) =>{

    const [ currentIndex, setCurrentIndex ] = useState(0);

    useEffect(() =>{
        if(props.currentIndex)
            setCurrentIndex(props.currentIndex);
    },[props.currentIndex]);

    useImperativeHandle(ref, () => ({
        next(){
            const newIndex = currentIndex+1;
            setCurrentIndex(newIndex);
            onChange(newIndex);
        },
        previous(){
            const newIndex = currentIndex-1;
            setCurrentIndex(newIndex);
            onChange(newIndex);
        }
    }));

    const onStorieFinish = index =>{
        if(currentIndex < props.views.length-1){
            setCurrentIndex(index + 1);
            onChange(index+1);
        }
        else if(currentIndex === props.views.length-1){
            props.onFinish && props.onFinish();
        }
    }

    const onLeftPress = () =>{
        if(!props.pause){
            if(currentIndex > 0){
                setCurrentIndex(currentIndex - 1);
                onChange(currentIndex-1);
            }
        }
    }

    const onRightPress = () =>{
        if(!props.pause){
            if(currentIndex < props.views.length-1){
                setCurrentIndex(currentIndex + 1)
                onChange(currentIndex+1);
            }
            else if(currentIndex === props.views.length-1){
                props.onFinish && props.onFinish();
            }
        }
    }

    const onChange = (index) =>{
        props.onChange && props.onChange(index);
    }

    return(
        <Container>
            <SafeArea>
                <ProgressBarGradient
                    colors={['#00000090', '#00000000']}
                    start={{x: 0, y: 0}} 
                    end={{x: 0, y: 1}}
                />
                <ProgressBarView>
                    {props.views.map((item, index) =>
                        <ProgressBar
                            style={{marginLeft: 2, marginRight: 2}}
                            key={'progress'+index}
                            maxTime={props.storyTime ? props.storyTime : 5}
                            onFinish={() => onStorieFinish(index)}
                            pause={currentIndex !== index ? true : (props.pause ? props.pause : false)}
                            fill={index < currentIndex}
                            clean={index > currentIndex}
                            color={'white'}
                            unfilledColor={'#00000040'}
                        />
                    )}
                </ProgressBarView>
            </SafeArea>
            {props.views[currentIndex]}
            {!props.pause &&
                <PresableView>
                    <Pressable  
                        onPress={onLeftPress}
                    />
                    <Pressable
                        onPress={onRightPress}
                    />
                </PresableView>
            }
        </Container>
    )
});
export default Stories;
export interface Props {
    storyTime?: number
    views: Array<any>,
    onFinish?: Function,
    onChange?: Function,
    pause?: boolean,
    currentIndex?: number
}
export interface StoriesRef{
    next: () => void,
    previous: () => void
}