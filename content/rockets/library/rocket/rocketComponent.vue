<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryCommonUtility from '@thzero/library_common/utility';

import RocketStageData from 'rocket_sidekick_common/data/rockets/stage';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useDetailSecondaryComponent } from '@/components/content/detailSecondaryComponent';
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

			const temp2 = await serviceStore.getters.getRocketsExpanded();
			const temp3 = temp2[panelsLKey(value)];
			panels.value = temp3 ?? [];

			const temp4 = await serviceStore.getters.getRocketsExpanded();
			const temp5 = temp4[stagesPanelsLKey(value)];
			stagesPanels.value = temp5 ?? [];
			
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
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

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
	
	const detailItemDescription = ref(null);
	const detailItemManufacturer = ref(null);
	const detailItemManufacturerStockId = ref(null);
	const detailItemName = ref(null);
	const detailItemRocketType = ref(null);
	const manufacturersI = ref(null);
	const manufacturerDefault = ref(null);
	const manufacturerType = ref(AppCommonConstants.Rocketry.ManufacturerTypes.rocket);
	const panels = ref([]);
	const panelsId = ref([ 
		{ id: 'altimeters', text: 'forms.content.parts.altimeter.plural' },
		{ id: 'recovery', text: 'forms.content.parts.recovery' },
		{ id: 'trackers', text: 'forms.content.parts.tracker.plural' },
		{ id: 'stages', text: 'forms.content.rockets.stage.plural' },
	]);
	const stagesPanels = ref([]);
	
	const manufacturers = computed(() => {
		return manufacturersI.value ? manufacturersI.value.map((item) => { return { id: item.id, name: item.name }; }) : [];
	});
	const hasAdmin = computed(() => {
		return false;
	});
	const rocketId = computed(() => {
		return detailItemData.value ? detailItemData.value.id : [];
	});
	const stages = computed(() => {
		return detailItemData.value ? detailItemData.value.stages : [];
	});
	
	const panelsLKey = (value) => {
		return value ? value.id : detailItemData.value ? detailItemData.value.id : null;
	};
	const panelsUpdated = async (value) => {
		await serviceStore.dispatcher.setRocketsExpanded(correlationId(), { id: panelsLKey(), expanded: value });
	};
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

		detailItemDescription.value = value ? value.description : null;
		
		detailItemManufacturer.value = value && value.manufacturerId ? value.manufacturerId : manufacturerDefault.value; // 'd37HEk5Wjm3mmV4InK90U';
		detailItemManufacturerStockId.value = value ? value.manufacturerStockId : null;

		detailItemName.value = value ? value.name : null;
	};
	const setData = (correlationId) => {
		detailItemData.value.typeId = detailItemRocketType.value;

		detailItemData.value.description = detailItemDescription.value;
		
		detailItemData.value.manufacturerId = detailItemManufacturer.value;
		detailItemData.value.manufacturerStockId = detailItemManufacturerStockId.value;

		detailItemData.value.name = detailItemName.value;
	};
	const stagesPanelsLKey = (value) => {
		const temp = value ? value.id : detailItemData.value ? detailItemData.value.id : null;
		if (temp)
			return temp + '-stages';
		return null;
	};
	const stagesPanelsUpdated = async (value) => {
		await serviceStore.dispatcher.setRocketsExpanded(correlationId(), { id: stagesPanelsLKey(), expanded: value });
	};
	const updateStage = async(correlationId, stage) => {
		const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);

		temp.stages = LibraryCommonUtility.updateArrayByObject(temp.stages, stage);

		const response = await serviceStore.dispatcher.saveRocket(correlationId, temp);
		logger.debug('useRocketComponent', 'selectPart', 'response', response, correlationId);
		if (hasFailed(response))
			return response;

		detailItemData.value.stages = temp.stages;
		return response;
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
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		detailItemDescription,
		detailItemManufacturer,
		detailItemManufacturerStockId,
		detailItemName,
		detailItemRocketType,
		manufacturers,
		panels,
		panelsId,
		stagesPanels,
		hasAdmin,
		rocketId,
		stages,
		panelsUpdated,
		requestManufacturers,
		stagesPanelsUpdated,
		updateStage,
		scope: 'RocketControl',
		validation: useVuelidate({ $scope: 'RocketControl' })
	};
};
</script>
