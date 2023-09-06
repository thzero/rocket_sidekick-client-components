import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketStageEditDialogValidation = {
	detailItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
	detailItemDiameterMeasurementUnitId: { $autoDirty: true },
	detailItemDiameterMeasurementUnitsId: { $autoDirty: true },
	detailItemMotorDiameter: { $autoDirty: true }
};
