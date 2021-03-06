import Visa from '../assets/images/paycard/visa.svg';
import Mastercard from '../assets/images/paycard/mastercard.svg';
import Discover from '../assets/images/paycard/discover.svg';
import Amex from '../assets/images/paycard/amex.svg';
import Google from '../assets/images/paycard/google.svg';
import Apple from '../assets/images/paycard/apple.svg';
import Sepa from '../assets/images/paycard/sepa_debit.svg';

const Paycard = {
    visa:{
		name: 'Visa',
		icon: Visa
	},
    mastercard:{
		name: 'Mastercard',
		icon: Mastercard
	},
    discover:{
		name: 'Discover',
		icon: Discover
	},
    amex:{
		name: 'American Express',
		icon: Amex
	},
	google:{
		name: 'Google Pay',
		icon: Google
	},
	apple:{
		name: 'Apple Pay',
		icon: Apple
	},
	sepa_debit:{
		name: 'Cuenta bancaria',
		icon: Sepa
	}
}
export default Paycard;