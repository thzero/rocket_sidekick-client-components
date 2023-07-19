import { between, decimal, maxLength, minLength, required, requiredUnless } from '@vuelidate/validators';

export const useChecklistsFilterValidation = {
	filterItemName: {
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	filterItemIsDefault: {
		filterItemIsDefaultUnless: requiredUnless((value, siblings) => { 
			return siblings.filterItemShared === true || siblings.filterItemYours === true; 
		}),
		$autoDirty: true
	},
	filterItemShared: {
		filterItemSharedUnless: requiredUnless((value, siblings) => { 
			return siblings.filterItemIsDefault === true || siblings.filterItemYours === true; 
		}),
		$autoDirty: true
	},
	filterItemYours: {
		filterItemYoursUnless: requiredUnless((value, siblings) => { 
			return siblings.filterItemIsDefault === true || siblings.filterItemShared === true; 
		}),
		$autoDirty: true
	}
};
