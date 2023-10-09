import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useLocationsFilterValidation = {
	filterItemName: {
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	filterItemOrganizations: { $autoDirty: true },
	filterItemRocketTypes: { $autoDirty: true }
};
