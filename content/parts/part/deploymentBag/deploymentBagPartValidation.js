import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useDeploymentBagPartValidation = {
    detailItemDiameter: { required, decimal, between: between(0, 2004), $autoDirty: true },
    detailItemDiameterMeasurementUnitId: { $autoDirty: true },
    detailItemDiameterMeasurementUnitsId: { $autoDirty: true },
    detailItemLength: { required, decimal, between: between(0, 120), $autoDirty: true },
    detailItemLengthMeasurementUnitId: { $autoDirty: true },
    detailItemLengthMeasurementUnitsId: { $autoDirty: true },
    detailItemPilotChute: { $autoDirty: true },
    detailItemPilotChuteCd: { decimal, between: between(0, 9), $autoDirty: true },
    detailItemPilotChuteDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
    detailItemPilotChuteDiameterMeasurementUnitId: { $autoDirty: true },
    detailItemPilotChuteMeasurementUnitsId: { $autoDirty: true }
};
