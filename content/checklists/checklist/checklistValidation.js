import { maxLength, minLength, required } from '@vuelidate/validators';

export const useChecklistValidation = {
	detailItemName: {
		required,
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	detailItemDescription: { $autoDirty: true },
	detailItemReorder: { $autoDirty: true }
};
