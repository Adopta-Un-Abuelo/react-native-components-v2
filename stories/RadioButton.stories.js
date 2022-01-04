import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { RadioButton } from '../src';

storiesOf('RadioButton', module)
	.add('Main', () => (
		<RadioButton
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
