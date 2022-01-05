import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Checkbox } from '../src';

storiesOf('Checkbox', module)
	.add('Primary', () => (
		<Checkbox
			options={[
                {
                    id: 'option1',
                    title: 'This is a checkbox'
                }
            ]}
		/>
	))
