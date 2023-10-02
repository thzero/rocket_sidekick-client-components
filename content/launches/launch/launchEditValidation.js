import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export function useLaunchEditValidation(nameRequired) { 
	const validation = {
		detailItemDescription: { $autoDirty: true },
		detailItemRocket: { $autoDirty: true }
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
