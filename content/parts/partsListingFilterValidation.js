import { between, decimal, helpers, maxLength, minLength, required } from '@vuelidate/validators';

export const usePartsListingFilterValidation = {
	filterItemName: {
		characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
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
