import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const usePartsListingFilterValidation = {
	detailItemName: {
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	detailItemIsPublic: { $autoDirty: true },
	detailItemManufacturers: { $autoDirty: true },
	detailItemManufacturerStockId: {
		minLength: minLength(3),
		maxLength: maxLength(14),
		$autoDirty: true
	},
	detailItemWeight: { decimal, between: between(0, 2004), $autoDirty: true },
	weightMeasurementUnitId: { $autoDirty: true },
	weightMeasurementUnitsId: { $autoDirty: true }
};
