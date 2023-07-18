import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useChuteProtectorPartsListingFilterValidation = {
	detailItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
	detailItemDimension: { decimal, between: between(0, 2004), $autoDirty: true }
};
