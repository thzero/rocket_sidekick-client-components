import { maxLength, minLength, required } from '@vuelidate/validators';

export const usePartCopyDialogValidation = {
	name: {
		required,
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	}
};
