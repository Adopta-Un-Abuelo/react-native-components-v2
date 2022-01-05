import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Modal, Text, SelectionModal, PaymentMethodModal } from '../src';

storiesOf('Modal', module)
	.add('Main', () => (
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
