import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Input, InputCode, InputDate, InputDatePicker } from '../src';
import { Watch } from 'react-native-feather'

storiesOf('Input', module)
	.add('Main', () => {
        return(
            <Input
                icon={Watch}
                placeholder={'Placeholder'}
            />
	    )
    })
    .add('Code', () => {
        return(
            <InputCode/>
	    )
    })
    .add('Date', () => {
        return(
            <InputDate
                placeholder='Fecha'
            />
	    )
    })
    .add('DatePicker', () => {
        return(
            <InputDatePicker
                placeholder='Fecha'
            />
	    )
    })
