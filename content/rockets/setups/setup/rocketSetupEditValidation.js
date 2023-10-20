import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export function useRocketSetupEditValidation(nameRequired) { 
	const validation = {
		detailItemDescription: { $autoDirty: true },
		detailItemNotes: {
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
