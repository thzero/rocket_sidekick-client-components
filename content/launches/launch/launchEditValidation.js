import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export function useLaunchEditValidation(nameRequired) { 
	const validation = {
		detailItemDate: { 
			required,
			$autoDirty: true 
		},
		detailItemDescription: { $autoDirty: true },
		detailItemFailureReasons: { $autoDirty: true },
		detailItemLocationName: { $autoDirty: true },
		detailItemLocationId: { 
			required,
			$autoDirty: true 
		},
		detailItemLocationIterationId: { 
			$autoDirty: true 
		},
		detailItemNotes: {
			maxLength: maxLength(1000),
			$autoDirty: true
		},

		detailitemResultsAccelerationMax: { $autoDirty: true },
		detailItemResultsAccelerationMaxMeasurementUnitId: { $autoDirty: true },
		detailItemResultsAccelerationMaxMeasurementUnitsId: { $autoDirty: true },
		detailitemResultsAltitudeMax: { $autoDirty: true },
		detailItemResultsAltitudeMaxMeasurementUnitId: { $autoDirty: true },
		detailItemResultsAltitudeMaxMeasurementUnitsId: { $autoDirty: true },
		detailitemResultsAltitudeDeployDrogue: { $autoDirty: true },
		detailItemResultsAltitudeDeployDrogueMeasurementUnitId: { $autoDirty: true },
		detailItemResultsAltitudeDeployDrogueMeasurementUnitsId: { $autoDirty: true },
		detailitemResultsAltitudeDeployMMain: { $autoDirty: true },
		detailItemResultsAltitudeDeployMMainMeasurementUnitId: { $autoDirty: true },
		detailItemResultsAltitudeDeployMMainMeasurementUnitsId: { $autoDirty: true },
		detailitemResultsCoordsLatRecovery: { $autoDirty: true },
		detailitemResultsCoordsLongRecovery: { $autoDirty: true },
		detailitemResultsCoordsLatLanding: { $autoDirty: true },
		detailitemResultsVelocityMax: { $autoDirty: true },
		detailItemResultsVelocityMaxMeasurementUnitId: { $autoDirty: true },
		detailItemResultsVelocityMaxMeasurementUnitsId: { $autoDirty: true },
		detailitemResultsVelocityRecovery: { $autoDirty: true },
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
