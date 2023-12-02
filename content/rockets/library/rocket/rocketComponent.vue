<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryCommonUtility from '@thzero/library_common/utility';

import RocketStage from 'rocket_sidekick_common/data/rockets/stage';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentMarkupComponent } from '@/components/content/contentMarkup';
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
			// const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);
			// LibraryCommonUtility.deleteArrayById(temp.stages, id);

			// temp.stages = temp.stages.sort((a, b) => a.index >= b.index);
			// let index = 0;
			// for (const item of temp.stages)
			// 	item.index = index++;
			// // detailItemData.value.stages = stages;
			
			// const response = await serviceStore.dispatcher.saveRocketStageDelete(correlationId, detailItemData.value);
			const response = await serviceStore.dispatcher.saveRocketStageDelete(correlationId, detailItemData.value, id);
			logger.debug('useRocketComponent', 'dialogDeleteSecondaryOk', 'response', response, correlationId);
			return response;
		},
		dialogEditSecondaryPreCompleteOk : async (correlationId, item) => {
			// const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);
			// temp.stages = LibraryCommonUtility.updateArrayByObject(detailItemData.value.stages, item);
			
			const response = await serviceStore.dispatcher.saveRocketStage(correlationId, detailItemData.value, item);
			logger.debug('useRocketComponent', 'dialogEditSecondaryPreCompleteOk', 'response', response, correlationId);
			
			// detailItem.value.data = response.results;
			return response;
		},
		init: async (correlationId, value) => {
			const temp = manufacturers.value ? manufacturers.value.find(l => l.isDefault) : null;
			manufacturerDefault.value = temp ? temp.id : null;

			const temp2 = await serviceStore.getters.getRocketsExpanded();
			const temp3 = temp2[panelsKey(value)];
			panels.value = temp3 ?? [];

			const temp4 = await serviceStore.getters.getRocketsExpanded();
			const temp5 = temp4[stagesPanelsKey(value)];
			stagesPanels.value = temp5 ?? [];
			
			resetData(correlationId, value);
		},
		initNewSecondary: async (correlationId) => {
			detailItemData.value.stages = detailItemData.value.stages ?? [];
			const rocketStage = new RocketStage(detailItemData.value.stages.length);
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
		rocketCg,
		rocketCp,
		rocketDiameter,
		rocketLength,
		rocketMotors,
		rocketStagePrimary,
		rocketStages,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rocketWeight
	} = useRocketsUtilityComponent(props, context, options);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		markupHint
	} = useContentMarkupComponent(props, context);
	
	const detailItemDescription = ref(null);
	const detailItemManufacturer = ref(null);
	const detailItemManufacturerStockId = ref(null);
	const detailItemName = ref(null);
	const detailItemRocketType = ref(null);
	const manufacturerDefault = ref(null);
	const panels = ref([]);
	const panelsId = ref([ 
		{ id: 'altimeters', text: 'forms.content.parts.altimeter.plural' },
		{ id: 'recovery', text: 'forms.content.parts.recovery' },
		{ id: 'trackers', text: 'forms.content.parts.tracker.plural' },
		{ id: 'stages', text: 'forms.content.rockets.stage.plural' },
	]);
	const stagesPanels = ref([]);
	
	const manufacturers = computed(() => {
		return props.manufacturers ? props.manufacturers : [];
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
	
	const dialogEditPreCompleteOkRocketParts = async (correlationId, item) => {
		// const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);
		// const stage = temp.stages.find(l => l.id === item.stageId);
		// if (!stage)
		// 	return error('useRocketComponent', 'dialogEditPreCompleteOkRocketParts', `Invalid stage for '${item.stageId}'.`, null, null, null, correlationId);

		// if (item.typeId === AppCommonConstants.Rocketry.PartTypes.altimeter)
		// 	stage.altimeters = LibraryCommonUtility.updateArrayByObject(stage.altimeters, item.item);
		// else if (item.typeId === AppCommonConstants.Rocketry.PartTypes.chuteProtector)
		// 	stage.chuteProtectors = LibraryCommonUtility.updateArrayByObject(stage.chuteProtectors, item.item);
		// else if (item.typeId === AppCommonConstants.Rocketry.PartTypes.chuteRelease)
		// 	stage.chuteReleases = LibraryCommonUtility.updateArrayByObject(stage.chuteReleases, item.item);
		// else if (item.typeId === AppCommonConstants.Rocketry.PartTypes.deploymentBag)
		// 	stage.deploymentBags = LibraryCommonUtility.updateArrayByObject(stage.deploymentBags, item.item);
		// else if (item.typeId === AppCommonConstants.Rocketry.PartTypes.parachute)
		// 	stage.parachutes = LibraryCommonUtility.updateArrayByObject(stage.parachutes, item.item);
		// else if (item.typeId === AppCommonConstants.Rocketry.PartTypes.streamer)
		// 	stage.streamers = LibraryCommonUtility.updateArrayByObject(stage.streamers, item.item);
		// else if (item.typeId === AppCommonConstants.Rocketry.PartTypes.tracker)
		// 	stage.trackers = LibraryCommonUtility.updateArrayByObject(stage.trackers, item.item);

		const response = await serviceStore.dispatcher.saveRocketStagePart(correlationId, detailItemData.value, item);
		logger.debug('useRocketComponent', 'dialogEditPreCompleteOkRocketParts', 'response', response, correlationId);
		detailItem.value.data = response.results;
		return response;
	};
	const panelsKey = (value) => {
		return value ? value.id : detailItemData.value ? detailItemData.value.id : null;
	};
	const panelsUpdated = async (value) => {
		await serviceStore.dispatcher.setRocketsExpanded(correlationId(), { id: panelsKey(), expanded: value });
	};
	const resetData = (correlationId, value) => {
		detailItemRocketType.value = value ? value.rocketTypes : null;	

		detailItemDescription.value = value ? value.description : null;
		
		detailItemManufacturer.value = value && value.manufacturerId ? value.manufacturerId : manufacturerDefault.value; // 'd37HEk5Wjm3mmV4InK90U';
		detailItemManufacturerStockId.value = value ? value.manufacturerStockId : null;

		detailItemName.value = value ? value.name : null;
	};
	const setData = (correlationId) => {
		detailItemData.value.rocketTypes = detailItemRocketType.value;

		detailItemData.value.description = detailItemDescription.value;
		
		detailItemData.value.manufacturerId = detailItemManufacturer.value;
		detailItemData.value.manufacturerStockId = detailItemManufacturerStockId.value;

		detailItemData.value.name = detailItemName.value;
	};
	const stagesPanelsKey = (value) => {
		const temp = value ? value.id : detailItemData.value ? detailItemData.value.id : null;
		if (temp)
			return temp + '-stages';
		return null;
	};
	const stagesPanelsUpdated = async (value) => {
		await serviceStore.dispatcher.setRocketsExpanded(correlationId(), { id: stagesPanelsKey(), expanded: value });
	};
	const updateStage = async(correlationId, stage) => {
		const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);

		temp.stages = LibraryCommonUtility.updateArrayByObject(temp.stages, stage);

		temp.stages.forEach(element => {
			if (element.primary) {
				element.index = 0;
				return;
			}

			element.index = LibraryCommonUtility.isNotNull(element.index) ? element.index : Number.MAX_SAFE_INTEGER;
		});

		temp.stages = temp.stages.sort((a, b) => a.index >= b.index);
		let index = 0;
		for (const item of temp.stages)
			item.index = index++;
		detailItem.value.stages = stages;

		index = 0;
		temp.stages.forEach(element => {
			element.index = index++;
		});

		const response = await serviceStore.dispatcher.saveRocketStage(correlationId, temp);
		logger.debug('useRocketComponent', 'updateStage', 'response', response, correlationId);
		if (hasFailed(response))
			return response;

		detailItemData.value.stages = response.results.stages;
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
		markupHint,
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
		dialogEditPreCompleteOkRocketParts,
		panelsUpdated,
		stagesPanelsUpdated,
		updateStage,
		scope: 'RocketControl',
		validation: useVuelidate({ $scope: 'RocketControl' })
	};
};
</script>
