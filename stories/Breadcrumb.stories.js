import React from 'react';

import { number, object } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Breadcrumb } from '../src';

storiesOf('Breadcrumb', module)
	.add('Main', () => (
        <Breadcrumb
            style={object('style', {})}
            steps={number('steps', 8)}
            currentStep={number('currentStep', 4)}
        />
	))
