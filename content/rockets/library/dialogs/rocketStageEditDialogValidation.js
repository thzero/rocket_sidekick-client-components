import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketStageEditDialogValidation = {
	detailItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
	detailItemDiameterMeasurementUnitId: { $autoDirty: true },
	detailItemDiameterMeasurementUnitsId: { $autoDirty: true },
	detailItemMotorCount0: { required, between: between(1, 9), $autoDirty: true },
	detailItemMotorCount1: { between: between(0, 9), $autoDirty: true },
	detailItemMotorCount2: { between: between(0, 9), $autoDirty: true },
	detailItemMotorDiameter0: { required, $autoDirty: true },
	detailItemMotorDiameter1: { $autoDirty: true },
	detailItemMotorDiameter2: { $autoDirty: true }
};
