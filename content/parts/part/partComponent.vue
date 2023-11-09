<script>
import { computed, ref, watch } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';
import AppSharedConstants from '@/utility/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useDetailComponent } from '@/components/content/detailComponent';
import { useAdminComponent } from '@/components/content/adminComponent';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function usePartComponent(props, context, options) {
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
		resetAdditional
	} = useDetailComponent(props, context, {
		init: (correlationId, value) => {
			resetData(correlationId, value);

			if (options.init)
				options.init(correlationId, value);

			requestManufacturers(correlationId);
		},
		manufacturerType: options.manufacturerType,
		partsType: options.partsType,
		preCompleteOk : async (correlationId) => {
			detailItemData.value.description = String.trim(detailItemDescription.value);
			detailItemData.value.name = String.trim(detailItemName.value);

			detailItemData.value.typeId = options.partsType;
			detailItemData.value.manufacturerId = detailItemManufacturer.value;
			detailItemData.value.manufacturerStockId = detailItemManufacturerStockId.value;

			detailItemData.value.public = detailItemIsPublic.value ?? false;
			
			detailItemData.value.weight = AppUtility.convertNumber(detailItemWeight.value);
			detailItemData.value.weightMeasurementUnitId = detailItemWeightMeasurementUnitId.value;
			// detailItemData.value.weightMeasurementUnitsId = detailItemWeightMeasurementUnitsId.value;
			detailItemData.value.weightMeasurementUnitsId = measurementUnitsFromUnitId(correlationId, AppCommonConstants.MeasurementUnits.weight.id, detailItemWeightMeasurementUnitId.value);

			if (options.preCompleteOkPart)
			detailItemData.value = options.preCompleteOkPart(correlationId, detailItemData.value);

			const response = await serviceStore.dispatcher.savePart(correlationId, detailItemData.value);
			logger.debug('partComponent', 'preCompleteOk', 'response', response, correlationId);
			return response;
		},
		resetAdditional: (correlationId, orig) => {
			resetData(correlationId, orig);

			if (options.resetAdditional)
				options.resetAdditional(correlationId, orig);
		}
	});

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		// measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAreaDefaultId,
		measurementUnitsAreaType,
		measurementUnitsAltitudeDefaultId,
		measurementUnitsAltitudeType,
		measurementUnitsDensityDefaultId,
		measurementUnitsDensityType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
		measurementUnitsFluidType,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		measurementUnitsVolumeDefaultId,
		measurementUnitsVolumeType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		displayItemMeasurement,
		displayItemMeasurementLength,
		displayItemMeasurementWeight,
		measurementUnitsFromUnitId
	} = useToolsMeasurementBaseComponent(props, context);

	const {
		hasAdminDelete,
		hasAdminEdit,
		hasAdminRoles,
		isLoggedIn
	} = useAdminComponent(props, context, { role: 'parts:public'});

	const serviceParts = LibraryClientUtility.$injector.getService(AppSharedConstants.InjectorKeys.SERVICE_PARTS);

	const detailItemDescription = ref(null);
	const detailItemIsPublic = ref(null);
	const detailItemManufacturer = ref(null);
	const detailItemManufacturerStockId = ref(null);
	const detailItemName = ref(null);
	const detailItemWeight = ref(null);
	const detailItemWeightMeasurementUnitId = ref(null);
	const detailItemWeightMeasurementUnitsId = ref(null);
	const manufacturersI = ref(null);
	
	const manufacturers = computed(() => {
		return manufacturersI.value ? manufacturersI.value.map((item) => { return { id: item.id, name: item.name }; }) : [];
	});
	const canAdd = computed(() => {
		return !isNew.value && !dirty.value;
	});
	const isPublic = computed(() => {
		return detailItemData.value ? detailItemData.value.public ?? false : false;
	});

	const handleAdd = () => {
	};
	const requestManufacturers = async (correlationId) => {
		if (manufacturersI.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		let temp2 = response.results.filter(l => l.types.find(j => j === options.manufacturerType));
		temp2 = temp2.map((item) => { return { id: item.id, name: item.name, types: item.types}; });
		manufacturersI.value = temp2.sort((a, b) => a.name.localeCompare(b.name));
	}
	const resetData = (correlationId, value) => {
		detailItemDescription.value = value ? value.description : null;
		detailItemIsPublic.value = value ? value.public : null;
		detailItemManufacturer.value = value ? value.manufacturerId : null;
		detailItemManufacturerStockId.value = value? value.manufacturerStockId : null;
		detailItemName.value = value ? value.name : null;

		detailItemWeight.value = value ? value.weight : null;
		detailItemWeightMeasurementUnitId.value = value ? value.weightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		detailItemWeightMeasurementUnitsId.value = value ? value.weightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
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
		hasAdminRoles,
		isPublic,
		handleAdd,
		requestManufacturers
	};
};
</script>
