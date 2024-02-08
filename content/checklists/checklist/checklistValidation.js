import { helpers, maxLength, minLength, required, requiredIf } from '@vuelidate/validators';

export function useChecklistValidation(self) { 
	const validation = {
		detailItemName: {
			required,
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
			minLength: minLength(3),
			maxLength: maxLength(50),
			$autoDirty: true
		},
		detailItemDate: { 
			required,
			$autoDirty: true 
		},
		detailItemDescription: { 
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[!@#$%^&*()_\-\+=\[\]{}|\\:;"'<>,.?\/a-zA-Z0-9 (\r|\n)*$/)]*$/)),
			$autoDirty: true 
		},
		detailItemLocationId: { 
			$autoDirty: true 
		},
		detailItemLocationName: {
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
			$autoDirty: true
		},
		detailItemLocationIterationId: { 
			$autoDirty: true 
		},
		detailItemReorder: { $autoDirty: true },
		detailItemRocketId: { 
			$autoDirty: true 
		},
		detailItemRocketSetupId: {
			// requiredIfRocket: requiredIf((value, siblings) => { 
			// 	return self.detailItemRocketId;
			// }),
			$autoDirty: true 
		},
	};
	return validation;
};
