import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useParachuteRocketPartValidation = {
	detailItemReefed: { $autoDirty: true },
	detailItemReefedLength: { decimal, between: between(0, 999999), $autoDirty: true },
	detailItemReefedLengthMeasurementUnitId: { $autoDirty: true },
	detailItemReefedLengthMeasurementUnitsId: { $autoDirty: true }
};
