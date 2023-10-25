<script>
import { ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useLaunchComponent(props, context, options) {
	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAreaDefaultId,
		measurementUnitsAreaType,
		measurementUnitsDensityDefaultId,
		measurementUnitsDensityType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
		measurementUnitsFluidType,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		measurementUnitsVolumeDefaultId,
		measurementUnitsVolumeType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		displayItemMeasurement,
		displayItemMeasurementAcceleration,
		displayItemMeasurementLength,
		displayItemMeasurementWeight,
		displayItemMeasurementVelocity,
	 	measurementUnitsFromUnitId
	} = useToolsMeasurementBaseComponent(props, context);

	const failureReasons = ref(Object.getOwnPropertyNames(AppCommonConstants.Rocketry.Launches.Reasons.Failure).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('strings.content.launches.reasons.failure.' + item) }; }));
	const successReasons = ref(Object.getOwnPropertyNames(AppCommonConstants.Rocketry.Launches.Reasons.Success).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('strings.content.launches.reasons.success.' + item) }; }));

	const locationIterationName = (item) => {
		let output = '';
		if (item.number)
			output += item.number + ' ';
		if (item.year)
			output += item.year + ' ';
		return output.trim();
	};

	return {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		displayItemMeasurement,
		displayItemMeasurementAcceleration,
		displayItemMeasurementLength,
		displayItemMeasurementWeight,
		displayItemMeasurementVelocity,
		measurementUnitsFromUnitId,
		failureReasons,
		successReasons,
		locationIterationName
	};
};
</script>
