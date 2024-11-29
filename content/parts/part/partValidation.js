import { between, decimal, helpers, maxLength, minLength, required } from '@vuelidate/validators';

export const usePartValidation = {
	detailItemName: {
		required,
		characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	detailItemDescription: { 
		characters: helpers.withMessage('Invalid characters', helpers.regex(/^[!@#$%^&*()_\-\+=\[\]{}|\\:;"'<>,.?\/a-zA-Z0-9 (\r|\n)*$/)]*$/)),
		maxLength: maxLength(300),
		$autoDirty: true 
	},
	detailItemIsPublic: { $autoDirty: true },
	detailItemManufacturer: { required, $autoDirty: true },
	detailItemManufacturerStockId: {
		minLength: minLength(3),
		maxLength: maxLength(14),
		$autoDirty: true
	},
	detailItemWeight: { decimal, between: between(0, 2004), $autoDirty: true },
	weightMeasurementUnitId: { $autoDirty: true },
	weightMeasurementUnitsId: { $autoDirty: true }
};
