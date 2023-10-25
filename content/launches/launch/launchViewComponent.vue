<script>
import { computed, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useMotorLookupComponent } from '@/components/external/motorLookupComponent';
import { useLaunchComponent } from '@/components/content/launches/launch/launchComponent';
// import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
// import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useLaunchViewComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useBaseComponent(props, context, options);
	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		displayItemMeasurement,
		displayItemMeasurementLength,
		displayItemMeasurementWeight,
		measurementUnitsFromUnitId,
		failureReasons,
		successReasons
	} = useLaunchComponent(props, context);

	const {
		motorDiameters,
		motorImpulseClasses,
		// motorCaseInfo,
		motorDiameter,
		motorUrl
	} = useMotorLookupComponent(props, context);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	const displayItemLocationIteration= computed(() => {
		return displayItem ? displayItem.name : '';
	});
	const displayItemLocationMame = computed(() => {
		return displayItem ? displayItem.name : '';
	});
	const displayItemRocketMame = computed(() => {
		return displayItem ? displayItem.name : '';
	});
	const isFailure = computed(() => {
		return displayItem.value ? displayItem.value.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.failed : false;
	});
	const isSuccess = computed(() => {
		return displayItem.value ? displayItem.value.success === AppCommonConstants.Rocketry.Launches.Reasons.Success.success : false;
	});

	return {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		displayItemMeasurement,
		displayItemMeasurementLength,
		displayItemMeasurementWeight,
		measurementUnitsFromUnitId,
		failureReasons,
		successReasons,
		displayItem,
		displayItemLocationIteration,
		displayItemLocationMame,
		displayItemRocketMame,
		isFailure,
		isSuccess
	};
};
</script>
