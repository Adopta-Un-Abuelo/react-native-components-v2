import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { array, boolean, object } from '@storybook/addon-knobs';
import { Select, SelectTag, SelectPaymentMethod, Container, SelectCountry } from '../src';

storiesOf('Select', module)
	.add('Main', () => {
        return(
            <Select
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
	    )
    })
    .add('SelectTag', () => {
        return(
            <SelectTag
                options={[{"en": "German", "id": "german", "title": "Alemán"}, {"en": "Catalan", "id": "catalan", "title": "Catalán"}, {"en": "Chinese", "id": "chinese", "title": "Chino"}, {"en": "Spanish", "id": "spanish", "title": "Español"}, {"en": "Basque", "id": "basque", "title": "Euskera"}, {"en": "French", "id": "french", "title": "Francés"}, {"en": "Galician", "id": "galician", "title": "Gallego"}, {"en": "English", "id": "english", "title": "Inglés"}, {"en": "Italian", "id": "italian", "title": "Italiano"}, {"en": "Japanese", "id": "japanese", "title": "Japonés"}, {"en": "Other", "id": "other", "title": "Otro"}, {"en": "Portuguese", "id": "portugues", "title": "Portugués"}, {"en": "Russian", "id": "russian", "title": "Ruso"}, {"en": "Arabic/Dariya", "id": "arabic/dariya", "title": "Árabe/Dariya"}]}
                locale={'en'}
            />
        )
    })
    .add('SelectPaymentMethod', () => {
        return(
            <Container
                buttonProps={{
                    title: 'Siguiente'
                }}
                buttonSize={'big'}
            >
                <View
                    style={{flex: 1, paddingLeft: 24, paddingRight: 24}}
                >
                    <View style={{flex: 1}}/>
                    <SelectPaymentMethod
                        style={object('style', {})}
                        showAddCard={boolean('showAddCard', false)}
                        nativePay={boolean('nativePay', false)}
                    />
                </View>
            </Container>
        )
    })
    .add('SelectCountry', () => {
        return(
            <SelectCountry
                countries={[{
                    id: 'spain',
                    prefix: '+34',
                    esCountry: 'España',
                    enCountry: 'Spain',
                    esPrefix: 'España (+34)',
                    enPrefix: 'Spain (+34)',
                    // icon: SpainFlag
                }, {
                    id: 'france',
                    prefix: '+33',
                    esCountry: 'Francia',
                    enCountry: 'France',
                    esPrefix: 'Francia (+33)',
                    enPrefix: 'France (+33)',
                    // icon: FranceFlag
                }]}
                locale={'es'}
            />
        )
    })