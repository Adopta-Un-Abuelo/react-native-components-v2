import React from 'react';
import { View } from 'react-native';

import { Activity, Airplay, AlignCenter } from 'react-native-lucide';
import { array, boolean, object, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Modal, Text, SelectionModal, PaymentMethodModal, WebModal, VideoModal } from '../src';

storiesOf('Modal', module)
	.add('Main', () => (
        <Modal
            style={object('style', {})}
            title={text('title', 'Title')}
            subtitle={text('subtitle', 'Subtitle')}
            visible={boolean('visible', false)}
            hideClose={boolean('hideClose', false)}
            buttonProps={object('buttonProps', {
                title: 'Button'
            })}
            orientation={select('orientation', ['top', 'bottom', 'center', 'fullScreen'])}
            avoidKeyboard={boolean(boolean, false)}
            showBottomClose={boolean('showBottomClose', true)}
            swipeToClose={boolean('swipeToClose', false)}
        >
            <View style={{flex: 1}}>
                <Text>Children</Text>
            </View>
        </Modal>
    ))
    .add('Selection', () => (
        <SelectionModal
            style={object('style', {})}
            title={text('title', 'Title')}
            visible={boolean('visible', false)}
            orientation={select('orientation', ['top', 'bottom', 'center', 'fullScreen'], 'bottom')}
            showSearch={boolean('showSearch', true)}
            options={array('options', [
                {
                    id: 'option1',
                    title: 'Option 1',
                    icon: Activity
                },
                {
                    id: 'option2',
                    title: 'Option 3',
                    icon: Airplay
                },
                {
                    id: 'option3',
                    title: 'Option 3',
                    icon: AlignCenter
                }
            ])}
        />
    ))
    .add('PaymentMethod', () => (
        <PaymentMethodModal
            visible={true}
        />
    ))
    .add('Web', () => (
        <WebModal
            visible={true}
            url={'https://adoptaunabuelo.org'}
        />
    ))
    .add('Video', () => (
        <VideoModal
            visible={true}
            url={'https://data.adoptaunabuelo.org/video/register_welcome.mp4'}
        />
    ))
