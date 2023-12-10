import { between, decimal, helpers, maxLength, minLength, required, requiredIf, requiredUnless } from '@vuelidate/validators';

import LibraryClientUtility from '@thzero/library_client/utility/index';

const spillHoleCheck = (value, initial) => {
	if (!value)
		return true;
	return String.isNullOrEmpty(initial);
}
const spillHoleCheckDiameter = (value, siblings, vm) => {
	return spillHoleCheck(value, siblings.spillHolePct);
}
const spillHoleCheckPct = (value, siblings, vm) => {
	return spillHoleCheck(value, siblings.spillHoleDiameter);
}

export function useParachuteSizingValidation(self) {
	return {
		airDensity: { required, decimal, between: between(0.01, 5), $autoDirty: true },
		airDensityMeasurementUnitId: { required, $autoDirty: true },
		airDensityMeasurementUnitsId: { required, $autoDirty: true },
		coeffDrag: { required, decimal, between: between(0.1, 5), $autoDirty: true },
		desiredVelocity: {
			requiredIfDiameter: requiredIf(self.calculationType === 'diameter'),
			decimal, between: between(0.1, 999), $autoDirty: true 
		},
		desiredVelocityMeasurementUnitId: { 
			requiredIfDiameter: requiredIf(self.calculationType === 'diameter'),
			$autoDirty: true 
		},
		desiredVelocityMeasurementUnitsId: { 
			requiredIfDiameter: requiredIf(self.calculationType === 'diameter'),
			$autoDirty: true 
		},
		diameterLengthMeasurementUnitId: { required, $autoDirty: true },
		diameterLengthMeasurementUnitsId: { required, $autoDirty: true },
		mass: { required, decimal, between: between(0.1, 999), $autoDirty: true },
		massWeightMeasurementUnitId: { required, $autoDirty: true },
		parachuteDiameter: { 
			requiredIfDiameter: requiredIf(self.calculationType === 'velocity'),
			between: between(0.1, 999),
			$autoDirty: true 
		},
		parachuteShape: { required, $autoDirty: true },
		massWeightMeasurementUnitsId: { required, $autoDirty: true },
		// spillHoleDiameter: { decimal, between: between(0, 100), $autoDirty: true },
		spillHoleDiameter: {
			// requiredUnlessSpillHolePct: requiredUnless(self.spillHolePct),
			spillHoleCheckDiameter: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.parachuteSizing.spillHole'), spillHoleCheckDiameter),
			$autoDirty: true
		},
		// spillHoleShape: { required, $autoDirty: true },
		spillHoleShape: {
			requiredIfSphillHoleDiameter: requiredIf(self.spillHoleDiameter),
			requiredIfSpillHolePct: requiredIf(self.spillHolePct),
			required,
			$autoDirty: true
		},
		// spillHolePct: { decimal, between: between(0, 100), $autoDirty: true }
		spillHolePct: {
			// requiredUnlessSpillHoleDiameter: requiredUnless(self.spillHoleDiameter),
			spillHoleCheckPct: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.parachuteSizing.spillHole'), spillHoleCheckPct),
			$autoDirty: true
		}
	};
}
