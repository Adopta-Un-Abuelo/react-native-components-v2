import React from 'react';

import { action } from '@storybook/addon-actions';
import { object, array, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Checkbox } from '../src';

storiesOf('Checkbox', module)
	.add('Primary', () => (
		<Checkbox
            style={object('style', {
                margin: 24
            })}
            textStyle={object('textStyle', {})}
			cellStyle={object('cellStyle', {})}
			title={'Test checkbox'}
            error={boolean('error', false)}
            onChange={action('onChange')}
		/>
	))
