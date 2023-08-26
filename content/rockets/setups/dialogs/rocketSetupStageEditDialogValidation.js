import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketSetupStageEditDialogValidation = {
	detailItemCg: {  decimal, between: between(0, 2004), $autoDirty: true }, // TODO: max of length
	detailItemCgFrom: { minLength: minLength(3), maxLength: maxLength(50), $autoDirty: true },
	detailItemCgMeasurementUnitId: { $autoDirty: true },
	detailItemCgMeasurementUnitsId: { $autoDirty: true },
	detailItemWeight: { decimal, between: between(0, 2004), $autoDirty: true },
	detailItemWeightMeasurementUnitId: { $autoDirty: true },
	detailItemWeightMeasurementUnitsId: { $autoDirty: true }
};
