import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useChuteProtectorPartsListingFilterValidation = {
	filterItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
	filterItemDimension: { decimal, between: between(0, 2004), $autoDirty: true }
};
