import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useDeploymentBagPartValidation = {
    detailItemDiameter: { required, decimal, between: between(0, 2004), $autoDirty: true },
    detailItemLength: { required, decimal, between: between(0, 120), $autoDirty: true },
    detailItemPilotChute: { $autoDirty: true },
    detailItemPilotChuteCd: { decimal, between: between(0, 9), $autoDirty: true },
    detailItemPilotChuteDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
    diameterMeasurementUnitId: { $autoDirty: true },
    diameterMeasurementUnitsId: { $autoDirty: true },
    lengthMeasurementUnitId: { $autoDirty: true },
    lengthMeasurementUnitsId: { $autoDirty: true },
    pilotChuteDiameterMeasurementUnitId: { $autoDirty: true },
    pilotChuteDiameterMeasurementUnitsId: { $autoDirty: true }
};
