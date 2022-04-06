import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text, color, object, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Chart, Color, Text } from '../src';

storiesOf('Chart', module)
	.add('Pie', () => (
		<Chart
            type='pie'
			style={object('style', {
				margin: 24
			})}
            data={[
                {
                    id: 'data1',
                    percentage: 10,
                    color: Color.text.primary
                },
                {
                    id: 'data2',
                    percentage: 50,
                    color: Color.status.primary.pressed
                }
            ]}
		>
            <Text>Hola</Text>
        </Chart>
	))
