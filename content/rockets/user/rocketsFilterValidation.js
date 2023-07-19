import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketsFilterValidation = {
	detailItemName: {
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	}
};
