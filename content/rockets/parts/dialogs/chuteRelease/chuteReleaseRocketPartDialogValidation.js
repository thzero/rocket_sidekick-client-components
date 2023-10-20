import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useChuteReleaseRocketPartValidation = {
	detailItemAltitude: { decimal, between: between(0, 999999), $autoDirty: true },
	detailItemAltitudeMeasurementUnitId: { $autoDirty: true },
	detailItemAltitudeMeasurementUnitsId: { $autoDirty: true }
};
