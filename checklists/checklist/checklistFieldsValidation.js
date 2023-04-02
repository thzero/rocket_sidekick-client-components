import { maxLength, minLength, required } from '@vuelidate/validators';

export const useChecklistFieldsValidation = {
	name: {
		required,
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	}
};
