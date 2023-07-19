import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useDeploymentBagPartsListingFilterValidation = {
	filterItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
	filterItemLength: { decimal, between: between(0, 2004), $autoDirty: true },
	filterItemPilotChute: { $autoDirty: true },
	diameterMeasurementUnitId: { $autoDirty: true },
	diameterMeasurementUnitsId: { $autoDirty: true },
	lengthMeasurementUnitId: { $autoDirty: true },
	lengthMeasurementUnitsId: { $autoDirty: true }
};
