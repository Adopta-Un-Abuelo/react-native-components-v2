import React from 'react';

import { action } from '@storybook/addon-actions';
import { array, object } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { RadioButton } from '../src';

storiesOf('RadioButton', module)
	.add('Main', () => (
		<RadioButton
            style={object('style', {
                margin: 24
            })}
            cellStyle={object('cellStyle', {})}
            options={array('options', [
                {
                    id: 'option1',
                    title: 'Option 1'
                },
                {
                    id: 'option2',
                    title: 'Option 2'
                },
                {
                    id: 'option3',
                    title: 'Option 3'
                }
            ])}
            onPress={action('onPress')}
        />
	))
