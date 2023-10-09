import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useLaunchesFilterValidation = {
	filterItemLocationId: { 
		required,
		$autoDirty: true 
	},
	filterItemName: {
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	filterItemLocationId: { 
		$autoDirty: true 
	},
	filterItemOrganizations: { $autoDirty: true },
	filterItemRocketId: { 
		$autoDirty: true 
	},
	filterItemRocketTypes: { $autoDirty: true }
};
