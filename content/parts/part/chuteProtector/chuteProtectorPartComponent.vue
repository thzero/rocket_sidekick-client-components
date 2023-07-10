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
		detailItemManufacturerStockId,
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
		manufacturerType: AppCommonConstants.Rocketry.ManufacturerTypes.chuteProtector,
		partsType: AppCommonConstants.Rocketry.PartTypes.chuteProtector, 
		preCompleteOkPart: (correlationId, data) => {
			data.cd = Number(detailItemCd.value);
			data.diameter = Number(detailItemDiameter.value);
			data.loadMax = Number(detailItemLoadMax.value);
			data.loadMin = Number(detailItemLoadMin.value);
			data.thinMill = detailItemThinMill.value ?? false;

			data.diameterMeasurementUnitId = diameterMeasurementUnitId.value;
			data.diameterMeasurementUnitsId = diameterMeasurementUnitsId.value;
			
			data.loadMaxWeightMeasurementUnitId = loadMaxWeightMeasurementUnitId.value;
			data.loadMaxWeightMeasurementUnitsId = loadMaxWeightMeasurementUnitsId.value;
			data.loadMinWeightMeasurementUnitId = loadMinWeightMeasurementUnitId.value;
			data.loadMinWeightMeasurementUnitsId = loadMinWeightMeasurementUnitsId.value;

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
	const detailItemLoadMax = ref(null);
	const detailItemLoadMin = ref(null);
	const detailItemThinMill = ref(false);
	const diameterMeasurementUnitId = ref(null);
	const diameterMeasurementUnitsId = ref(null);
	const loadMaxWeightMeasurementUnitId = ref(null);
	const loadMaxWeightMeasurementUnitsId = ref(null);
	const loadMinWeightMeasurementUnitId = ref(null);
	const loadMinWeightMeasurementUnitsId = ref(null);

	const resetData = (correlationId, value) => {
		detailItemName.value = value ? value.name : LibraryClientUtility.$trans.t('forms.content.parts.blnaket.name');

		detailItemCd.value = value ? value.cd : null;
		detailItemDiameter.value = value ? value.diameter : null;
		detailItemLoadMax.value = value ? value.loadMax : null;
		detailItemLoadMin.value = value ? value.loadMin : null;
		detailItemThinMill.value = value ? value.thinMill ?? false : false;
		
		diameterMeasurementUnitId.value = value ? value.diameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		diameterMeasurementUnitsId.value = value ? value.diameterMeasurementUnitsId ?? ementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		loadMaxWeightMeasurementUnitId.value = value ? value.loadMaxWeightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		loadMaxWeightMeasurementUnitsId.value = value ? value.loadMaxWeightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		loadMinWeightMeasurementUnitId.value = value ? value.loadMinWeightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		loadMinWeightMeasurementUnitsId.value = value ? value.loadMinWeightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
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
		detailItemManufacturerStockId,
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
		detailItemLoadMax,
		detailItemLoadMin,
		detailItemThinMill,
		diameterMeasurementUnitId,
		diameterMeasurementUnitsId,
		loadMaxWeightMeasurementUnitId,
		loadMaxWeightMeasurementUnitsId,
		loadMinWeightMeasurementUnitId,
		loadMinWeightMeasurementUnitsId,
		scope: 'ChuteProtectorPartControl',
		validation: useVuelidate({ $scope: 'ChuteProtectorPartControl' })
	};
};
</script>
