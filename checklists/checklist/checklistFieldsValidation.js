import { maxLength, minLength, required } from '@vuelidate/validators';

export const useChecklistFieldsValidation = {
	innerItemDescription: {
		$autoDirty: true
	},
	innerItemName: {
		required,
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	}
};
