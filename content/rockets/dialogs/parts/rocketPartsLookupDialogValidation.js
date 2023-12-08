import { between, decimal, helpers, minLength, maxLength, required, requiredIf, requiredUnless } from '@vuelidate/validators';

export function useRocketPartsLookupDialogValidation(self) {
	return {
		filterItemDiameterMax: { decimal, between: between(0, 2004), $autoDirty: true },
		filterItemDiameterMin: { decimal, between: between(0, 2004), $autoDirty: true },
		filterItemDiameterMeasurementUnitId: { $autoDirty: true },
		filterItemDiameterMeasurementUnitsId: { $autoDirty: true },
		filterItemLengthMax: { decimal, between: between(0, 2004), $autoDirty: true },
		filterItemLengthMin: { decimal, between: between(0, 2004), $autoDirty: true },
		filterItemLengthMeasurementUnitId: { $autoDirty: true },
		filterItemLengthMeasurementUnitsId: { $autoDirty: true },
		filterItemRocketTypes: { $autoDirty: true },
		filterItemManufacturers: { $autoDirty: true },
		filterItemManufacturerStockId: { $autoDirty: true },
		filterItemMotorImpulseClass: {
			requiredIfIsMotors: requiredIf((value, siblings) => { 
				return self.validationIsMotors && !self.filterItemName;
			}),
			$autoDirty: true
		},
		filterItemMotorDiameter: { $autoDirty: true },
		filterItemName: {
			requiredIfIsName: requiredIf((value, siblings) => { 
				return self.validationIsMotors && !self.filterItemMotorImpulseClass;
			}),
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\/\(\\+)@]*)*$/)),
			minLength: minLength(3),
			maxLength: maxLength(50),
			$autoDirty: true
		},
		// validationIsMotors: { $autoDirty: true }
	}
};
