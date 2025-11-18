import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketStageEditDialogValidation = {
	detailItemDiameterMajor: { required, decimal, between: between(0, 2004), $autoDirty: true },
	detailItemDiameterMajorMeasurementUnitId: { required, $autoDirty: true },
	detailItemDiameterMajorMeasurementUnitsId: { required, $autoDirty: true },
	detailItemEjectionDrogue: { decimal, between: between(0, 50), $autoDirty: true },
	detailItemEjectionDrogueMeasurementUnitId: { $autoDirty: true },
	detailItemEjectionDrogueMeasurementUnitsId: { $autoDirty: true },
	detailItemEjectionDrogueBackup: { decimal, between: between(0, 50), $autoDirty: true },
	detailItemEjectionDrogueBackupMeasurementUnitId: { $autoDirty: true },
	detailItemEjectionDrogueBackupMeasurementUnitsId: { $autoDirty: true },
	detailItemEjectionMain: { decimal, between: between(0, 50), $autoDirty: true },
	detailItemEjectionMainMeasurementUnitId: { $autoDirty: true },
	detailItemEjectionMainMeasurementUnitsId: { $autoDirty: true },
	detailItemEjectionMainBackup: { decimal, between: between(0, 50), $autoDirty: true },
	detailItemEjectionMainBackupMeasurementUnitId: { $autoDirty: true },
	detailItemEjectionMainBackupMeasurementUnitsId: { $autoDirty: true },
	detailItemMotorCount0: { required, between: between(1, 9) ,$autoDirty: true },
	detailItemMotorCount1: { between: between(0, 9), $autoDirty: true },
	detailItemMotorCount2: { between: between(0, 9), $autoDirty: true },
	detailItemMotorDiameter0: { required, $autoDirty: true },
	detailItemMotorDiameter1: { $autoDirty: true },
	detailItemMotorDiameter2: { $autoDirty: true }
};
