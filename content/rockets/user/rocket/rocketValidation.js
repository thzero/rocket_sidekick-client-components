import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketValidation = {
	// cgMeasurementUnitId: { $autoDirty: true },
	// cgMeasurementUnitsId: { $autoDirty: true },
	// cpMeasurementUnitId: { $autoDirty: true },
	// cpMeasurementUnitsId: { $autoDirty: true },
	// detailItemCg: {  decimal, between: between(0, 2004), $autoDirty: true }, // TODO: max of length
	// detailItemCgFrom: { minLength: minLength(3), maxLength: maxLength(50), $autoDirty: true },
	// detailItemCp: {  decimal, between: between(0, 2004), $autoDirty: true }, // TODO: max of length
	// detailItemCpFrom: { minLength: minLength(3), maxLength: maxLength(50), $autoDirty: true },
	// detailItemDescription: { $autoDirty: true },
	detailItemDiameterMajor: { required, decimal, between: between(0, 2004), $autoDirty: true },
	detailItemDiameterMinor: { decimal, between: between(0, 2004), $autoDirty: true },
	// detailItemLength: { required, decimal, between: between(0, 120), $autoDirty: true },
	detailItemManufacturer: { required, $autoDirty: true },
	detailItemManufacturerStockId: {
		minLength: minLength(3),
		maxLength: maxLength(14),
		$autoDirty: true
	},
	// detailItemName: {
	// 	required,
	// 	minLength: minLength(3),
	// 	maxLength: maxLength(50),
	// 	$autoDirty: true
	// },
	// detailItemWeight: { decimal, between: between(0, 2004), $autoDirty: true },
	detailItemRocketType: { $autoDirty: true },
	detailItemStages: { $autoDirty: true }
	// diameterMajorMeasurementUnitId: { $autoDirty: true },
	// diameterMajorMeasurementUnitsId: { $autoDirty: true },
	// diameterMinorMeasurementUnitId: { $autoDirty: true },
	// diameterMinorMeasurementUnitsId: { $autoDirty: true },
	// lengthMeasurementUnitId: { $autoDirty: true },
	// lengthMeasurementUnitsId: { $autoDirty: true },
	// weightMeasurementUnitId: { $autoDirty: true },
	// weightMeasurementUnitsId: { $autoDirty: true }
};
