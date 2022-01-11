import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Select, SelectTag } from '../src';

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
