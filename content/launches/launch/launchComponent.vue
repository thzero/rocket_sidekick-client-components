<script>
import { ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';

import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useLaunchComponent(props, context, options) {
	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAltitudeDefaultId,
		measurementUnitsAltitudeType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsTemperatureDefaultId,
		measurementUnitsTemperatureType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		displayItemMeasurement,
		displayItemMeasurementAcceleration,
		displayItemMeasurementAltitude,
		displayItemMeasurementLength,
		displayItemMeasurementTemperature,
		displayItemMeasurementVelocity,
		measurementUnitsFromUnitId
	} = useToolsMeasurementUtilityComponent(props, context);

	const failureReasons = ref(Object.getOwnPropertyNames(AppCommonConstants.Rocketry.Launches.Reasons.Failure).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('strings.content.launches.reasons.failure.' + item) }; }));
	const successReasons = ref(Object.getOwnPropertyNames(AppCommonConstants.Rocketry.Launches.Reasons.Success).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('strings.content.launches.reasons.success.' + item) }; }));
	
	const weatherOptions = LibraryClientVueUtility.selectOptions(Object.getOwnPropertyNames(AppCommonConstants.Rocketry.Launches.Weather), LibraryClientUtility.$trans.t, 'strings.content.launches.weather');

	return {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAltitudeType,
		measurementUnitsAltitudeDefaultId,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsTemperatureDefaultId,
		measurementUnitsTemperatureType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		displayItemMeasurement,
		displayItemMeasurementAcceleration,
		displayItemMeasurementAltitude,
		displayItemMeasurementLength,
		displayItemMeasurementTemperature,
		displayItemMeasurementVelocity,
		measurementUnitsFromUnitId,
		failureReasons,
		successReasons,
		weatherOptions
	};
};
</script>
