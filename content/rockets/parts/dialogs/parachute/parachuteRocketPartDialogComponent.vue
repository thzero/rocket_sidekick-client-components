<script>
import {  ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useRocketPartDialogComponent } from '@/components/content/rockets/parts/dialogs/rocketPartDialogComponent';

export function useParachuteRocketPartComponent(props, context, options) {
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
	
	const detailItemReefed = ref(false);
	const detailItemReefedLength = ref(null);
	const detailItemReefedLengthMeasurementUnitId = ref(null);
	const detailItemReefedLengthMeasurementUnitsId = ref(null);
	
	const resetAdditionalI = async (correlationId, previous) => {
		detailItemReefed.value = detailItem.value ? detailItem.value.reefed : null;
		detailItemReefedLength.value = detailItem.value ? detailItem.value.reefedLength : null;
		detailItemReefedLengthMeasurementUnitId.value = detailItem.value ? detailItem.value.reefedMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemReefedLengthMeasurementUnitsId.value = detailItem.value ? detailItem.value.reefedMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
	};
	const setAdditionalI = async (correlationId) => {
		detailItem.value.reefed = detailItemReefed.value;
		detailItem.value.reefedLength = LibraryClientUtility.convertNumber(detailItemReefedLength.value);
		detailItem.value.reefedMeasurementUnitId = detailItemReefedLengthMeasurementUnitId.value;
		// detailItem.value.reefedMeasurementUnitsId = detailItemReefedLengthMeasurementUnitsId.value;
		detailItem.value.reefedMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemReefedLengthMeasurementUnitId.value);
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
		detailItemReefed,
		detailItemReefedLength,
		detailItemReefedLengthMeasurementUnitId,
		detailItemReefedLengthMeasurementUnitsId,
		scope: 'ParachuteRocketPartDialog',
		validation: useVuelidate({ $scope: 'ParachuteRocketPartDialog' })
	};
};
</script>
