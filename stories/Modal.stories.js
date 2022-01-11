import React from 'react';
import { View } from 'react-native';

import { action } from '@storybook/addon-actions';
import { boolean, object, select, text } from '@storybook/addon-knobs';
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
            horientation={select('horientation', ['top', 'bottom', 'center', 'fullScreen'])}
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
            visible={true}
            horientation='bottom'
            options={[
                {
                    id: 'option1',
                    title: 'Option 1'
                },
                {
                    id: 'option2',
                    title: 'Option 3'
                },
                {
                    id: 'option3',
                    title: 'Option 3'
                }
            ]}
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
