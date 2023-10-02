import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useLocationEditDialogValidation = { 
	detailItemExperimental: { $autoDirty: true },
	detailItemNumber: { between: between(0, 9999), $autoDirty: true },
	detailItemOrganizations: { $autoDirty: true },
	detailItemRocketTypes: { $autoDirty: true },
	detailItemYear: { between: between(1960, 2100), $autoDirty: true }
};
