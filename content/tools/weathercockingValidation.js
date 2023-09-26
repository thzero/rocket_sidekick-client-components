import { between, decimal, helpers, maxLength, minLength, required } from '@vuelidate/validators';

export const useWeatherCockingValidation = {
	exitVelocity: { required, decimal, between: between(0.1, 999), $autoDirty: true },
	// exitVelocityMeasurementUnitsId: { required, $autoDirty: true },
	exitVelocityMeasurementUnitId: { required, $autoDirty: true },
	windVelocity: { required, decimal, between: between(0.1, 999), $autoDirty: true },
	windVelocityMeasurementUnitsId: { required, $autoDirty: true },
	windVelocityMeasurementUnitId: { required, $autoDirty: true }
};
