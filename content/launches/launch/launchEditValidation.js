import { between, decimal, helpers, maxLength, minLength, required } from '@vuelidate/validators';

export function useLaunchEditValidation(nameRequired) { 
	const validation = {
		detailItemDate: { 
			required,
			$autoDirty: true 
		},
		detailItemDescription: { 
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[!@#$%^&*()_\-\+=\[\]{}|\\:;"'<>,.?\/a-zA-Z0-9 (\r|\n)*$/)]*$/)),
			$autoDirty: true 
		},
		detailItemFailureReasons: { $autoDirty: true },
		detailItemLocationName: {
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
			$autoDirty: true
		},
		detailItemLocationId: { 
			required,
			$autoDirty: true 
		},
		detailItemLocationIterationId: { 
			$autoDirty: true 
		},
		detailItemNotes: {
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[!@#$%^&*()_\-\+=\[\]{}|\\:;"'<>,.?\/a-zA-Z0-9 (\r|\n)*$/)]*$/)),
			maxLength: maxLength(1000),
			$autoDirty: true
		},
		detailItemResultsAccelerationMax: { $autoDirty: true },
		detailItemResultsAccelerationMaxMeasurementUnitId: { $autoDirty: true },
		detailItemResultsAccelerationMaxMeasurementUnitsId: { $autoDirty: true },
		detailItemResultsAltitudeMax: { $autoDirty: true },
		detailItemResultsAltitudeMaxMeasurementUnitId: { $autoDirty: true },
		detailItemResultsAltitudeMaxMeasurementUnitsId: { $autoDirty: true },
		detailItemResultsAltitudeDeployDrogue: { $autoDirty: true },
		detailItemResultsAltitudeDeployDrogueMeasurementUnitId: { $autoDirty: true },
		detailItemResultsAltitudeDeployDrogueMeasurementUnitsId: { $autoDirty: true },
		detailItemResultsAltitudeDeployMMain: { $autoDirty: true },
		detailItemResultsAltitudeDeployMMainMeasurementUnitId: { $autoDirty: true },
		detailItemResultsAltitudeDeployMMainMeasurementUnitsId: { $autoDirty: true },
		detailItemResultsCoordsLatLaunch: { $autoDirty: true },
		detailItemResultsCoordsLongLaunch: { $autoDirty: true },
		detailItemResultsCoordsLatRecovery: { $autoDirty: true },
		detailItemResultsCoordsLongRecovery: { $autoDirty: true },
		detailItemResultsVelocityMax: { $autoDirty: true },
		detailItemResultsVelocityMaxMeasurementUnitId: { $autoDirty: true },
		detailItemResultsVelocityMaxMeasurementUnitsId: { $autoDirty: true },
		detailItemResultsVelocityRecovery: { $autoDirty: true },
		detailItemVelocityRecoveryMeasurementUnitId: { $autoDirty: true },
		detailItemVelocityRecoveryMeasurementUnitsId: { $autoDirty: true },
		detailItemRocketId: { 
			required,
			$autoDirty: true 
		},
		detailItemSuccess: { 
			$autoDirty: true 
		}
	};
	validation['detailItemName'] =  (nameRequired === true ?
		{
			required,
			minLength: minLength(3),
			maxLength: maxLength(50),
			$autoDirty: true
		}
	:
		validation['detailItemName'] = {
			minLength: minLength(3),
			maxLength: maxLength(50),
			$autoDirty: true
		}
	);
	return validation;
}
