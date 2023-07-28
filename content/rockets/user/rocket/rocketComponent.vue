<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryCommonUtility from '@thzero/library_common/utility';

import RocketStageData from 'rocket_sidekick_common/data/rockets/stage';

import { useDetailSecondaryComponent } from '@/components/content/detailSecondaryComponent';
import { useRocketEditComponent } from '@/components/content/rockets/user/rocket/rocketEditComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketComponent(props, context, options) {
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
		dialogDeleteSecondaryManager,
		dialogDeleteSecondaryMessage,
		dialogDeleteSecondaryParams,
		dialogEditSecondaryManager,
		dialogEditSecondaryParams,
		canAddSecondary,
		canDeleteSecondary,
		canEditSecondary,
		isDeletingSecondary,
		isEditingSecondary,
		dialogDeleteSecondaryCancel,
		dialogDeleteSecondaryError,
		dialogDeleteSecondaryOk,
		dialogDeleteSecondaryOpen,
		dialogEditSecondaryCancel,
		dialogEditSecondaryError,
		dialogEditSecondaryOk,
		dialogEditSecondaryOpen,
		dialogEditSecondaryPreCompleteOk,
		handleAddSecondary
	} = useDetailSecondaryComponent(props, context, {
		dialogDeleteMessage: 'rockets.stage',
		dialogDeleteSecondaryOk: async (correlationId, id) => {
			LibraryCommonUtility.deleteArrayById(detailItemData.value.stages, id);
			
			const response = await serviceStore.dispatcher.saveRocket(correlationId, detailItemData.value);
			logger.debug('rocketComponent', 'dialogDeleteSecondaryOk', 'response', response, correlationId);
			return response;
		},
		dialogEditSecondaryPreCompleteOk : async (correlationId, item) => {
			detailItemData.value.stages = LibraryCommonUtility.updateArrayByObject(detailItemData.value.stages, item);
			
			const response = await serviceStore.dispatcher.saveRocket(correlationId, detailItemData.value);
			logger.debug('rocketComponent', 'dialogEditSecondaryPreCompleteOk', 'response', response, correlationId);
			return response;
		},
		init: async (correlationId, value) => {
			await requestManufacturers(correlationId);
			const temp = manufacturersI.value ? manufacturersI.value.find(l => l.isDefault) : null;
			manufacturerDefault.value = temp ? temp.id : null;
			resetData(correlationId, value);
		},
		initNewSecondary: async (correlationId) => {
			detailItemData.value.stages = detailItemData.value.stages ?? [];
			const rocketStage = new RocketStageData();
			rocketStage.rocketId = detailItemData.value.id;

			// Instead of adding immediately, just open the dialog...
			// detailItemData.value.stages.push(rocketStage);
			
			// const response = await serviceStore.dispatcher.saveRocket(correlationId, detailItemData.value);
			// logger.debug('rocketComponent', 'initNewSecondary', 'response', response, correlationId);
			// return response;

			// Open the dialog...
			dialogEditSecondaryOpen(rocketStage);
		},
		preCompleteOk : async (correlationId) => {
			setData(correlationId);

			const response = await serviceStore.dispatcher.saveRocket(correlationId, detailItemData.value);
			logger.debug('rocketComponent', 'preCompleteOk', 'response', response, correlationId);
			return response;
		},
		resetAdditional: (correlationId, orig) => {
			resetData(correlationId, orig);
		}
	});

	const {
		rocketTypes,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketsUtilityComponent(props, context, options);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);
	
	const {
		cgMeasurementUnitId,
		cgMeasurementUnitsId,
		cpMeasurementUnitId,
		cpMeasurementUnitsId,
		detailItemCg,
		detailItemCgFrom,
		detailItemCp,
		detailItemCpFrom,
		detailItemDescription,
		detailItemLength,
		detailItemName,
		detailItemWeight,
		lengthMeasurementUnitId,
		lengthMeasurementUnitsId,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		resetEditData,
		setEditData
	} =  useRocketEditComponent(props, context, options);

	const detailItemDiameterMajor = ref(null);
	const detailItemDiameterMinor = ref(null);
	const detailItemManufacturer = ref(null);
	const detailItemManufacturerStockId = ref(null);
	const detailItemRocketType = ref(null);
	const diameterMajorMeasurementUnitId = ref(null);
	const diameterMajorMeasurementUnitsId = ref(null);
	const diameterMinorMeasurementUnitId = ref(null);
	const diameterMinorMeasurementUnitsId = ref(null);
	const manufacturersI = ref(null);
	const manufacturerDefault = ref(null);
	const manufacturerType = ref(AppCommonConstants.Rocketry.ManufacturerTypes.rocket);
	
	const manufacturers = computed(() => {
		return manufacturersI.value ? manufacturersI.value.map((item) => { return { id: item.id, name: item.name }; }) : [];
	});
	const hasAdmin = computed(() => {
		return false;
	});
	const stages = computed(() => {
		return detailItemData.value ? detailItemData.value.stages : [{}];
	});
	
	const requestManufacturers = async (correlationId) => {
		if (manufacturersI.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		let temp2 = response.results.filter(l => l.types.find(j => j === manufacturerType.value));
		temp2 = temp2.map((item) => { return { id: item.id, name: item.name, isDefault: item.isDefault }; });
		manufacturersI.value = temp2.sort((a, b) => a.name.localeCompare(b.name));
	};
	const resetData = (correlationId, value) => {
		detailItemRocketType.value = value? value.typeId : AppCommonConstants.Rocketry.RocketTypes.highone;	
		
		detailItemManufacturer.value = value && value.manufacturerId ? value.manufacturerId : manufacturerDefault.value; // 'd37HEk5Wjm3mmV4InK90U';
		detailItemManufacturerStockId.value = value? value.manufacturerStockId : null;

		detailItemDiameterMajor.value = value ? value.diameterMajor : null;
		diameterMajorMeasurementUnitId.value = value ? value.diameterMajorMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		diameterMajorMeasurementUnitsId.value = value ? value.diameterMajorMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		detailItemDiameterMinor.value = value ? value.diameterMinor : null;
		diameterMinorMeasurementUnitId.value = value ? value.diameterMinorMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		diameterMinorMeasurementUnitsId.value = value ? value.diameterMinorMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		resetEditData(correlationId, value);
	};
	const setData = (correlationId) => {
		detailItemData.value.typeId = detailItemRocketType.value;
		
		detailItemData.value.manufacturerId = detailItemManufacturer.value;
		detailItemData.value.manufacturerStockId = detailItemManufacturerStockId.value;

		detailItemData.value.diameterMajor = AppUtility.convertNumber(detailItemDiameterMajor.value);
		detailItemData.value.diameterMajorMeasurementUnitId = diameterMajorMeasurementUnitId.value;
		detailItemData.value.diameterMajorMeasurementUnitsId = diameterMajorMeasurementUnitsId.value;
		
		detailItemData.value.diameterMinor = AppUtility.convertNumber(detailItemDiameterMinor.value);
		detailItemData.value.diameterMinorMeasurementUnitId = diameterMinorMeasurementUnitId.value;
		detailItemData.value.diameterMinorMeasurementUnitsId = diameterMinorMeasurementUnitsId.value;

		setEditData(correlationId, detailItemData.value);
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
		dialogDeleteSecondaryManager,
		dialogDeleteSecondaryMessage,
		dialogDeleteSecondaryParams,
		dialogEditSecondaryManager,
		dialogEditSecondaryParams,
		canAddSecondary,
		canDeleteSecondary,
		canEditSecondary,
		isDeletingSecondary,
		isEditingSecondary,
		dialogDeleteSecondaryCancel,
		dialogDeleteSecondaryError,
		dialogDeleteSecondaryOk,
		dialogDeleteSecondaryOpen,
		dialogEditSecondaryCancel,
		dialogEditSecondaryError,
		dialogEditSecondaryOk,
		dialogEditSecondaryOpen,
		dialogEditSecondaryPreCompleteOk,
		handleAddSecondary,
		rocketTypes,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		cgMeasurementUnitId,
		cgMeasurementUnitsId,
		cpMeasurementUnitId,
		cpMeasurementUnitsId,
		detailItemCg,
		detailItemCgFrom,
		detailItemCp,
		detailItemCpFrom,
		detailItemDescription,
		detailItemLength,
		detailItemName,
		detailItemWeight,
		lengthMeasurementUnitId,
		lengthMeasurementUnitsId,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		weightMeasurementUnitId,
		weightMeasurementUnitsId,
		resetEditData,
		setEditData,
		detailItemDiameterMajor,
		detailItemDiameterMinor,
		detailItemManufacturer,
		detailItemManufacturerStockId,
		detailItemRocketType,
		diameterMajorMeasurementUnitId,
		diameterMajorMeasurementUnitsId,
		diameterMinorMeasurementUnitId,
		diameterMinorMeasurementUnitsId,
		manufacturers,
		hasAdmin,
		stages,
		requestManufacturers,
		scope: 'RocketControl',
		validation: useVuelidate({ $scope: 'RocketControl' })
	};
};
</script>
