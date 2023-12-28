<script>
import { ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useRocketPartDialogComponent } from '@/components/content/rockets/parts/dialogs/rocketPartDialogComponent';

export function useChuteReleaseRocketPartComponent(props, context, options) {
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
	
	const detailItemAltitude = ref(null);
	const detailItemAltitudeMeasurementUnitId = ref(null);
	const detailItemAltitudeMeasurementUnitsId = ref(null);
	
	const resetAdditionalI = async (correlationId, previous) => {
		detailItemAltitude.value = detailItem.value ? detailItem.value.altitude : null;
		detailItemAltitudeMeasurementUnitId.value = detailItem.value ? detailItem.value.altitudeMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemAltitudeMeasurementUnitsId.value = detailItem.value ? detailItem.value.altitudeMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
	};
	const setAdditionalI = async (correlationId) => {
		detailItem.value.altitude = LibraryClientUtility.convertNumber(detailItemAltitude.value);
		detailItem.value.altitudeMeasurementUnitId = detailItemAltitudeMeasurementUnitId.value;
		// detailItem.value.altitudeMeasurementUnitsId = detailItemAltitudeMeasurementUnitsId.value;
		detailItem.value.altitudeMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemAltitudeMeasurementUnitId.value);
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
		detailItemAltitude,
		detailItemAltitudeMeasurementUnitId,
		detailItemAltitudeMeasurementUnitsId,
		scope: 'ChuteReleaseRocketPartDialog',
		validation: useVuelidate({ $scope: 'ChuteReleaseRocketPartDialog' })
	};
};
</script>
