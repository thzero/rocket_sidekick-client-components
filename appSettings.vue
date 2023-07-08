<script>
import { computed, ref, watch } from 'vue';
import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseSettingsComponent } from '@thzero/library_client_vue3/components/baseSettings';

export function useAppSettingsComponent(props, context, formRef) {
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
		isSaving,
		serverErrors,
		setErrors,
		beforeUnload,
		dirty,
		dirtyCallback,
		leaveCheck,
		cancel,
		close,
		fab,
		hasPicture,
		name,
		ok,
		open,
		picture,
		preComplete,
		preCompleteI,
		requestReset,
		serviceStore,
		serviceUsers,
		user
	} = useBaseSettingsComponent(props, context, {
		formRef: formRef
	});

	const gamerTag = ref('');
	const measurementUnitsId = ref(null);
	const measurementUnitAccelerationId = ref(null);
	const measurementUnitAreaId = ref(null);
	const measurementUnitDistanceId = ref(null);
	const measurementUnitLengthId = ref(null);
	const measurementUnitVelocityId = ref(null);
	const measurementUnitVolumeId = ref(null);
	const measurementUnitWeightId = ref(null);

	const measurementUnitsSelect = computed(() => {
		return [AppCommonConstants.MeasurementUnits.english.id, AppCommonConstants.MeasurementUnits.metrics.id].map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('measurementUnits.' + item + '.title') }; });
	});
	const measurementUnitsAcceleration = computed(() => {
		if (measurementUnitsId.value === AppCommonConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppCommonConstants.MeasurementUnits.english.acceleration, 'english', 'acceleration');
		return measurementUnitTrans(AppCommonConstants.MeasurementUnits.metrics.acceleration, 'metrics', 'acceleration');
	});
	const measurementUnitsArea = computed(() => {
		if (measurementUnitsId.value === AppCommonConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppCommonConstants.MeasurementUnits.english.area, 'english', 'area');
		return measurementUnitTrans(AppCommonConstants.MeasurementUnits.metrics.area, 'metrics', 'area');
	});
	const measurementUnitsDistance = computed(() => {
		if (measurementUnitsId.value === AppCommonConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppCommonConstants.MeasurementUnits.english.distance, 'english', 'distance');
		return measurementUnitTrans(AppCommonConstants.MeasurementUnits.metrics.distance, 'metrics', 'distance');
	});
	const measurementUnitsLength = computed(() => {
		if (measurementUnitsId.value === AppCommonConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppCommonConstants.MeasurementUnits.english.length, 'english', 'length');
		return measurementUnitTrans(AppCommonConstants.MeasurementUnits.metrics.length, 'metrics', 'length');
	});
	const measurementUnitsVelocity = computed(() => {
		if (measurementUnitsId.value === AppCommonConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppCommonConstants.MeasurementUnits.english.velocity, 'english', 'velocity');
		return measurementUnitTrans(AppCommonConstants.MeasurementUnits.metrics.velocity, 'metrics', 'velocity');
	});
	const measurementUnitsVolume = computed(() => {
		if (measurementUnitsId.value === AppCommonConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppCommonConstants.MeasurementUnits.english.volume, 'english', 'volume');
		return measurementUnitTrans(AppCommonConstants.MeasurementUnits.metrics.volume, 'metrics', 'volume');
	});
	const measurementUnitsWeight = computed(() => {
		if (measurementUnitsId.value === AppCommonConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppCommonConstants.MeasurementUnits.english.weight, 'english', 'weight');
		return measurementUnitTrans(AppCommonConstants.MeasurementUnits.metrics.weight, 'metrics', 'weight');
	});

	const keyword = 'Default'.toLowerCase(); // otherwise gives a '_sfc_main is not defined' error as Vite is looking for lower case version of the keyword

	const measurementUnitTrans = (object, key, subKey) => {
		return Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('measurementUnits.' + key + '.' + subKey + '.' + item + 'Abbr') }; });
	};
	const preCompleteOk = async (correlationId) => {
		try {
			const settings = serviceStore.getters.user.getUserSettings();
			if (!settings.measurementUnits)
				settings.measurementUnits = {};

			settings.gamerTag = gamerTag.value;
			settings.measurementUnits.id = measurementUnitsId.value;
			settings.measurementUnits.acceleration = measurementUnitAccelerationId.value;
			settings.measurementUnits.area = measurementUnitAreaId.value;
			settings.measurementUnits.distance = measurementUnitDistanceId.value;
			settings.measurementUnits.length = measurementUnitLengthId.value;
			settings.measurementUnits.velocity = measurementUnitVelocityId.value;
			settings.measurementUnits.volume = measurementUnitVolumeId.value;
			settings.measurementUnits.weight = measurementUnitWeightId.value;

			return await serviceStore.dispatcher.user.setUserSettings(correlationId, settings);
		}
		catch (err) {
			logger.exception('AppSettings', 'preCompleteOk', err, correlationId);
			return error('AppSettings', 'preCompleteOk', null, err, null, null, correlationId);
		}
	};
	// eslint-disable-next-line
	const resetAdditional = (correlationId, previous) => {
		const settings = serviceStore.getters.user.getUserSettings();
		if (!settings.measurementUnits)
			settings.measurementUnits = {};

		gamerTag.value = !String.isNullOrEmpty(settings.gamerTag) ? settings.gamerTag : '';
		measurementUnitsId.value = settings.measurementUnits.id;
		measurementUnitAccelerationId.value = settings.measurementUnits.acceleration;
		measurementUnitAreaId.value = settings.measurementUnits.area;
		measurementUnitDistanceId.value = settings.measurementUnits.distance;
		measurementUnitLengthId.value = settings.measurementUnits.length;
		measurementUnitVelocityId.value = settings.measurementUnits.velocity;
		measurementUnitVolumeId.value = settings.measurementUnits.volume;
		measurementUnitWeightId.value = settings.measurementUnits.weight;
		measurementUnitsId.value = settings.measurementUnits.id ? settings.measurementUnits.id : AppCommonConstants.MeasurementUnits.english.id;

		const measurementUnitAccelerationIdT = settings.measurementUnits.acceleration ? settings.measurementUnits.acceleration : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].acceleration[keyword];
		measurementUnitAccelerationId.value = resetIdCheck(measurementUnitAccelerationIdT, measurementUnitsAcceleration.value);
		const measurementUnitAreaIdT = settings.measurementUnits.area ? settings.measurementUnits.area : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].area[keyword];
		measurementUnitAreaId.value = resetIdCheck(measurementUnitAreaIdT, measurementUnitsArea.value);
		const measurementUnitDistanceIdT = settings.measurementUnits.distance ? settings.measurementUnits.distance : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].distance[keyword];
		measurementUnitDistanceId.value = resetIdCheck(measurementUnitDistanceIdT, measurementUnitsDistance.value);
		const measurementUnitLengthIdT = settings.measurementUnits.length ? settings.measurementUnits.length : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].length[keyword];
		measurementUnitLengthId.value = resetIdCheck(measurementUnitLengthIdT, measurementUnitsLength.value);
		const measurementUnitVelocityIdT = settings.measurementUnits.velocity ? settings.measurementUnits.velocity : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].velocity[keyword];
		measurementUnitVelocityId.value = resetIdCheck(measurementUnitVelocityIdT, measurementUnitsVelocity.value);
		const measurementUnitVolumeIdT = settings.measurementUnits.volume ? settings.measurementUnits.volume : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].volume[keyword];
		measurementUnitVolumeId.value = resetIdCheck(measurementUnitVolumeIdT, measurementUnitsVolume.value);
		const measurementUnitWeightIdT = settings.measurementUnits.weight ? settings.measurementUnits.weight : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].weight[keyword];
		measurementUnitWeightId.value = resetIdCheck(measurementUnitWeightIdT, measurementUnitsWeight.value);

		measurementUnitAccelerationId.value = settings.measurementUnits.acceleration ? settings.measurementUnits.acceleration : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].acceleration[keyword];
		measurementUnitAreaId.value = settings.measurementUnits.area ? settings.measurementUnits.area : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].area[keyword];
		measurementUnitDistanceId.value = settings.measurementUnits.distance ? settings.measurementUnits.distance : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].distance[keyword];
		measurementUnitLengthId.value = settings.measurementUnits.length ? settings.measurementUnits.length : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].length[keyword];
		measurementUnitVelocityId.value = settings.measurementUnits.velocity ? settings.measurementUnits.velocity : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].velocity[keyword];
		measurementUnitVolumeId.value = settings.measurementUnits.volume ? settings.measurementUnits.volume : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].volume[keyword];
		measurementUnitWeightId.value = settings.measurementUnits.weight ? settings.measurementUnits.weight : AppCommonConstants.MeasurementUnits[measurementUnitsId.value].weight[keyword];
	};
	const resetIdCheck = (id, values) => {
		const temp = values.find(l => l.id === id);
		return !String.isNullOrEmpty(temp) ? temp.id : null;
	};

	watch(() => measurementUnitsId,
		(value) => {
			let units = AppCommonConstants.MeasurementUnits.english;
			if (measurementUnitsId.value ===  AppCommonConstants.MeasurementUnits.metrics.id)
			AppCommonConstants.MeasurementUnits.metrics;

			measurementUnitAccelerationId.value = AppCommonConstants.MeasurementUnits[units].acceleration[keyword];
			measurementUnitAreaId.value = AppCommonConstants.MeasurementUnits[units].area[keyword];
			measurementUnitDistanceId.value = AppCommonConstants.MeasurementUnits[units].distance[keyword];
			measurementUnitLengthId.value = AppCommonConstants.MeasurementUnits[units].length[keyword];
			measurementUnitVelocityId.value = AppCommonConstants.MeasurementUnits[units].velocity[keyword];
			measurementUnitVolumeId.value = AppCommonConstants.MeasurementUnits[units].volume[keyword];
			measurementUnitWeightId.value = AppCommonConstants.MeasurementUnits[units].weight[keyword];
		}
	);
	// watch(() => user.value,
	// 	(value, newValue) => {
	// 		if (value !== newValue)
	// 			resetAdditional(correlationId);
	// 	}
	// );

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
		isSaving,
		serverErrors,
		setErrors,
		beforeUnload,
		dirty,
		dirtyCallback,
		leaveCheck,
		cancel,
		close,
		fab,
		hasPicture,
		name,
		ok,
		open,
		picture,
		preComplete,
		preCompleteI,
		requestReset,
		serviceStore,
		serviceUsers,
		user,
		gamerTag,
		measurementUnitTrans,
		measurementUnitsId,
		measurementUnitAccelerationId,
		measurementUnitAreaId,
		measurementUnitDistanceId,
		measurementUnitLengthId,
		measurementUnitVelocityId,
		measurementUnitVolumeId,
		measurementUnitWeightId,
		measurementUnitsSelect,
		measurementUnitsAcceleration,
		measurementUnitsArea,
		measurementUnitsDistance,
		measurementUnitsLength,
		measurementUnitsVelocity,
		measurementUnitsVolume,
		measurementUnitsWeight,
		preCompleteOk,
		resetAdditional,
		resetIdCheck,
		scope: 'AppSettings',
		validation: useVuelidate({ $scope: 'AppSettings' })
	};
};
</script>
