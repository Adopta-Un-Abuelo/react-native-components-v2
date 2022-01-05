import React, { FC, useState } from 'react';
import styled from 'styled-components/native';
import { Keyboard } from 'react-native';

import Modal from './Modal';
import Text from '../Text/Text';
import PaymentMethodForm from '../Form/PaymentMethodForm';
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

const PaymentMethodModal: FC<Props> = props => {

    const [ error, setError ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState(false);

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

    return(
        <Modal
            title={props.translation.payment_method_modal_title}
            visible={props.visible}
            horientation={'fullScreen'}
            onDismiss={onDismiss}
            buttonProps={{
                title: props.translation.payment_method_modal_btn_save_card,
                loading: loading
            }}
        >
            <Container>
                <PaymentMethodForm
                    translation={props.translation}
                    style={{marginTop: 24, marginBottom: 24}}
                    onChange={onPaycardChange}
                />
                {error &&
                    <Text
                        style={{color: Color.error}}
                    >
                        {props.translation.payment_method_modal_error}
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
                        {props.translation.payment_method_modal_more}
                    </Text>
                </InfoView>
            </Container>
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