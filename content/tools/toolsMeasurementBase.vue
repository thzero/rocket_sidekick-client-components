<script>
import { onMounted, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useToolsMeasurementBaseComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		serviceStore,
		sortByOrder,
		target
	} = useContentBaseComponent(props, context, options);

	const measurementUnitsIdSettings = ref(null);
	const measurementUnitsAccelerationDefaultId = ref(null);
	const measurementUnitsAccelerationType = ref(AppCommonConstants.MeasurementUnits.types.acceleration);
	const measurementUnitsAreaDefaultId = ref(null);
	const measurementUnitsAreaType = ref(AppCommonConstants.MeasurementUnits.types.area);
	const measurementUnitsAltitudeDefaultId = ref(null);
	const measurementUnitsAltitudeType = ref(AppCommonConstants.MeasurementUnits.types.altitude);
	const measurementUnitsDensityDefaultId = ref(null);
	const measurementUnitsDensityType = ref(AppCommonConstants.MeasurementUnits.types.density);
	const measurementUnitsDistanceDefaultId = ref(null);
	const measurementUnitsDistanceType = ref(AppCommonConstants.MeasurementUnits.types.distance);
	const measurementUnitsFluidDefaultId = ref(null);
	const measurementUnitsFluidType = ref(AppCommonConstants.MeasurementUnits.types.fluid);
	const measurementUnitsLengthDefaultId = ref(null);
	const measurementUnitsLengthType = ref(AppCommonConstants.MeasurementUnits.types.length);
	const measurementUnitsTemperatureDefaultId = ref(null);
	const measurementUnitsTemperatureType = ref(AppCommonConstants.MeasurementUnits.types.temperature);
	const measurementUnitsVelocityDefaultId = ref(null);
	const measurementUnitsVelocityType = ref(AppCommonConstants.MeasurementUnits.types.velocity);
	const measurementUnitsVolumeDefaultId = ref(null);
	const measurementUnitsVolumeType = ref(AppCommonConstants.MeasurementUnits.types.volume);
	const measurementUnitsWeightDefaultId = ref(null);
	const measurementUnitsWeightType = ref(AppCommonConstants.MeasurementUnits.types.weight);
	
	const displayItemMeasurement = (correlationId, value, func, units) => {
		if (!value)
			return '';
		
		const unit = func(value);
		return (!String.isNullOrEmpty(unit) ? unit + ' ' + units : '');
	};
	const displayItemMeasurementAcceleration = (correlationId, value, func, func1, func2) => {
		if (!value)
			return '';
		
		return displayItemMeasurement(correlationId, value, func, AppUtility.measurementUnitTranslateAcceleration(correlationId, func1(value), func2(value)));
	};
	const displayItemMeasurementAltitude = (correlationId, value, func, func1, func2) => {
		if (!value)
			return '';
		
		return displayItemMeasurement(correlationId, value, func, AppUtility.measurementUnitTranslateAltitude(correlationId, func1(value), func2(value)));
	};
	const displayItemMeasurementLength = (correlationId, value, func, func1, func2) => {
		if (!value)
			return '';
		
		return displayItemMeasurement(correlationId, value, func, AppUtility.measurementUnitTranslateLength(correlationId, func1(value), func2(value)));
	};
	const displayItemMeasurementWeight = (correlationId, value, func, func1, func2) => {
		if (!value)
			return '';
		
		return displayItemMeasurement(correlationId, value, func, AppUtility.measurementUnitTranslateWeight(correlationId, func1(value), func2(value)));
	};
	const displayItemMeasurementTemperature = (correlationId, value, func, func1, func2) => {
		if (!value)
			return '';
		
		return displayItemMeasurement(correlationId, value, func, AppUtility.measurementUnitTranslateTemperature(correlationId, func1(value), func2(value)));
	};
	const displayItemMeasurementVelocity = (correlationId, value, func, func1, func2) => {
		if (!value)
			return '';
		
		return displayItemMeasurement(correlationId, value, func, AppUtility.measurementUnitTranslateVelocity(correlationId, func1(value), func2(value)));
	};
	const measurementUnitsFromUnitId = (correlationId, measurementType, unitId) => {
		let temp = AppCommonConstants.MeasurementUnits.english[measurementType];
		if (temp) {
			temp = temp[unitId];
			if (temp)
				return AppCommonConstants.MeasurementUnits.english.id;
		}
		temp = AppCommonConstants.MeasurementUnits.metrics[measurementType];
		if (temp) {
			temp = temp[unitId];
			if (temp)
				return AppCommonConstants.MeasurementUnits.metrics.id;
		}
		return null;
	};

	onMounted(async () => {
		const settings = serviceStore.getters.user.getUserSettings();
		measurementUnitsIdSettings.value = AppUtility.measurementUnitsIdDefault(correlationId, settings.value);
		measurementUnitsAccelerationDefaultId.value = AppUtility.measurementUnitAccelerationId(correlationId, settings.value);
		measurementUnitsAreaDefaultId.value = AppUtility.measurementUnitAreaId(correlationId, settings.value);
		measurementUnitsAltitudeDefaultId.value = AppUtility.measurementUnitAltitudeId(correlationId, settings.value);
		measurementUnitsDensityDefaultId.value = AppUtility.measurementUnitDensityId(correlationId, settings.value);
		measurementUnitsDistanceDefaultId.value = AppUtility.measurementUnitDistanceId(correlationId, settings.value);
		measurementUnitsFluidDefaultId.value = AppUtility.measurementUnitFluidId(correlationId, settings.value);
		measurementUnitsLengthDefaultId.value = AppUtility.measurementUnitLengthId(correlationId, settings.value);
		measurementUnitsTemperatureDefaultId.value = AppUtility.measurementUnitTemperatureId(correlationId, settings.value);
		measurementUnitsVelocityDefaultId.value = AppUtility.measurementUnitVelocityId(correlationId, settings.value);
		measurementUnitsVolumeDefaultId.value = AppUtility.measurementUnitVolumeId(correlationId, settings.value);
		measurementUnitsWeightDefaultId.value = AppUtility.measurementUnitWeightId(correlationId, settings.value);
	});

	return {
		measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAreaDefaultId,
		measurementUnitsAreaType,
		measurementUnitsAltitudeDefaultId,
		measurementUnitsAltitudeType,
		measurementUnitsDensityDefaultId,
		measurementUnitsDensityType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
		measurementUnitsFluidType,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsTemperatureDefaultId,
		measurementUnitsTemperatureType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		measurementUnitsVolumeDefaultId,
		measurementUnitsVolumeType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		displayItemMeasurement,
		displayItemMeasurementAcceleration,
		displayItemMeasurementAltitude,
		displayItemMeasurementLength,
		displayItemMeasurementWeight,
		displayItemMeasurementTemperature,
		displayItemMeasurementVelocity,
		measurementUnitsFromUnitId
	};
};
</script>
