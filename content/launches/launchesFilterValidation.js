import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useLaunchesFilterValidation = {
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
	filterItemRocket: { $autoDirty: true },
	filterItemRocketTypes: { $autoDirty: true }
};
