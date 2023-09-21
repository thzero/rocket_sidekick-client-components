import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useParachuteSizingValidation = {
	airDensity: { required, decimal, between: between(0.01, 5), $autoDirty: true },
	airDensityMeasurementUnitId: { required, $autoDirty: true },
	airDensityMeasurementUnitsId: { required, $autoDirty: true },
	coeffDrag: { required, decimal, between: between(0.1, 5), $autoDirty: true },
	desiredVelocity: { required, decimal, between: between(0.1, 999), $autoDirty: true },
	desiredVelocityMeasurementUnitId: { required, $autoDirty: true },
	desiredVelocityMeasurementUnitsId: { required, $autoDirty: true },
	diameterLengthMeasurementUnitId: { required, $autoDirty: true },
	diameterLengthMeasurementUnitsId: { required, $autoDirty: true },
	mass: { required, decimal, between: between(0.1, 999), $autoDirty: true },
	massWeightMeasurementUnitId: { required, $autoDirty: true },
	parachuteShape: { required, $autoDirty: true },
	massWeightMeasurementUnitsId: { required, $autoDirty: true },
	spillHoleDiameter: { decimal, between: between(0, 100), $autoDirty: true },
	spillHoleShape: { required, $autoDirty: true },
	spillHolePct: { decimal, between: between(0, 100), $autoDirty: true }
};
