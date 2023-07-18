import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useChuteProtectorPartValidation = {
    detailItemCd: { decimal, between: between(0, 9), $autoDirty: true },
    detailItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
    detailItemDimension: { required, decimal, between: between(0, 2004), $autoDirty: true },
    diameterMeasurementUnitId: { $autoDirty: true },
    diameterMeasurementUnitsId: { $autoDirty: true },
    dimensionMeasurementUnitId: { $autoDirty: true },
    dimensionMeasurementUnitsId: { $autoDirty: true }
};
