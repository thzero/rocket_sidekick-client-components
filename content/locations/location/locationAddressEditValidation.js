import { between, decimal, helpers, maxLength, minLength, required } from '@vuelidate/validators';

const validatorPostalCode = helpers.regex(/^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]{0,6}$/);

export const useLocationAddressEditValidation = {
	detailItemAddressCity: { $autoDirty: true },
	detailItemAddressCountry: { $autoDirty: true },
	detailItemAddressPostalCode: { 
		$autoDirty: true,
		minLength: minLength(2),
        maxLength: maxLength(16),
		validatorPostalCode
	},
	detailItemAddressStateProvince: { $autoDirty: true }
};
