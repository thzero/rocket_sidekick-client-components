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
		isOwner,
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
		isPublic,
		handleAdd,
		requestManufacturers
	} = usePartComponent(props, context, {
		init: async (correlationId, value) => {
			resetData(correlationId, value);
		},
		manufacturerType: AppCommonConstants.Rocketry.ManufacturerTypes.parachute,
		partsType: AppCommonConstants.Rocketry.PartTypes.parachute, 
		preCompleteOkPart: (correlationId, data) => {
			data.cd = AppUtility.convertNumber(detailItemCd.value);
			data.loadMax = AppUtility.convertNumber(detailItemLoadMax.value);
			data.loadMin = AppUtility.convertNumber(detailItemLoadMin.value);
			data.thinMill = detailItemThinMill.value ?? false;

			data.diameter = AppUtility.convertNumber(detailItemDiameter.value);
			data.diameterMeasurementUnitId = detailItemDiameterMeasurementUnitId.value;
			// data.diameterMeasurementUnitsId = detailItemDiameterMeasurementUnitsId.value;
			data.diameterMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, diameterMeasurementUnitId.value);
			
			data.loadMaxWeightMeasurementUnitId = detailItemLoadMaxWeightMeasurementUnitId.value;
			// data.loadMaxWeightMeasurementUnitsId = detailItemLoadMaxWeightMeasurementUnitsId.value;
			data.loadMaxWeightMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.weight.id, loadMaxWeightMeasurementUnitId.value);
			data.loadMinWeightMeasurementUnitId = detailItemLoadMinWeightMeasurementUnitId.value;
			// data.loadMinWeightMeasurementUnitsId = detailItemLoadMinWeightMeasurementUnitsId.value;
			data.loadMinWeightMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.weight.id, loadMinWeightMeasurementUnitId.value);

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
	const detailItemDiameterMeasurementUnitId = ref(null);
	const detailItemDiameterMeasurementUnitsId = ref(null);
	const detailItemLoadMax = ref(null);
	const detailItemLoadMaxWeightMeasurementUnitId = ref(null);
	const detailItemLoadMaxWeightMeasurementUnitsId = ref(null);
	const detailItemLoadMin = ref(null);
	const detailItemLoadMinWeightMeasurementUnitId = ref(null);
	const detailItemLoadMinWeightMeasurementUnitsId = ref(null);
	const detailItemThinMill = ref(false);

	const resetData = (correlationId, value) => {
		detailItemName.value = value ? value.name : LibraryClientUtility.$trans.t('forms.content.parts.parachute.name');

		detailItemCd.value = value ? value.cd : null;
		detailItemDiameter.value = value ? value.diameter : null;
		detailItemLoadMax.value = value ? value.loadMax : null;
		detailItemLoadMin.value = value ? value.loadMin : null;
		detailItemThinMill.value = value ? value.thinMill ?? false : false;
		
		detailItemDiameterMeasurementUnitId.value = value ? value.diameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemDiameterMeasurementUnitsId.value = value ? value.diameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemLoadMaxWeightMeasurementUnitId.value = value ? value.loadMaxWeightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		detailItemLoadMaxWeightMeasurementUnitsId.value = value ? value.loadMaxWeightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		detailItemLoadMinWeightMeasurementUnitId.value = value ? value.loadMinWeightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		detailItemLoadMinWeightMeasurementUnitsId.value = value ? value.loadMinWeightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
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
		isOwner,
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
		isPublic,
		handleAdd,
		requestManufacturers,
		detailItemCd,
		detailItemDiameter,
		detailItemDiameterMeasurementUnitId,
		detailItemDiameterMeasurementUnitsId,
		detailItemLoadMax,
		detailItemLoadMaxWeightMeasurementUnitId,
		detailItemLoadMaxWeightMeasurementUnitsId,
		detailItemLoadMin,
		detailItemLoadMinWeightMeasurementUnitId,
		detailItemLoadMinWeightMeasurementUnitsId,
		detailItemThinMill,
		scope: 'ParchutePartControl',
		validation: useVuelidate({ $scope: 'ParchutePartControl' })
	};
};
</script>
