import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useAltimeterRocketPartValidation = {
	detailItemApogeeDelay: { decimal, between: between(0, 999), $autoDirty: true },
	detailItemMainAltitude: { decimal, between: between(0, 999999), $autoDirty: true },
	detailItemMainAltitudeMeasurementUnitId: { $autoDirty: true },
	detailItemMainAltitudeMeasurementUnitsId: { $autoDirty: true },
	detailItemMotorDelay: { decimal, between: between(0, 999), $autoDirty: true }
};
