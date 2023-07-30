import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export function useRocketEditValidation(nameRequired) { 
	const validation = {
		detailItemAltimeters: { $autoDirty: true },
		detailItemCg: {  decimal, between: between(0, 2004), $autoDirty: true }, // TODO: max of length
		detailItemCgFrom: { minLength: minLength(3), maxLength: maxLength(50), $autoDirty: true },
		detailItemCgMeasurementUnitId: { $autoDirty: true },
		detailItemCgMeasurementUnitsId: { $autoDirty: true },
		detailItemCp: {  decimal, between: between(0, 2004), $autoDirty: true }, // TODO: max of length
		detailItemCpFrom: { minLength: minLength(3), maxLength: maxLength(50), $autoDirty: true },
		detailItemCpMeasurementUnitId: { $autoDirty: true },
		detailItemCpMeasurementUnitsId: { $autoDirty: true },
		detailItemDescription: { $autoDirty: true },
		detailItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
		detailItemDiameterMeasurementUnitId: { $autoDirty: true },
		detailItemDiameterMeasurementUnitsId: { $autoDirty: true },
		detailItemLength: { required, decimal, between: between(0, 120), $autoDirty: true },
		detailItemLengthMeasurementUnitId: { $autoDirty: true },
		detailItemLengthMeasurementUnitsId: { $autoDirty: true },
		detailItemRecovery: { $autoDirty: true },
		detailItemTracking: { $autoDirty: true },
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
