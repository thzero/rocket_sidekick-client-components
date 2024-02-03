import { between, decimal, helpers, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketsFilterValidation = {
	filterItemManufacturers: { $autoDirty: true },
	filterItemManufacturerStockId: {
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	filterItemName: {
		characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	filterItemRocketTypes: { $autoDirty: true },
	// requestedUserId: {
	// 	characters: helpers.withMessage('Invalid characters', helpers.regex(/^([_\-a-zA-Z0-9]*)*$/)),
	// 	minLength: minLength(3),
	// 	maxLength: maxLength(12),
	// 	$autoDirty: true
	// }
};
