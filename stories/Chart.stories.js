import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Color, ProgressRing, Text } from '../src';

storiesOf('Chart', module)
	.add('Pie', () => (
		<ProgressRing
			config={{
                width: 160,  
                height: 160,
                radius: 70,
                ringSize: 8
			}}
            data={[
                {
                    value: 0.25,
                    color: Color.status.primary.default,
                    backgroundColor: Color.background.mediumLow
                }
            ]}
		>
            <Text>Hola</Text>
        </ProgressRing>
	))
