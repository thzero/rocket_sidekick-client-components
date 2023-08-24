import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketsFilterValidation = {
	filterItemManufacturers: { $autoDirty: true },
	filterItemManufacturerStockId: {
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	filterItemName: {
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	filterItemRocketTypes: { $autoDirty: true }
};
