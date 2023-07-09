<script>
import { ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { usePartComponent } from '@/components/content/parts/part/partComponent';

export function useParachutePartComponent(props, context, options) {
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
		serviceStore,
		formControlRef,
		dirty,
		detailItem,
		invalid,
		canDelete,
		detailItemData,
		detailItemTextRows,
		isEditable,
		isNew,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		preCompleteOk,
		resetAdditional,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitslengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		detailItemDescription,
		detailItemIsPublic,
		detailItemManufacturer,
		detailItemName,
		detailItemWeight,
		manufacturers,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		canAdd,
		hasAdmin,
		isPublic,
		handleAdd,
		requestManufacturers
	} = usePartComponent(props, context, {
		init: (correlationId, value) => {
			resetData(correlationId, value);
		},
		manufacturerType: AppCommonConstants.Rocketry.ManufacturerTypes.parachute,
		partsType: AppCommonConstants.Rocketry.PartTypes.parachute, 
		preCompleteOkPart: (correlationId, data) => {
			data.cd = Number(detailItemCd.value);
			data.diameter = Number(detailItemDiameter.value);
			data.thinMill = detailItemThinMill.value ?? false;
			data.diameterMeasurementUnitId = diameterMeasurementUnitId.value;
			data.diameterMeasurementUnitsId = diameterMeasurementUnitsId.value;

			const temp = AppUtility.measurementUnitTranslateLength(correlationId, diameterMeasurementUnitsId.value, diameterMeasurementUnitId.value);
			data.sortName = String(data.diameter ?? '').padStart(4, '0') + temp + (data.thinMill ? 'TM' : '') + data.name;
		
			return data;
		},
		resetAdditional: (correlationId, orig) => {
			resetData(correlationId, orig);
		}
	});
	
	const detailItemCd = ref(null);
	const detailItemDiameter = ref(null);
	const detailItemThinMill = ref(false);
	const diameterMeasurementUnitId = ref(null);
	const diameterMeasurementUnitsId = ref(null);

	const resetData = (correlationId, value) => {
		detailItemName.value = value ? value.name : LibraryClientUtility.$trans.t('forms.content.parts.parachute.name');

		detailItemCd.value = value ? value.cd : null;
		detailItemDiameter.value = value ? value.diameter : null;
		detailItemThinMill.value = value ? value.thinMill ?? false : false;
		
		diameterMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
		diameterMeasurementUnitsId.value = measurementUnitsIdSettings.value;
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
		serviceStore,
		formControlRef,
		dirty,
		detailItem,
		invalid,
		canDelete,
		detailItemData,
		detailItemTextRows,
		isEditable,
		isNew,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		preCompleteOk,
		resetAdditional,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitslengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		detailItemDescription,
		detailItemIsPublic,
		detailItemManufacturer,
		detailItemName,
		detailItemWeight,
		manufacturers,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		canAdd,
		hasAdmin,
		isPublic,
		handleAdd,
		requestManufacturers,
		detailItemCd,
		detailItemDiameter,
		detailItemThinMill,
		diameterMeasurementUnitId,
		diameterMeasurementUnitsId,
		scope: 'ParchutePartControl',
		validation: useVuelidate({ $scope: 'ParchutePartControl' })
	};
};
</script>
