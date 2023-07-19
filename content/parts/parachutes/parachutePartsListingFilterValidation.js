import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useParachutePartsListingFilterValidation = {
	filterItemCd: { decimal, between: between(0, 9), $autoDirty: true },
	filterItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
	filterItemLoadMax: { decimal, between: between(0, 2004), $autoDirty: true },
	filterItemLoadMin: { decimal, between: between(0, 2004), $autoDirty: true },
	filterItemThinMill: { $autoDirty: true },
	diameterMeasurementUnitId: { $autoDirty: true },
	diameterMeasurementUnitsId: { $autoDirty: true }
};
