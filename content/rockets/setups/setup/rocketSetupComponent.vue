<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import RocketSetupStageData from 'rocket_sidekick_common/data/rockets/setups/stage';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentMarkupComponent } from '@/components/content/contentMarkup';
import { useDetailSecondaryComponent } from '@/components/content/detailSecondaryComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketSetupComponent(props, context, options) {
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
			const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);
			LibraryCommonUtility.deleteArrayById(temp.stages, id);
			
			const response = await serviceStore.dispatcher.saveRocketSetup(correlationId, temp);
			logger.debug('rocketSetupComponent', 'dialogDeleteSecondaryOk', 'response', response, correlationId);
			return response;
		},
		dialogEditSecondaryPreCompleteOk : async (correlationId, item) => {
			const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);
			temp.stages = LibraryCommonUtility.updateArrayByObject(temp.stages, item);
			
			const response = await serviceStore.dispatcher.saveRocketSetup(correlationId, temp);
			logger.debug('rocketSetupComponent', 'dialogEditSecondaryPreCompleteOk', 'response', response, correlationId);
			if (hasFailed(response))
				return response;

			return response;
		},
		init: async (correlationId, value) => {
			const temp = manufacturers.value ? manufacturers.value.find(l => l.isDefault) : null;
			manufacturerDefault.value = temp ? temp.id : null;

			const temp2 = await serviceStore.getters.getRocketSetupsExpanded();
			const temp3 = temp2[panelsKey(value)];
			panels.value = temp3 ?? [];

			const temp4 = await serviceStore.getters.getRocketSetupsExpanded();
			const temp5 = temp4[stagesPanelsKey(value)];
			stagesPanels.value = temp5 ?? [];
			
			resetData(correlationId, value);
		},
		initNewSecondary: async (correlationId) => {
			detailItemData.value.stages = detailItemData.value.stages ?? [];
			const rocketSetupStage = new RocketSetupStageData();
			rocketSetupStage.rocketId = detailItemData.value.id;

			// Instead of adding immediately, just open the dialog...
			// detailItemData.value.stages.push(rocketStage);
			
			// const response = await serviceStore.dispatcher.saveRocket(correlationId, detailItemData.value);
			// logger.debug('rocketComponent', 'initNewSecondary', 'response', response, correlationId);
			// return response;

			// Open the dialog...
			dialogEditSecondaryOpen(rocketSetupStage);
		},
		preCompleteOk : async (correlationId) => {
			setData(correlationId);

			const response = await serviceStore.dispatcher.saveRocketSetup(correlationId, detailItemData.value);
			logger.debug('rocketSetupComponent', 'preCompleteOk', 'response', response, correlationId);
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
		rocketTypes
	} = useRocketsUtilityComponent(props, context, options);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		markupHint
	} = useContentMarkupComponent(props, context);
	
	const dialogDeleteConfirmationManager = ref(new DialogSupport());
	const dialogDeleteConfirmationMessage = ref(null);
	const dialogDeleteConfirmationParams = ref(null);
	const dialogRocketLookupManager = ref(new DialogSupport());

	const detailItemDescription = ref(null);
	const detailItemName = ref(null);
	const detailItemNotes = ref(null);
	const detailItemRocketId = ref(null);
	const detailItemRocketName = ref(null);
	const detailItemType = ref(null);
	const manufacturerDefault = ref(null);
	const panels = ref([]);
	const panelsId = ref([ 
		{ id: 'altimeters', text: 'forms.content.parts.altimeter.plural' },
		{ id: 'recovery', text: 'forms.content.parts.recovery' },
		{ id: 'trackers', text: 'forms.content.parts.tracker.plural' },
		{ id: 'stages', text: 'forms.content.rockets.stage.plural' },
	]);
	const stagesPanels = ref([]);
	const types = ref([]);
	
	const manufacturers = computed(() => {
		return props.manufacturers ? props.manufacturers : [];
	});
	const hasAdmin = computed(() => {
		return false;
	});
	const rocketId = computed(() => {
		return detailItemData.value ? detailItemData.value.id : '';
	});
	const stages = computed(() => {
		return detailItemData.value ? detailItemData.value.stages.filter(l => l.enabled) : [];
	});
	
	const clickRemoveLocation = async (item) => {
		dialogDeleteConfirmationParams.value = { id: detailItemLocationId.value, type: 'location' };
		dialogDeleteConfirmationManager.value.open();
	};
	const clickRemoveRocket = async (item) => {
		dialogDeleteConfirmationParams.value = { id: detailItemRocketId.value, type: 'rocket' };
		dialogDeleteConfirmationManager.value.open();
	};
	const clickRemoveRocketSetup = async (item) => {
		dialogDeleteConfirmationParams.value = { id: detailItemRocketSetupId.value, type: 'rocketSetup' };
		dialogDeleteConfirmationManager.value.open();
	};
	const clickSearchRockets = async (correlationId) => {
		dialogRocketLookupManager.value.open();
	};
	const clickViewRocket = async (item) => {
		if (!item)
			return;
		LibraryClientUtility.$navRouter.push('/user/rockets/' + item.rocket.id);
	};
	const dialogDeleteConfirmationCancel = async (item) => {
		try {
			dialogDeleteConfirmationManager.value.cancel();
		}
		finally {
			dialogDeleteConfirmationParams.id = null;
		}
	};
	const dialogDeleteConfirmationError = async (err) => {
		try {
			dialogDeleteConfirmationManager.value.cancel();
		}
		finally {
			dialogDeleteConfirmationParams.id = null;
		}
	};
	const dialogDeleteConfirmationOk = async (correlationId) => {
		try {
			if (!dialogDeleteConfirmationParams.value.type)
				return;

			if (dialogDeleteConfirmationParams.value.type === 'location') {
				await removeLocation(correlationId);
				return;
			}
			else if (dialogDeleteConfirmationParams.value.type === 'rocket') {
				await removeRocket(correlationId);
				return;
			}
			else if (dialogDeleteConfirmationParams.value.type === 'rocketSetup') {
				await removeRocketSetup(correlationId);
				return;
			}
		}
		finally {
			dialogDeleteConfirmationParams.id = null;
			dialogDeleteConfirmationManager.value.ok();
		}
	};
	const dialogDeleteConfirmationOpen = (item) => {
		if (!item)
			return;
		if (!canDelete(item)) {
			setNotify(correlationId(), 'errors.security');
			return;
		}

		dialogDeleteConfirmationParams.id = item.id;
		dialogDeleteConfirmationManager.value.open();
	};
	const panelsKey = (value) => {
		return value ? value.id : detailItemData.value ? detailItemData.value.id : null;
	};
	const panelsUpdated = async (value) => {
		await serviceStore.dispatcher.setRocketSetupsExpanded(correlationId(), { id: panelsKey(), expanded: value });
	};
	const removeRocket = async () => {
		detailItemRocketId.value = null;
		detailItemRocketName.value = null;
	};
	const resetData = (correlationId, value) => {
		detailItemDescription.value = value ? value.description : null;
		detailItemName.value = value ? value.name : null;
		detailItemNotes.value = value ? value.notes : null;

		if (value && value.rocket) {
			detailItemRocketId.value = value.rocket.id;
			detailItemRocketName.value = value.rocket.name;
			
			if (value.rocket.rocketTypes)
				types.value = rocketTypes.value.filter(l => value.rocket.rocketTypes.indexOf(l.id) > -1);
		
			detailItemType.value = value.typeId;
		}
		else {
			detailItemRocketId.value = null;
			detailItemRocketName.value = null;
			detailItemType.value = null;

			types.value = [];
		}
	};
	const selectRocket = async (item) => {
		try {
			if (!item)
				return error('useRocketSetupsBaseComponent', 'selectRocket', 'Invalid item.', null, null, null, correlationId);

			detailItemRocketId.value = item.id;
			detailItemRocketName.value = item.name;

			types.value = rocketTypes.value.filter(l => item.rocketTypes.indexOf(l.id) > -1);
		
			detailItemType.value = null;

			detailItemData.value.rocket = item;
		}
		finally {
			dialogRocketLookupManager.value.ok();
		}
	};
	const setData = (correlationId) => {
		detailItemData.value.description = detailItemDescription.value;
		detailItemData.value.name = detailItemName.value;
		detailItemData.value.notes = detailItemNotes.value;

		detailItemData.value.rocketId = detailItemRocketId.value;
		detailItemData.value.typeId = detailItemType.value;		
	};
	const stagesPanelsKey = (value) => {
		const temp = value ? value.id : detailItemData.value ? detailItemData.value.id : null;
		if (temp)
			return temp + '-stages';
		return null;
	};
	const stagesPanelsUpdated = async (value) => {
		await serviceStore.dispatcher.setRocketSetupsExpanded(correlationId(), { id: stagesPanelsKey(), expanded: value });
	};
	const updateStage = async(correlationId, stage) => {
		const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);

		temp.stages = LibraryCommonUtility.updateArrayByObject(temp.stages, stage);

		const response = await serviceStore.dispatcher.saveRocketSetup(correlationId, temp);
		logger.debug('useRocketSetupComponent', 'updateStage', 'response', response, correlationId);
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
		dialogDeleteConfirmationManager,
		dialogDeleteConfirmationMessage,
		dialogDeleteConfirmationParams,
		dialogRocketLookupManager,
		detailItemDescription,
		detailItemName,
		detailItemNotes,
		detailItemRocketId,
		detailItemRocketName,
		detailItemType,
		manufacturers,
		panels,
		panelsId,
		stagesPanels,
		types,
		hasAdmin,
		rocketId,
		stages,
		clickRemoveRocket,
		clickSearchRockets,
		clickViewRocket,
		dialogDeleteConfirmationCancel,
		dialogDeleteConfirmationError,
		dialogDeleteConfirmationOk,
		dialogDeleteConfirmationOpen,
		panelsUpdated,
		stagesPanelsUpdated,
		selectRocket,
		updateStage,
		scope: 'RocketSetupControl',
		validation: useVuelidate({ $scope: 'RocketSetupControl' })
	};
};
</script>
