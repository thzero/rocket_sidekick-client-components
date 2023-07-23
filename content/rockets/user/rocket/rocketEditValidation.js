import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketEditValidation = {
	cgMeasurementUnitId: { $autoDirty: true },
	cgMeasurementUnitsId: { $autoDirty: true },
	cpMeasurementUnitId: { $autoDirty: true },
	cpMeasurementUnitsId: { $autoDirty: true },
	detailItemCg: {  decimal, between: between(0, 2004), $autoDirty: true }, // TODO: max of length
	detailItemCgFrom: { minLength: minLength(3), maxLength: maxLength(50), $autoDirty: true },
	detailItemCp: {  decimal, between: between(0, 2004), $autoDirty: true }, // TODO: max of length
	detailItemCpFrom: { minLength: minLength(3), maxLength: maxLength(50), $autoDirty: true },
	detailItemDescription: { $autoDirty: true },
	detailItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
	detailItemLength: { required, decimal, between: between(0, 120), $autoDirty: true },
	detailItemName: {
		required,
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	detailItemWeight: { decimal, between: between(0, 2004), $autoDirty: true },
	diameterMeasurementUnitId: { $autoDirty: true },
	diameterMeasurementUnitsId: { $autoDirty: true },
	lengthMeasurementUnitId: { $autoDirty: true },
	lengthMeasurementUnitsId: { $autoDirty: true },
	weightMeasurementUnitId: { $autoDirty: true },
	weightMeasurementUnitsId: { $autoDirty: true }
};
