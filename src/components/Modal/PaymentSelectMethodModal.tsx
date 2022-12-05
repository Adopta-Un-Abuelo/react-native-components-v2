import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Modal from '../Modal/Modal';
import Text from '../Text/Text';
import { Color } from '../../constants';

const ScrollView = styled.ScrollView`
`
const Cell = styled.Pressable`
    height: 80px;
    flex-direction: row;
    align-items: center;
`
const CellContent = styled.View<{showLine: boolean}>`
    height: 100%;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    marginLeft: 16px;
    border-bottom-color: ${Color.line.soft};
    border-bottom-width: ${props => props.showLine ? '1px' : '0px'};
`

const PaymentSelectMethodModal: FC<Props> = props =>{

    const [ visible, setVisible ] = useState(props.visible);
    const [ showPaycardModal, setShowPaycardModal ] = useState<boolean>(false);

    useEffect(() =>{
        setVisible(props.visible);
    },[props.visible]);

    const onDismiss = () =>{
        props.onDismiss && props.onDismiss();
    }

    const onPaymentMethodSelected = (option) =>{
        props.onPaymentMethodSelected && props.onPaymentMethodSelected(option);
        if(option.objectId === 'addNewCardPayment') {
            setShowPaycardModal(true);
        }
    }

    const onModalHide = () =>{
        props.onModalHide && props.onModalHide(showPaycardModal);
        setShowPaycardModal(false);
    }

    const renderPaymentCell = (item, index) => {
        return (
            <Cell
                key={'paymentMethod'+index}
                onPress={() => onPaymentMethodSelected(item)}
            >
                {item.objectId === 'addNewCardPayment' ?
                    item.icon
                :
                    <item.icon />
                }
                <CellContent
                    showLine={item.objectId !== 'addNewCardPayment'}
                >
                    <Text
                        type='p2'
                        weight='medium'
                        numberOfLines={1}
                        style={{color: item.objectId === 'addNewCardPayment' ? Color.text.primary : Color.text.full}}
                    >
                        {item.title}
                    </Text>
                    {item.date &&
                        <Text
                            type='c1'
                            style={{color: Color.text.high}}
                        >
                            {props.expiresString} {item.date}
                        </Text>
                    }   
                </CellContent>
            </Cell>
        )
    }

    return(
            <Modal
                visible={visible}
                orientation={'bottom'}
                showTopClose={true}
                title={props.modalTitleString}
                onDismiss={onDismiss}
                onModalHide={onModalHide}
                style={{paddingBottom: 40}}
            >
                <ScrollView>
                    {props.paymentMethodOptions && props.paymentMethodOptions.map((item, index) => {
                        return renderPaymentCell(item, index)
                    })}
                </ScrollView>
            </Modal>
    ) 
};
export default PaymentSelectMethodModal;
export interface Props{
    expiresString: string,
    modalTitleString: string,
    visible: boolean,
    currentUser: any,
    paymentMethodOptions: Array<any>,
    onPaymentMethodSelected?: Function,
    onDismiss?: Function,
    onModalHide?: Function
}