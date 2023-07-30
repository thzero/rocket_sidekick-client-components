import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useChuteProtectorPartValidation = {
    detailItemCd: { decimal, between: between(0, 9), $autoDirty: true },
    detailItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
    detailItemDiameterMeasurementUnitId: { $autoDirty: true },
    detailItemDiameterMeasurementUnitsId: { $autoDirty: true },
    detailItemDimension: { required, decimal, between: between(0, 2004), $autoDirty: true },
    detailItemDimensionMeasurementUnitId: { $autoDirty: true },
    detailItemDimensionMeasurementUnitsId: { $autoDirty: true }
};
