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
	const measurementUnitsDensityDefaultId = ref(null);
	const measurementUnitsDensityType = ref(AppCommonConstants.MeasurementUnits.types.density);
	const measurementUnitsDistanceDefaultId = ref(null);
	const measurementUnitsDistanceType = ref(AppCommonConstants.MeasurementUnits.types.distance);
	const measurementUnitsFluidDefaultId = ref(null);
	const measurementUnitsFluidType = ref(AppCommonConstants.MeasurementUnits.types.fluid);
	const measurementUnitsLengthDefaultId = ref(null);
	const measurementUnitslengthType = ref(AppCommonConstants.MeasurementUnits.types.length);
	const measurementUnitsVelocityDefaultId = ref(null);
	const measurementUnitsVelocityType = ref(AppCommonConstants.MeasurementUnits.types.velocity);
	const measurementUnitsVolumeDefaultId = ref(null);
	const measurementUnitsVolumeType = ref(AppCommonConstants.MeasurementUnits.types.volume);
	const measurementUnitsWeightDefaultId = ref(null);
	const measurementUnitsWeightType = ref(AppCommonConstants.MeasurementUnits.types.weight);

	onMounted(async () => {
		const settings = serviceStore.getters.user.getUserSettings();
		measurementUnitsIdSettings.value = AppUtility.measurementUnitsId(correlationId, settings.value);
		measurementUnitsAccelerationDefaultId.value = AppUtility.measurementUnitsAccelerationId(correlationId, settings.value);
		measurementUnitsAreaDefaultId.value = AppUtility.measurementUnitAreaId(correlationId, settings.value);
		measurementUnitsDensityDefaultId.value = AppUtility.measurementUnitDensityId(correlationId, settings.value);
		measurementUnitsDistanceDefaultId.value = AppUtility.measurementUnitDistanceId(correlationId, settings.value);
		measurementUnitsFluidDefaultId.value = AppUtility.measurementUnitFluidId(correlationId, settings.value);
		measurementUnitsLengthDefaultId.value = AppUtility.measurementUnitLengthId(correlationId, settings.value);
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
		measurementUnitsDensityDefaultId,
		measurementUnitsDensityType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
		measurementUnitsFluidType,
		measurementUnitsLengthDefaultId,
		measurementUnitslengthType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		measurementUnitsVolumeDefaultId,
		measurementUnitsVolumeType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType
	};
};
</script>
