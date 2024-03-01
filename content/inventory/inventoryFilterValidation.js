import { between, decimal, helpers, maxLength, minLength, required, requiredUnless } from '@vuelidate/validators';

export const useInventoryFilterValidation = {
	filterItemPartTypes: { $autoDirty: true },
	filterItemDiameter: { 
		$autoDirty: true 
	},
	filterItemManufacturers: { 
		$autoDirty: true 
	},
	// filterItemMotor: {
	// 	requiredIfImpulseClass: requiredUnless(self.filterItemImpulseClass),
	// 	minLength: minLength(3),
	// 	validatorMotor,
	// 	$autoDirty: true
	// },
	filterItemMotorDiameter: { 
		$autoDirty: true 
	},
	filterItemMotorImpulseClass: { 
		$autoDirty: true 
	},
	filterItemMotorSingleUse: { 
		$autoDirty: true 
	},
	filterItemMotorSparky: { 
		$autoDirty: true 
	}
};
