import { between, decimal, helpers, maxLength, minLength, requiredUnless } from '@vuelidate/validators';

const validatorMotor = helpers.regex(/^[a-zA-Z0-9-']{3}/, /\d/);

export function useMotorLookupDialogValidation(self) {
	return {
		filterItemDiameter: { 
			$autoDirty: true 
		},
		filterItemImpulseClass: { 
			requiredIfMotor: requiredUnless(self.filterItemMotor), 
			$autoDirty: true 
		},
		filterItemManufacturers: { 
			$autoDirty: true 
		},
		filterItemMotor: {
			requiredIfImpulseClass: requiredUnless(self.filterItemImpulseClass),
			minLength: minLength(3),
			validatorMotor,
			$autoDirty: true
		},
		filterItemSingleUse: { 
			$autoDirty: true 
		},
		filterItemSparky: { 
			$autoDirty: true 
		}
	};
};