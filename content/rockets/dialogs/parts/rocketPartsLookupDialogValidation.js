import { between, decimal } from '@vuelidate/validators';

export const useRocketPartsLookupDialogValidation = {
	filterItemDiameterMax: { decimal, between: between(0, 2004), $autoDirty: true },
	filterItemDiameterMin: { decimal, between: between(0, 2004), $autoDirty: true },
	filterItemDiameterMeasurementUnitId: { $autoDirty: true },
	filterItemDiameterMeasurementUnitsId: { $autoDirty: true },
	filterItemLengthMax: { decimal, between: between(0, 2004), $autoDirty: true },
	filterItemLengthMin: { decimal, between: between(0, 2004), $autoDirty: true },
	filterItemRocketTypes: { $autoDirty: true }
};
