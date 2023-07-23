import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketEditDialogValidation = {
	detailItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
	diameterMeasurementUnitId: { $autoDirty: true },
	diameterMeasurementUnitsId: { $autoDirty: true }
};
