import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketSetupsFilterValidation = {
	filterItemName: {
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	rocketId: {
		$autoDirty: true
	}
};
