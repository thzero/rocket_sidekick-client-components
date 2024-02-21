<script>
import { ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { usePartComponent } from '@/components/content/parts/part/partComponent';

export function useChuteProtectorPartComponent(props, context, options) {
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
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify,
		serviceStore,
		formControlRef,
		dirty,
		detailItem,
		dialogDeleteManager,
		dialogDeleteMessage,
		dialogDeleteParams,
		invalid,
		canDelete,
		detailItemData,
		detailItemTextRows,
		isDeleting,
		isEditable,
		isNew,
		dialogDeleteCancel,
		dialogDeleteError,
		dialogDeleteOk,
		dialogDeleteOpen,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		preCompleteOk,
		resetAdditional,
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		measurementUnitsFromUnitId,
		detailItemDescription,
		detailItemIsPublic,
		detailItemManufacturer,
		detailItemManufacturerStockId,
		detailItemName,
		detailItemWeight,
		detailItemWeightMeasurementUnitId,
		detailItemWeightMeasurementUnitsId,
		manufacturers,
		canAdd,
		hasAdminDelete,
		hasAdminEdit,
		isPublicItem,
		handleAdd,
		requestManufacturers
	} = usePartComponent(props, context, {
		init: async (correlationId, value) => {
			resetData(correlationId, value);
		},
		manufacturerType: AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector,
		partsType: AppCommonConstants.Rocketry.PartTypes.chuteProtector, 
		preCompleteOkPart: (correlationId, data) => {
			data.cd = LibraryClientUtility.convertNumber(detailItemCd.value);

			data.diameter = LibraryClientUtility.convertNumber(detailItemDiameter.value);
			data.diameterMeasurementUnitId = detailItemDiameterMeasurementUnitId.value;
			// data.diameterMeasurementUnitsId = detailItemDiameterMeasurementUnisId.value;
			data.diameterMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemDiameterMeasurementUnitId.value);
			
			data.dimension = LibraryClientUtility.convertNumber(detailItemDimension.value);
			data.dimensionMeasurementUnitId = detailItemDimensionMeasurementUnitId.value;
			// data.dimensionMeasurementUnitsId = detailItemDimensionMeasurementUnitsId.value;
			data.dimensionMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, detailItemDimensionMeasurementUnitId.value);

			const temp = AppUtility.measurementUnitTranslateLength(correlationId, detailItemDimensionMeasurementUnitsId.value, detailItemDimensionMeasurementUnitId.value);
			data.sortName = String(data.dimension ?? '').padStart(4, '0') + temp + data.name;
		
			return data;
		},
		resetAdditional: (correlationId, orig) => {
			resetData(correlationId, orig);
		}
	});
	
	const detailItemCd = ref(null);
	const detailItemDiameter = ref(null);
	const detailItemDiameterMeasurementUnitId = ref(null);
	const detailItemDiameterMeasurementUnitsId = ref(null);
	const detailItemDimension = ref(null);
	const detailItemDimensionMeasurementUnitId = ref(null);
	const detailItemDimensionMeasurementUnitsId = ref(null);

	const resetData = (correlationId, value) => {
		detailItemName.value = value ? value.name : LibraryClientUtility.$trans.t('forms.content.parts.blnaket.name');

		detailItemCd.value = value ? value.cd : null;
		
		detailItemDiameter.value = value ? value.diameter : null;
		detailItemDiameterMeasurementUnitId.value = value ? value.diameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemDiameterMeasurementUnitsId.value = value ? value.diameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		detailItemDimension.value = value ? value.dimension : null;
		detailItemDimensionMeasurementUnitId.value = value ? value.dimensionMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemDimensionMeasurementUnitsId.value = value ? value.dimensionMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
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
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify,
		serviceStore,
		formControlRef,
		dirty,
		detailItem,
		dialogDeleteManager,
		dialogDeleteMessage,
		dialogDeleteParams,
		invalid,
		canDelete,
		detailItemData,
		detailItemTextRows,
		isDeleting,
		isEditable,
		isNew,
		dialogDeleteCancel,
		dialogDeleteError,
		dialogDeleteOk,
		dialogDeleteOpen,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		preCompleteOk,
		resetAdditional,
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		measurementUnitsFromUnitId,
		detailItemDescription,
		detailItemIsPublic,
		detailItemManufacturer,
		detailItemManufacturerStockId,
		detailItemName,
		detailItemWeight,
		detailItemWeightMeasurementUnitId,
		detailItemWeightMeasurementUnitsId,
		manufacturers,
		canAdd,
		hasAdminDelete,
		hasAdminEdit,
		isPublicItem,
		handleAdd,
		requestManufacturers,
		detailItemCd,
		detailItemDiameter,
		detailItemDiameterMeasurementUnitId,
		detailItemDiameterMeasurementUnitsId,
		detailItemDimension,
		detailItemDimensionMeasurementUnitId,
		detailItemDimensionMeasurementUnitsId,
		scope: 'ChuteProtectorPartControl',
		validation: useVuelidate({ $scope: 'ChuteProtectorPartControl' })
	};
};
</script>
