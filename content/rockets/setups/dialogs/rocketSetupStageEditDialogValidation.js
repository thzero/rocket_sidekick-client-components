import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketSetupStageEditDialogValidation = {
	detailItemCg: {  decimal, between: between(0, 2004), $autoDirty: true }, // TODO: max of length
	detailItemCgFrom: { minLength: minLength(3), maxLength: maxLength(50), $autoDirty: true },
	detailItemCgMeasurementUnitId: { $autoDirty: true },
	detailItemCgMeasurementUnitsId: { $autoDirty: true },
	detailItemMotorCaseId0: { $autoDirty: true },
	detailItemMotorCaseId1: { $autoDirty: true },
	detailItemMotorCaseId2: { $autoDirty: true },
	detailItemMotorDelay0: { $autoDirty: true },
	detailItemMotorDelay1: { $autoDirty: true },
	detailItemMotorDelay2: { $autoDirty: true },
	detailItemMotorDiameter0: { $autoDirty: true },
	detailItemMotorDiameter1: { $autoDirty: true },
	detailItemMotorDiameter2: { $autoDirty: true },
	detailItemMotorId0: { $autoDirty: true },
	detailItemMotorId1: { $autoDirty: true },
	detailItemMotorId2: { $autoDirty: true },
	detailItemWeight: { decimal, between: between(0, 2004), $autoDirty: true },
	detailItemWeightMeasurementUnitId: { $autoDirty: true },
	detailItemWeightMeasurementUnitsId: { $autoDirty: true }
};
