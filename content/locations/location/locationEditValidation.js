import { between, decimal, helpers, maxLength, minLength, required } from '@vuelidate/validators';

export function useLocationEditValidation(nameRequired) { 
	const validation = {
		detailItemDescription: { 
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[!@#$%^&*()_\-\+=\[\]{}|\\:;"'<>,.?\/a-zA-Z0-9 (\r|\n)*$/)]*$/)),
			$autoDirty: true 
		},
		detailItemExperimental: { $autoDirty: true },
		detailItemIsPublic: { $autoDirty: true },
		detailItemLink: {
			maxLength: maxLength(100),
			$autoDirty: true
		},
		detailItemOrganizations: { $autoDirty: true },
		detailItemRocketTypes: { $autoDirty: true }
	};
	validation['detailItemName'] =  (nameRequired === true ?
		{
			required,
			minLength: minLength(3),
			maxLength: maxLength(50),
			$autoDirty: true
		}
	:
		validation['detailItemName'] = {
			minLength: minLength(3),
			maxLength: maxLength(50),
			$autoDirty: true
		}
	);
	return validation;
}
