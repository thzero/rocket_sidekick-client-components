import { between, decimal, helpers, maxLength, minLength, required } from '@vuelidate/validators';

export const useLaunchesFilterValidation = {
	filterItemLocationId: { 
		required,
		$autoDirty: true 
	},
	filterItemName: {
		characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
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
