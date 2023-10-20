<script>
import { computed, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';

import { useRocketPartDialogComponent } from '@/components/content/rockets/parts/dialogs/rocketPartDialogComponent';

export function useAltimeterRocketPartComponent(props, context, options) {
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
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		measurementUnitsFromUnitId,
		hasAdminDelete,
		hasAdminEdit,
		hasAdminRoles,
		isLoggedIn,
		detailItem,
		detailItemTextRows,
		dialogClose,
		dialogError,
		dialogOk,
		preCompleteOk,
		resetAdditional,
		setAdditional
	} = useRocketPartDialogComponent(props, context, {
		resetAdditional: async (correlationId) => { await resetAdditionalI(correlationId); },
		setAdditional: async (correlationId) => { await setAdditionalI(correlationId); }
	});
	
	const detailItemApogeeDelay = ref(null);
	const detailItemMainAltitude = ref(null);
	const detailItemMainAltitudeMeasurementUnitId = ref(null);
	const detailItemMainAltitudeMeasurementUnitsId = ref(null);
	const detailItemMotorDelay = ref(null);
	
	const resetAdditionalI = async (correlationId, previous) => {
		detailItemApogeeDelay.value = detailItem.value ? detailItem.value.apogeeDelay : null;
		
		detailItemMainAltitude.value = detailItem.value ? detailItem.value.altitudeMain : null;
		detailItemMainAltitudeMeasurementUnitId.value = detailItem.value ? detailItem.value.altitudeMainMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemMainAltitudeMeasurementUnitsId.value = detailItem.value ? detailItem.value.altitudeMainMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemMotorDelay.value = detailItem.value ? detailItem.value.motorDelay : null;
	};
	const setAdditionalI = async (correlationId) => {
		detailItem.value.apogeeDelay = AppUtility.convertNumber(detailItemApogeeDelay.value);

		detailItem.value.altitudeMain = AppUtility.convertNumber(detailItemMainAltitude.value);
		detailItem.value.altitudeMainMeasurementUnitId = detailItemMainAltitudeMeasurementUnitId.value;
		// detailItem.value.altitudeMainMeasurementUnitsId = detailItemMainAltitudeMeasurementUnitsId.value;
		detailItem.value.altitudeMainMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemMainAltitudeMeasurementUnitId.value);

		detailItem.value.motorDelay = AppUtility.convertNumber(detailItemMotorDelay.value);
	};
	
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
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		measurementUnitsFromUnitId,
		hasAdminDelete,
		hasAdminEdit,
		hasAdminRoles,
		isLoggedIn,
		detailItem,
		detailItemTextRows,
		dialogClose,
		dialogError,
		dialogOk,
		preCompleteOk,
		resetAdditional,
		setAdditional,
		detailItemApogeeDelay,
		detailItemMainAltitude,
		detailItemMainAltitudeMeasurementUnitId,
		detailItemMainAltitudeMeasurementUnitsId,
		detailItemMotorDelay,
		scope: 'AltimeterRocketPartDialog',
		validation: useVuelidate({ $scope: 'AltimeterRocketPartDialog' })
	};
};
</script>
