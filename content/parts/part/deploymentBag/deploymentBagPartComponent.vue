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
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
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
		init: async (correlationId, value) => {
			resetData(correlationId, value);
		},
		manufacturerType: AppCommonConstants.Rocketry.ManufacturerTypes.deploymentBag,
		partsType: AppCommonConstants.Rocketry.PartTypes.deploymentBag, 
		preCompleteOkPart: (correlationId, data) => {
			data.diameter = Number(detailItemDiameter.value);
			data.length = Number(detailItemLength.value);

			data.diameterMeasurementUnitId = diameterMeasurementUnitId.value;
			data.diameterMeasurementUnitsId = diameterMeasurementUnitsId.value;

			data.lengthMeasurementUnitId = lengthMeasurementUnitId.value;
			data.lengthMeasurementUnitsId = lengthMeasurementUnitsId.value;

			data.pilotChute = detailItemPilotChute.value ?? false;
			data.pilotChuteCd = Number(detailItemPilotChuteCd.value);
			data.pilotChuteDiameter = Number(detailItemPilotChuteDiameter.value);

			data.pilotChuteDiameterMeasurementUnitId = pilotChuteDiameterMeasurementUnitId.value;
			data.pilotChuteDiameterMeasurementUnitsId = pilotChuteDiameterMeasurementUnitsId.value;

			if (!data.pilotChute) {
				data.pilotChuteCd = null;
				data.pilotChuteDiameter = null;

				data.pilotChuteDiameterMeasurementUnitId = null;
				data.pilotChuteDiameterMeasurementUnitsId = null;
			}
			
			const temp = AppUtility.measurementUnitTranslateLength(correlationId, diameterMeasurementUnitsId.value, diameterMeasurementUnitId.value);
			const temp2 = AppUtility.measurementUnitTranslateLength(correlationId, lengthMeasurementUnitId.value, lengthMeasurementUnitsId.value);
			data.sortName = String(data.diameter ?? '').padStart(4, '0') + temp + String(data.length ?? '').padStart(4, '0') + temp2 + (data.pilotChute ? 'Pilot' : '') + data.name;
		
			return data;
		},
		resetAdditional: (correlationId, orig) => {
			resetData(correlationId, orig);
		}
	});
	
	const detailItemDiameter = ref(null);
	const detailItemLength = ref(null);
	const detailItemPilotChute = ref(false);
	const detailItemPilotChuteCd = ref(null);
	const detailItemPilotChuteDiameter = ref(null);
	const diameterMeasurementUnitId = ref(null);
	const diameterMeasurementUnitsId = ref(null);
	const lengthMeasurementUnitId = ref(null);
	const lengthMeasurementUnitsId = ref(null);
	const pilotChuteDiameterMeasurementUnitId = ref(null);
	const pilotChuteDiameterMeasurementUnitsId = ref(null);

	const resetData = (correlationId, value) => {
		detailItemName.value = value ? value.name : LibraryClientUtility.$trans.t('forms.content.parts.blnaket.name');

		detailItemDiameter.value = value ? value.diameter : null;
		detailItemLength.value = value ? value.length : null;
		detailItemPilotChute.value = value ? value.pilotChute ?? false : false;
		detailItemPilotChuteCd.value = value ? value.pilotChuteCd : null;
		detailItemPilotChuteDiameter.value = value ? value.pilotChuteDiameter : null;
		
		diameterMeasurementUnitId.value = value ? value.diameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		diameterMeasurementUnitsId.value = value ? value.diameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		lengthMeasurementUnitId.value = value ? value.lengthMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		lengthMeasurementUnitsId.value = value ? value.lengthMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		pilotChuteDiameterMeasurementUnitId.value = value ? value.pilotChuteDiameterMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		pilotChuteDiameterMeasurementUnitsId.value = value ? value.pilotChuteDiameterMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
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
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
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
		detailItemDiameter,
		detailItemLength,
		detailItemPilotChute,
		detailItemPilotChuteCd,
		detailItemPilotChuteDiameter,
		diameterMeasurementUnitId,
		diameterMeasurementUnitsId,
		lengthMeasurementUnitId,
		lengthMeasurementUnitsId,
		pilotChuteDiameterMeasurementUnitId,
		pilotChuteDiameterMeasurementUnitsId,
		scope: 'DeploymentBagPartControl',
		validation: useVuelidate({ $scope: 'DeploymentBagPartControl' })
	};
};
</script>
