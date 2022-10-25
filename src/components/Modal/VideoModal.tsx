import React, { FC, useState } from 'react';
import Video from 'react-native-video';
import { Play, Pause, X } from 'react-native-lucide';
import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import Color from '../../constants/Color';
import Text from '../Text/Text';
import ButtonImage from '../Button/ButtonImage';
import Modal from "react-native-modal";
import VideoProgressBar from '../ProgressBar/VideoProgressBar';

const VideoContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: #000000;
`
const Header = styled.View`
    height: 56px;
    flex-direction: row;
    align-items: center;
    margin-top: ${Platform.OS === 'ios' ? 40 : 0};
`
const CloseButton = styled.Pressable`
    height: 56px;
    width: 56px;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`
const VideoView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
const ControllersView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: ${Platform.OS === 'ios' ? 24 : 0};
`
const { width } = Dimensions.get('window');
const height = width/16*9;

const VideoModal: FC<Props> = props =>{

    const [ paused, setPaused ] = useState<boolean>(true);
    const [ videoProgress, setVideoProgress ] = useState<number>(0);
    const [ videoDuration, setVideoDuration ] = useState<number>(0);

    const onVideoEnd = () =>{
        if(videoProgress >= props.skipIn) {
            props.onVideoEnd && props.onVideoEnd();
        }
    }

    const onVideoLoad = videoData =>{
        setPaused(false);
        setVideoDuration(videoData.duration);
    }

    const onVideoPress = () =>{
        setPaused(!paused);
    }

    const onVideoProgress = videoData =>{
        setVideoProgress(videoData.currentTime);
    }

    return(
        <Modal
            isVisible={props.visible}
            style={{ margin: 0 }}
            avoidKeyboard={true}
            onDismiss={onVideoEnd}
        >
            <VideoContainer>
                <Header>
                    {props.skipIn === 0 ? 
                        undefined
                        :
                        <CloseButton
                            onPress={onVideoEnd}
                        >
                            <X color={Color.text.white}/>
                        </CloseButton>
                    }
                    {props.skipIn === 0 ? 
                        undefined
                        :
                        <Text
                            type='b2'
                            weight={props.skipIn >= videoProgress ? 'medium' : 'bold'}
                            style={{color: props.skipIn >= videoProgress ? Color.text.whiteHigh : Color.text.white}}
                        >
                            {props.skipIn >= videoProgress ? props.translation.modal_video_skip_in+' '+ new Date((props.skipIn - videoProgress) * 1000).toISOString().substr(14, 5) : props.translation.modal_video_skip}
                        </Text>
                    }
                </Header>
                <VideoView>
                    <Video
                        source={{uri: props.url}}
                        style={{
                            flex: 1,
                            width: width,
                            height: height,
                            top: 24,
                            bottom: 0,
                            right: 0,
                            left: 0
                        }}
                        paused={paused}
                        onEnd={onVideoEnd}
                        onLoad={onVideoLoad}
                        onProgress={onVideoProgress}
                        resizeMode={'contain'}
                        ignoreSilentSwitch={'ignore'}
                    />
                </VideoView>
                <ControllersView
                    style={{paddingTop: 24, paddingStart: 16, paddingEnd: 16, paddingBottom: 24}}
                >
                    <ButtonImage
                        icon={paused ? Play : Pause}
                        onPress={onVideoPress}
                        color={Color.text.white}
                        style={{marginRight: 8}}
                    />
                    <VideoProgressBar
                        progress={videoProgress}
                        maxProgress={videoDuration}
                        colorTextLeft={Color.text.white}
                        colorTextTotal={Color.text.whiteMedium}
                        colorBarLeft={Color.text.white}
                        colorBarTotal={Color.text.whiteLow}
                    />
                </ControllersView>
            </VideoContainer>
        </Modal>
    )
}
export default VideoModal;
export interface Props{
    translation: {
		[key: string]: any
	},
    visible: boolean,
    url: string,
    skipIn?: number,
    onVideoEnd?: Function,
}