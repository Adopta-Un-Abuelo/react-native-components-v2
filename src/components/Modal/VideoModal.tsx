import React, { FC, useState } from 'react';
import Video from 'react-native-video';
import { Play, Pause } from 'react-native-feather';
import { Dimensions, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import Button from '../Button/Button';
import Color from '../../constants/Color';
import Text from '../Text/Text';
import ButtonImage from '../Button/ButtonImage';
import Modal from './Modal';
import VideoProgressBar from '../ProgressBar/VideoProgressBar';

const { width } = Dimensions.get('window');
const height = width/16*9;
const VideoContainer = styled.View`
    width: 100%;
    height: ${height}px;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
`
const ControllersView = styled.View`
    flex-direction: row;
    align-items: center;
`
const ContentView = styled.View<{orientation: 'fullScreen' | 'center' | undefined}>`
    flex: 1;
    align-items: center;
`

const VideoModal: FC<Props> = props =>{

    const [ paused, setPaused ] = useState<boolean>(true);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ videoProgress, setVideoProgress ] = useState<number>(0);
    const [ videoDuration, setVideoDuration ] = useState<number>(0);

    const onVideoEnd = () =>{
        props.onVideoEnd && props.onVideoEnd();
    }

    const onVideoLoad = videoData =>{
        setVideoDuration(videoData.duration);
        setLoading(false);
        setPaused(false);
    }

    const onVideoPress = () =>{
        setPaused(!paused);
    }

    const onVideoProgress = videoData =>{
        setVideoProgress(videoData.currentTime);
    }

    return(
        <Modal
            translation={props.translation}
            visible={props.visible}
            orientation={props.orientation ? props.orientation : 'fullScreen'}
            showTopClose={false}
            showBottomClose={false}
            style={{paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, overflow: 'hidden'}}
            onDismiss={onVideoEnd}
        >
            <Text
                type='p1'
                weight='medium'
                style={{
                    marginStart: 16,
                    marginTop: 28,
                    marginBottom: 16
                }}
            >
                {props.titleHeader}
            </Text>
            <VideoContainer>
                <Video
                    source={{uri: props.url}}
                    style={{
                        position: 'absolute',
                        top: 0,
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
                {loading &&
                    <ActivityIndicator
                        color={'#000'}
                        size={'large'}
                    />
                }
            </VideoContainer>
            <ControllersView
                style={{paddingTop: 22, paddingStart: 16, paddingEnd: 16, paddingBottom: 24}}
            >
                <VideoProgressBar
                    style={{flex: 1}}
                    progress={videoProgress}
                    maxProgress={videoDuration}
                />
            </ControllersView>
            <ContentView
                orientation={props.orientation}
            >
                <Text
                    type='h3'
                    style={{textAlign: 'center'}}
                >
                    {props.title}
                </Text>
                {props.subtitle &&
                    <Text
                        type='p1'
                        style={{textAlign: 'center', marginTop: 8}}
                    >
                        {props.subtitle}
                    </Text>
                }
            </ContentView>
            <ControllersView
                style={{paddingTop: 0, paddingStart: 16, paddingEnd: 16, paddingBottom: 40}}
            >
                {!loading && !props.hideControllers &&
                    <ButtonImage
                        style={{alignSelf: 'auto', flex: 1}}
                        icon={paused ? Play : Pause}
                        onPress={onVideoPress}
                        color={Color.blue3}
                    />
                }
                {props.skipIn &&
                    <Button
                        style={{flex: 1}}
                        title={props.skipIn >= videoProgress ? props.translation.modal_video_skip_in+' '+ new Date((props.skipIn - videoProgress) * 1000).toISOString().substr(14, 5) : props.translation.modal_video_skip}
                        loading={loading}
                        disabled={props.skipIn >= videoProgress}
                        onPress={onVideoEnd}
                    />
                }
            </ControllersView>
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
    titleHeader?: string,
    title?: string,
    subtitle?: string,
    skipIn?: number,
    onVideoEnd?: Function,
    orientation?: 'fullScreen' | 'center',
    hideControllers?: boolean
}