<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryCommonUtility from '@thzero/library_common/utility';

import RocketStageData from 'rocket_sidekick_common/data/rockets/stage';

import { useDetailSecondaryComponent } from '@/components/content/detailSecondaryComponent';
import { useRocketEditComponent } from '@/components/content/rockets/user/rocket/rocketEditComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
// import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
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
		handleAddSecondary
	} = useDetailSecondaryComponent(props, context, {
		deleteSecondary: async (correlationIdI, id) => {
			LibraryCommonUtility.deleteArrayById(detailItemData.value.stages, id);
			return success(correlationId);
		},
		dialogDeleteMessage: 'rockets.stage',
		init: async (correlationId, value) => {
			await requestManufacturers(correlationId);
			const temp = manufacturersI.value ? manufacturersI.value.find(l => l.isDefault) : null;
			manufacturerDefault.value = temp ? temp.id : null;
			resetData(correlationId, value);
		},
		initNewSecondary: async (correlationId) => {
			detailItemData.value.stages = detailItemData.value.stages ?? [];
			detailItemData.value.stages.push(new RocketStageData());
			return success(correlationId);
		},
		preCompleteOk : async (correlationId) => {
			// detailItemData.value.description = String.trim(detailItemDescription.value);
			// detailItemData.value.name = String.trim(detailItemName.value);
			// detailItemData.value.typeId = detailItemRocketType.value;
			
			// detailItemData.value.manufacturerId = detailItemManufacturer.value;
			// detailItemData.value.manufacturerStockId = detailItemManufacturerStockId.value;

			// detailItemData.value.cg = Number(detailItemCg.value);
			// detailItemData.value.cgFrom = detailItemCgFrom.value;
			// detailItemData.value.cgMeasurementUnitId = cgMeasurementUnitId.value;
			// detailItemData.value.cgMeasurementUnitsId = cgMeasurementUnitsId.value;

			// detailItemData.value.cp = Number(detailItemCp.value);
			// detailItemData.value.cpFrom = detailItemCpFrom.value;
			// detailItemData.value.cpMeasurementUnitId = cpMeasurementUnitId.value;
			// detailItemData.value.cpMeasurementUnitsId = cpMeasurementUnitsId.value;

			// detailItemData.value.diameterMajor = Number(detailItemDiameterMajor.value);
			// detailItemData.value.diameterMajorMeasurementUnitId = diameterMajorMeasurementUnitId.value;
			// detailItemData.value.diameterMajorMeasurementUnitsId = diameterMajorMeasurementUnitsId.value;
			
			// detailItemData.value.diameterMinor = Number(detailItemDiameterMinor.value);
			// detailItemData.value.diameterMinorMeasurementUnitId = diameterMinorMeasurementUnitId.value;
			// detailItemData.value.diameterMinorMeasurementUnitsId = diameterMinorMeasurementUnitsId.value;

			// detailItemData.value.length = Number(detailItemLength.value);
			// detailItemData.value.lengthMeasurementUnitId = lengthMeasurementUnitId.value;
			// detailItemData.value.lengthMeasurementUnitsId = lengthMeasurementUnitsId.value;
			
			// detailItemData.value.weight = Number(detailItemWeight.value);
			// detailItemData.value.weightMeasurementUnitId = weightMeasurementUnitId.value;
			// detailItemData.value.weightMeasurementUnitsId = weightMeasurementUnitsId.value;
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

	// const {
	// 	measurementUnitsAccelerationDefaultId,
	// 	measurementUnitsAccelerationType,
	// 	measurementUnitsAreaDefaultId,
	// 	measurementUnitsAreaType,
	// 	measurementUnitsDensityDefaultId,
	// 	measurementUnitsDensityType,
	// 	measurementUnitsDistanceType,
	// 	measurementUnitsDistanceDefaultId,
	// 	measurementUnitsFluidDefaultId,
	// 	measurementUnitsFluidType,
	// 	measurementUnitsLengthDefaultId,
	// 	measurementUnitsLengthType,
	// 	measurementUnitsVelocityDefaultId,
	// 	measurementUnitsVelocityType,
	// 	measurementUnitsVolumeDefaultId,
	// 	measurementUnitsVolumeType,
	// 	measurementUnitsWeightDefaultId,
	// 	measurementUnitsWeightType
	// } = useToolsMeasurementBaseComponent(props, context);

	// const cgMeasurementUnitId = ref(null);
	// const cgMeasurementUnitsId = ref(null);
	// const cpMeasurementUnitId = ref(null);
	// const cpMeasurementUnitsId = ref(null);
	// const detailItemDescription = ref(null);
	// const detailItemCg = ref(null);
	// const detailItemCgFrom = ref(null);
	// const detailItemCp = ref(null);
	// const detailItemCpFrom = ref(null);
	const detailItemDiameterMajor = ref(null);
	const detailItemDiameterMinor = ref(null);
	// const detailItemLength = ref(null);
	const detailItemManufacturer = ref(null);
	const detailItemManufacturerStockId = ref(null);
	// const detailItemName = ref(null);
	const detailItemRocketType = ref(null);
	// const detailItemWeight = ref(null);
	const diameterMajorMeasurementUnitId = ref(null);
	const diameterMajorMeasurementUnitsId = ref(null);
	const diameterMinorMeasurementUnitId = ref(null);
	const diameterMinorMeasurementUnitsId = ref(null);
	// const lengthMeasurementUnitId = ref(null);
	// const lengthMeasurementUnitsId = ref(null);
	const manufacturersI = ref(null);
	// const weightMeasurementUnitId = ref(null);
	// const weightMeasurementUnitsId = ref(null);
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

		// detailItemDescription.value = value ? value.description : null;
		// detailItemRocketType.value = value? value.typeId : AppCommonConstants.Rocketry.RocketTypes.highone;	
		// detailItemName.value = value ? value.name : null;
		
		// detailItemManufacturer.value = value && value.manufacturerId ? value.manufacturerId : manufacturerDefault.value; // 'd37HEk5Wjm3mmV4InK90U';
		// detailItemManufacturerStockId.value = value? value.manufacturerStockId : null;

		// detailItemCg.value = value ? value.cg : null;
		// detailItemCgFrom.value = value ? value.cgFrom : AppCommonConstants.Rocketry.Direction.Tip;
		// cgMeasurementUnitId.value = value ? value.cgMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		// cgMeasurementUnitsId.value = value ? value.cgMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		// detailItemCp.value = value ? value.cp : null;
		// detailItemCpFrom.value = value ? value.cpFrom : AppCommonConstants.Rocketry.Direction.Tip;
		// cpMeasurementUnitId.value = value ? value.cpMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		// cpMeasurementUnitsId.value = value ? value.cpMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		// detailItemDiameterMajor.value = value ? value.diameterMajor : null;
		// diameterMajorMeasurementUnitId.value = value ? value.diameterMajorMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		// diameterMajorMeasurementUnitsId.value = value ? value.diameterMajorMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
		
		// detailItemDiameterMinor.value = value ? value.diameterMinor : null;
		// diameterMinorMeasurementUnitId.value = value ? value.diameterMinorMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		// diameterMinorMeasurementUnitsId.value = value ? value.diameterMinorMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		// detailItemLength.value = value ? value.length : null;
		// lengthMeasurementUnitId.value = value ? value.lengthMeasurementUnitId ?? measurementUnitsLengthDefaultId.value : measurementUnitsLengthDefaultId.value;
		// lengthMeasurementUnitsId.value = value ? value.lengthMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;

		// detailItemWeight.value = value ? value.weight : null;
		// weightMeasurementUnitId.value = value ? value.weightMeasurementUnitId ?? measurementUnitsWeightDefaultId.value : measurementUnitsWeightDefaultId.value;
		// weightMeasurementUnitsId.value = value ? value.weightMeasurementUnitsId ?? measurementUnitsIdSettings.value : measurementUnitsIdSettings.value;
	};
	const setData = (correlationId) => {
		detailItemData.value.typeId = detailItemRocketType.value;
		
		detailItemData.value.manufacturerId = detailItemManufacturer.value;
		detailItemData.value.manufacturerStockId = detailItemManufacturerStockId.value;

		detailItemData.value.diameterMajor = Number(detailItemDiameterMajor.value);
		detailItemData.value.diameterMajorMeasurementUnitId = diameterMajorMeasurementUnitId.value;
		detailItemData.value.diameterMajorMeasurementUnitsId = diameterMajorMeasurementUnitsId.value;
		
		detailItemData.value.diameterMinor = Number(detailItemDiameterMinor.value);
		detailItemData.value.diameterMinorMeasurementUnitId = diameterMinorMeasurementUnitId.value;
		detailItemData.value.diameterMinorMeasurementUnitsId = diameterMinorMeasurementUnitsId.value;

		setEditData(correlationId);
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
