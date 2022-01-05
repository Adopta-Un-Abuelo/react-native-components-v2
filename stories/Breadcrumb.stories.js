import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Breadcrumb } from '../src';

storiesOf('Breadcrumb', module)
	.add('Main', () => (
        <Breadcrumb
            steps={8}
            currentStep={4}
        />
	))
