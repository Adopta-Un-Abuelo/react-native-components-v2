import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { Keyboard } from 'react-native';

import { ChevronRight, CreditCard, DollarSign } from 'react-native-feather';
import Modal from './Modal';
import Text from '../Text/Text';
import PaymentMethodForm from '../Form/PaymentMethodForm';
import BankMethodForm from '../Form/BankMethodForm';
import { Color } from '../../constants';
import PaycardLogos from '../../constants/Paycard';

const Container = styled.View`
    flex: 1;
`
const InfoView = styled.View`
    flex-direction: row;
    align-items: center;
`
const Separator = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${Color.gray5};
    margin-bottom: 24px;
`
const Cell = styled.Pressable`
    flex-direction: row;
    padding: 18px 0px;
    border-bottom-width: 1px;
    border-bottom-color: ${Color.gray4};
`

const PaymentMethodModal: FC<Props> = props => {

    const [ error, setError ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState(false);
    const [ optionSelected, setOptionSelected ] = useState(undefined);
    const options = [
        {
            id: 'sepa_debit',
            title: 'Cuenta bancaria',
            icon: <DollarSign height={24} width={24} stroke={Color.gray2}/>
        },
        {
            id: 'card',
            title: 'Tarjeta de crédito o débito',
            icon: <CreditCard height={24} width={24} stroke={Color.gray2}/>
        }
    ]

    const onPaycardChange = result => {
        Keyboard.dismiss();
        if(result.status === 'ok') {
            props.onChange && props.onChange(result.result);
            onDismiss()
            setLoading(false);
        } else if (result.status === 'loading') {
            setLoading(true)
        } else {
            setError(true);
            setLoading(false);
        }
    }

    const onDismiss = () => {
        props.onDismiss && props.onDismiss();
    }

    const onOptionPress = (option) =>{
        setOptionSelected(option);
    }

    return(
        <Modal
            title={optionSelected ?
                (props.translation ? props.translation.payment_method_modal_title : 'Datos de tarjeta') :
                (props.translation ? props.translation.payment_method_select_add_credit_card : 'Añadir forma de pago')
            }
            visible={props.visible}
            horientation={'fullScreen'}
            onDismiss={onDismiss}
            buttonProps={optionSelected && {
                title: props.translation ? props.translation.payment_method_modal_btn_save_card : 'Guardar tarjeta',
                loading: loading
            }}
        >
            {optionSelected ? 
                <Container>
                    {optionSelected.id === 'card' &&
                        <>
                        <PaymentMethodForm
                            translation={props.translation}
                            style={{marginTop: 24, marginBottom: 24}}
                            onChange={onPaycardChange}
                        />
                        {error &&
                            <Text
                                style={{color: Color.error}}
                            >
                                {props.translation ? props.translation.payment_method_modal_error : 'Parece que los datos de tu tarjeta no son correctos.'}
                            </Text>
                        }
                        <Separator/>
                        <InfoView
                            style={{marginBottom: 18}}
                        >
                            <PaycardLogos.visa.icon style={{marginRight: 8}} height={32} width={42}/>
                            <PaycardLogos.mastercard.icon style={{marginRight: 8}} height={32} width={42}/>
                            <PaycardLogos.amex.icon style={{marginRight: 12}} height={32} width={42}/>
                            <Text 
                                style={{fontSize: 12, color: Color.gray3}}
                            >
                                {props.translation ? props.translation.payment_method_modal_more : 'y muchas más...'}
                            </Text>
                        </InfoView>
                        </>
                    }
                    {optionSelected.id === 'sepa_debit' &&
                        <>
                        <BankMethodForm
                            translation={props.translation}
                            style={{marginTop: 24, marginBottom: 24}}
                            onChange={onPaycardChange}
                        />
                        </>
                    }
                </Container>
            :
                <Container>
                    {options.map((item, index) =>(
                        <Cell
                            key={'option'+index}
                            onPress={() => onOptionPress(item)}
                        >
                            {item.icon}
                            <Text style={{flex: 1, marginLeft: 12}}>
                                {item.title}
                            </Text>
                            <ChevronRight height={24} width={24} stroke={Color.gray2}/>
                        </Cell>
                    ))}
                </Container>
            }
        </Modal>
    )
    
}
export default PaymentMethodModal;
export interface Props{
    translation: {
		[key: string]: any
	},
    onChange?: Function,
    onDismiss: Function,
    visible: boolean
}