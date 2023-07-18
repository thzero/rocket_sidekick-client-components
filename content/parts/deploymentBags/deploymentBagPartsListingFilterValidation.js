import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useDeploymentBagPartsListingFilterValidation = {
	detailItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
	detailItemLength: { decimal, between: between(0, 2004), $autoDirty: true },
	detailItemPilotChute: { $autoDirty: true },
	diameterMeasurementUnitId: { $autoDirty: true },
	diameterMeasurementUnitsId: { $autoDirty: true },
	lengthMeasurementUnitId: { $autoDirty: true },
	lengthMeasurementUnitsId: { $autoDirty: true }
};
