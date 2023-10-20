import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketValidation = {
	detailItemAltimeters: { $autoDirty: true },
	// detailItemDiameterMajor: { required, decimal, between: between(0, 2004), $autoDirty: true },
	// detailItemDiameterMinor: { decimal, between: between(0, 2004), $autoDirty: true },
	detailItemManufacturer: { required, $autoDirty: true },
	detailItemManufacturerStockId: {
		minLength: minLength(3),
		maxLength: maxLength(14),
		$autoDirty: true
	},
	detailItemRocketType: { $autoDirty: true },
	detailItemRecovery: { $autoDirty: true },
	detailItemStages: { $autoDirty: true },
	detailItemTrackers: { $autoDirty: true }
};
