import { between, decimal } from '@vuelidate/validators';

export const useRecoveryRocketLookupDialogValidation = {
	detailItemDiameterMax: { decimal, between: between(0, 2004), $autoDirty: true },
	detailItemDiameterMin: { decimal, between: between(0, 2004), $autoDirty: true },
	detailItemDiameterMeasurementUnitId: { $autoDirty: true },
	detailItemDiameterMeasurementUnitsId: { $autoDirty: true },
	detailItemLengthMax: { decimal, between: between(0, 2004), $autoDirty: true },
	detailItemLengthMin: { decimal, between: between(0, 2004), $autoDirty: true },
};
