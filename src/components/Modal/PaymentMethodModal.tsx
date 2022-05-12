import React, { useState, useRef, useEffect, forwardRef, Ref, useImperativeHandle } from 'react';
import styled from 'styled-components/native';
import { Keyboard } from 'react-native';
import { Lock } from 'react-native-lucide';
import Modal from './Modal';
import Text from '../Text/Text';
import PaymentMethodForm, { PaymentMethodFormRef } from '../Form/PaymentMethodForm';
import { Color } from '../../constants';

const Container = styled.View`
    flex: 1;
    margin-top: 32px;
`
const Row = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
`
const ContainerSecure = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
`

const PaymentMethodModal = forwardRef((props: Props, ref: Ref<PaymentMethodModalRef>) =>{

    const paycardForm = useRef<PaymentMethodFormRef>();
    const [ visible, setVisible ] = useState(props.visible);
    const [ error, setError ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState(false);

    useImperativeHandle(ref, () => ({
        show(){
            setVisible(true);
        },
        hide(){
            setVisible(false);
        }
    }));

    useEffect(() =>{
        setVisible(props.visible);
    },[props.visible]);

    const onDismiss = () => {
        setVisible(false);
        props.onDismiss && props.onDismiss();
    }

    const onSavePress = async () =>{
        Keyboard.dismiss();        
            setLoading(true);
            const result = await paycardForm?.current.generateToken();
            if(result && result.status === 'ok'){
                props.onChange && props.onChange(result.result);
                onDismiss();
            } else {
                setError(true);
            }
            setLoading(false);
    }

    return(
        <Modal
            translation={props.translation}
            visible={visible}
            orientation={'fullScreen'}
            showTopClose={true}
            avoidKeyboard={true}
            showBottomClose={false}
            canGoBack={true}
            title={props.translation ? props.translation.payment_method_select_add_credit_card : 'Añadir método de pago'}
            buttonProps={{
                title: props.translation ? props.translation.payment_method_modal_btn_save_card : 'Guardar tarjeta',
                loading: loading,
                onPress: onSavePress
            }}
            onDismiss={onDismiss}
            onModalHide={onDismiss}
        >
            <Container>
                <PaymentMethodForm
                    ref={paycardForm}
                    translation={props.translation}
                    currentUser={props.currentUser}
                />
                {error &&
                    <Text
                        type='c1'
                        style={{color: Color.status.color.error, marginTop: 24}}
                    >
                        {props.translation ? props.translation.payment_method_modal_error : 'Parece que los datos de tu método de pago no son correctos.'}
                    </Text>
                }
                <ContainerSecure>
                    <Row style={{alignItems: 'flex-start'}}>
                        <Lock height={20} width={20} color={Color.text.primary}/>
                        <Text
                            type='c1'
                            style={{color: Color.text.high, flex: 1, marginLeft: 8}}
                        >
                            {props.translation ? props.translation.payment_method_modal_secure : 'Tu información de pago se guardará de forma segura. Más información.'}
                        </Text>
                    </Row>
                </ContainerSecure>
            </Container>
        </Modal>
    ) 
});
export default PaymentMethodModal;
export interface Props{
    translation: {
		[key: string]: any
	},
    visible: boolean,
    currentUser: any,
    methodsTypes: Array<string>,
    onChange?: Function,
    onDismiss: Function
}
export interface PaymentMethodModalRef{
    show: () => void,
    hide: () => void
}