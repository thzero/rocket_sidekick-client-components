import { between, decimal } from '@vuelidate/validators';

export const useLocationLookupDialogValidation = {
	filterIteOrganizations: { $autoDirty: true },
	filterItemRocketTypes: { $autoDirty: true }
};
