import { between, decimal, helpers, maxLength, minLength, required } from '@vuelidate/validators';

export function useRocketEditValidation(nameRequired) { 
	const validation = {
		detailItemCg: {  decimal, between: between(0, 2004), $autoDirty: true }, // TODO: max of length
		detailItemCgFrom: { minLength: minLength(3), maxLength: maxLength(50), $autoDirty: true },
		detailItemCgMeasurementUnitId: { $autoDirty: true },
		detailItemCgMeasurementUnitsId: { $autoDirty: true },
		detailItemCp: {  decimal, between: between(0, 2004), $autoDirty: true }, // TODO: max of length
		detailItemCpFrom: { minLength: minLength(3), maxLength: maxLength(50), $autoDirty: true },
		detailItemCpMeasurementUnitId: { $autoDirty: true },
		detailItemCpMeasurementUnitsId: { $autoDirty: true },
		detailItemDescription: { 
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[!@#$%^&*()_\-\+=\[\]{}|\\:;"'<>,.?\/a-zA-Z0-9 (\r|\n)*$/)]*$/)),
			$autoDirty: true 
		},
		detailItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
		detailItemDiameterMeasurementUnitId: { $autoDirty: true },
		detailItemDiameterMeasurementUnitsId: { $autoDirty: true },
		detailItemLength: { decimal, between: between(0, 120), $autoDirty: true },
		detailItemLengthMeasurementUnitId: { $autoDirty: true },
		detailItemLengthMeasurementUnitsId: { $autoDirty: true },
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
