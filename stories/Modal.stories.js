import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Modal, Text } from '../src';

storiesOf('Modal', module)
	.add('Main', () => {
        return(
            <Modal
                title='Title'
                subtitle='Subtitle'
                visible={true}
                buttonProps={{
                    title: 'Button'
                }}
            >
                <Text>Children</Text>
            </Modal>
	    )
})
