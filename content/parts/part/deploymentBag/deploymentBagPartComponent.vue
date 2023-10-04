<script>
import { ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { usePartComponent } from '@/components/content/parts/part/partComponent';

export function useDeploymentBagPartComponent(props, context, options) {
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
		manufacturerType: AppCommonConstants.Rocketry.ManufacturerTypes.deploymentBag,
		partsType: AppCommonConstants.Rocketry.PartTypes.deploymentBag, 
		preCompleteOkPart: (correlationId, data) => {
			data.diameter = AppUtility.convertNumber(detailItemDiameter.value);
			data.diameterMeasurementUnitId = detailItemDiameterMeasurementUnitId.value;
			// data.diameterMeasurementUnitsId = detailItemDiameterMeasurementUnitsId.value;
			data.diameterMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, diameterMeasurementUnitId.value);

			data.length = AppUtility.convertNumber(detailItemLength.value);
			data.lengthMeasurementUnitId = detailItemLengthMeasurementUnitId.value;
			// data.lengthMeasurementUnitsId = detailItemLengthMeasurementUnitsId.value;
			data.lengthMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, lengthMeasurementUnitId.value);

			data.pilotChute = detailItemPilotChute.value ?? false;
			data.pilotChuteCd = AppUtility.convertNumber(detailItemPilotChuteCd.value);
			data.pilotChuteDiameter = AppUtility.convertNumber(detailItemPilotChuteDiameter.value);

			data.pilotChuteDiameterMeasurementUnitId = detailItemPilotChuteDiameterMeasurementUnitId.value;
			// data.pilotChuteDiameterMeasurementUnitsId = detailItemPilotChuteDiameterMeasurementUnitsId.value;
			data.pilotChuteDiameterMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.length.id, pilotChuteDiameterMeasurementUnitId.value);

			if (!data.pilotChute) {
				data.pilotChuteCd = null;
				data.pilotChuteDiameter = null;

				data.pilotChuteDiameterMeasurementUnitId = null;
				data.pilotChuteDiameterMeasurementUnitsId = null;
			}
			
			const temp = AppUtility.measurementUnitTranslateLength(correlationId, detailItemDiameterMeasurementUnitsId.value, detailItemDiameterMeasurementUnitId.value);
			const temp2 = AppUtility.measurementUnitTranslateLength(correlationId, detailItemLengthMeasurementUnitId.value, detailItemLengthMeasurementUnitsId.value);
			data.sortName = String(data.diameter ?? '').padStart(4, '0') + temp + String(data.length ?? '').padStart(4, '0') + temp2 + (data.pilotChute ? 'Pilot' : '') + data.name;
		
			return data;
		},
		resetAdditional: (correlationId, orig) => {
			resetData(correlationId, orig);
		}
	});
	
	const detailItemDiameter = ref(null);
	const detailItemDiameterMeasurementUnitId = ref(null);
	const detailItemDiameterMeasurementUnitsId = ref(null);
	const detailItemLength = ref(null);
	const detailItemLengthMeasurementUnitId = ref(null);
	const detailItemLengthMeasurementUnitsId = ref(null);
	const detailItemPilotChute = ref(false);
	const detailItemPilotChuteCd = ref(null);
	const detailItemPilotChuteDiameter = ref(null);
	const detailItemPilotChuteDiameterMeasurementUnitId = ref(null);
	const detailItemPilotChuteDiameterMeasurementUnitsId = ref(null);

	const resetData = (correlationId, value) => {
		detailItemName.value = value ? value.name : LibraryClientUtility.$trans.t('forms.content.parts.blnaket.name');

		detailItemPilotChute.value = value ? value.pilotChute ?? false : false;
		detailItemPilotChuteCd.value = value ? value.pilotChuteCd : null;

		detailItemPilotChuteDiameter.value = value ? value.pilotChuteDiameter : null;
		detailItemPilotChuteDiameterMeasurementUnitId.value = value ? value.pilotChuteDiameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemPilotChuteDiameterMeasurementUnitsId.value = value ? value.pilotChuteDiameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
	
		detailItemDiameter.value = value ? value.diameter : null;
		detailItemDiameterMeasurementUnitId.value = value ? value.diameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemDiameterMeasurementUnitsId.value = value ? value.diameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemLength.value = value ? value.length : null;
		detailItemLengthMeasurementUnitId.value = value ? value.lengthMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		detailItemLengthMeasurementUnitsId.value = value ? value.lengthMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
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
		detailItemDiameter,
		detailItemDiameterMeasurementUnitId,
		detailItemDiameterMeasurementUnitsId,
		detailItemLength,
		detailItemLengthMeasurementUnitId,
		detailItemLengthMeasurementUnitsId,
		detailItemPilotChute,
		detailItemPilotChuteCd,
		detailItemPilotChuteDiameter,
		detailItemPilotChuteDiameterMeasurementUnitId,
		detailItemPilotChuteDiameterMeasurementUnitsId,
		scope: 'DeploymentBagPartControl',
		validation: useVuelidate({ $scope: 'DeploymentBagPartControl' })
	};
};
</script>
