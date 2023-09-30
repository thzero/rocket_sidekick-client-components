import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useLocationAddressEditValidation = {
	detailItemAddressCity: { $autoDirty: true },
	detailItemAddressCountry: { $autoDirty: true },
	detailItemAddressPostalCode: { $autoDirty: true },
	detailItemAddressStateProvince: { $autoDirty: true }
};
