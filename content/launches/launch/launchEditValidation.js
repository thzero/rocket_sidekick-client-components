import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export function useLaunchEditValidation(nameRequired) { 
	const validation = {
		detailItemDate: { 
			required,
			$autoDirty: true 
		},
		detailItemDescription: { $autoDirty: true },
		detailItemLocationName: { $autoDirty: true },
		detailItemLocationId: { 
			required,
			$autoDirty: true 
		},
		detailItemLocationIterationId: { 
			$autoDirty: true 
		},
		detailItemRocketId: { 
			required,
			$autoDirty: true 
		}
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
