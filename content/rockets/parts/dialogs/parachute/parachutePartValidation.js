import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useParachutePartValidation = {
    detailItemCd: { decimal, between: between(0, 9), $autoDirty: true },
    detailItemDiameter: { required, decimal, between: between(0, 2004), $autoDirty: true },
    detailItemDiameterMeasurementUnitId: { $autoDirty: true },
    detailItemDiameterMeasurementUnitsId: { $autoDirty: true },
    detailItemLoadMax: { decimal, between: between(0, 2004), $autoDirty: true },
    detailItemLoadMaxMeasurementUnitId: { $autoDirty: true },
    detailItemLoadMaxMeasurementUnitsId: { $autoDirty: true },
    detailItemLoadMin: { decimal, between: between(0, 2004), $autoDirty: true },
    detailItemLoadMinMeasurementUnitId: { $autoDirty: true },
    detailItemLoadMinMeasurementUnitsId: { $autoDirty: true },
    detailItemThinMill: { $autoDirty: true }
};
