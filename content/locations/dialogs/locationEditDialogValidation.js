import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useLocationEditDialogValidation = { 
	detailItemExperimental: { $autoDirty: true },
	detailItemNumber: { $autoDirty: true },
	detailItemOrganizations: { $autoDirty: true },
	detailItemRocketTypes: { $autoDirty: true },
	detailItemYear: { $autoDirty: true }
};
