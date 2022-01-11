import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text, object, number, select, date } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Input, InputCode, InputDate, InputDatePicker, InputPhone, InputPlace, TextView } from '../src';
import { Watch } from 'react-native-feather'

storiesOf('Input', module)
	.add('Main', () => {
        return(
            <Input
                style={object('style', {
                    margin: 24
                })}
                icon={Watch}
                placeholder={text('placeholder', 'Placeholder')}
                error={boolean('error', false)}
                maxLength={number('maxLength', 30)}
                keyboardType={select('keyboardType', ['default', 'number-pad', 'decimal-pad', 'phone-pad', 'numeric', 'email-address'])}
                blurOnSubmit={boolean('blurOnSubmit', true)}
                clearButtonMode={select('clearButtonMode', ['never', 'while-editing', 'unless-editing', 'always'])}
                value={text('value')}
                autoCapitalize={select('autoCapitalize', ['none', 'sentences', 'words', 'characters'])}
                autoCorrent={boolean('autoCorrent', false)}
                onFocus={action('onFocus')}
                onBlur={action('onBlur')}
                onChangeText={action('onChangeText')}
            />
	    )
    })
    .add('Code', () => {
        return(
            <InputCode
                style={object('style', {
                    padding: 24
                })}
                error={boolean('error', false)}
                autoFocus={boolean('autoFocus', false)}
                onChange={action('onChange')}
            />
	    )
    })
    .add('Date', () => {
        return(
            <InputDate
                style={object('style', {
                    margin: 24
                })}
                error={boolean('error', false)}
                placeholder={text('placeholder', 'Fecha')}
                minimumDate={date('minimumDate', new Date)}
                maximumDate={date('minimumDate', new Date('2050-01-01'))}
                onChange={action('onChange')}
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
    .add('Phone', () => {
        return(
            <InputPhone
                value={text('value')}
                error={boolean('error', false)}
                onCountryChange={action('onCountryChange')}
                onChangeText={action('onChangeText')}
            />
	    )
    })
    .add('Place', () => {
        return(
            <InputPlace
                style={object('style', {
                    margin: 24
                })}
                apiMapsKey={text('apiMapsKey', '')}
                error={boolean('error', false)}
                placeholder={text('placeholder', 'Localización')}
                onChange={action('onChange')}
                onFocus={action('onFocus')}
                onBlur={action('onBlur')}
            />
	    )
    })
    .add('TextView', () => {
        return(
            <TextView
                style={object('style', {
                    margin: 24
                })}
                onChangeText={action('onChangeText')}
            />
	    )
    })
