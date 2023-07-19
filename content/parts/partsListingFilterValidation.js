import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const usePartsListingFilterValidation = {
	filterItemName: {
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	filterItemIsPublic: { $autoDirty: true },
	filterItemManufacturers: { $autoDirty: true },
	filterItemManufacturerStockId: {
		minLength: minLength(3),
		maxLength: maxLength(14),
		$autoDirty: true
	},
	filterItemWeight: { decimal, between: between(0, 2004), $autoDirty: true },
	weightMeasurementUnitId: { $autoDirty: true },
	weightMeasurementUnitsId: { $autoDirty: true }
};
