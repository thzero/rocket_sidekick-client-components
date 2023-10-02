import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export function useLocationEditValidation(nameRequired) { 
	const validation = {
		detailItemDescription: { $autoDirty: true },
		detailItemExperimental: { $autoDirty: true },
		detailItemIsPublic: { $autoDirty: true },
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
