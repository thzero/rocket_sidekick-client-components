import { between, decimal, helpers, maxLength, minLength, required } from '@vuelidate/validators';

export function useRocketSetupEditValidation(nameRequired) { 
	const validation = {
		detailItemDescription: { 
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[!@#$%^&*()_\-\+=\[\]{}|\\:;"'<>,.?\/a-zA-Z0-9 (\r|\n)*$/)]*$/)),
			$autoDirty: true 
		},
		detailItemNotes: {
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[!@#$%^&*()_\-\+=\[\]{}|\\:;"'<>,.?\/a-zA-Z0-9 (\r|\n)*$/)]*$/)),
			maxLength: maxLength(1000),
			$autoDirty: true
		},
		detailItemRocketId: { 
			required,
			$autoDirty: true 
		},
		detailItemType: { 
			required,
			$autoDirty: true 
		},
		detailItemWeight: { decimal, between: between(0, 2004), $autoDirty: true },
		detailItemWeightMeasurementUnitId: { $autoDirty: true },
		detailItemWeightMeasurementUnitsId: { $autoDirty: true }
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
