<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants.js';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import ChecklistStepData from 'rocket_sidekick_common/data/checklists/step';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useDetailSecondaryComponent } from '@/components/content/detailSecondaryComponent';
import { useLocationsUtilityComponent } from '@/components/content/locations/locationUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useChecklistComponent(props, context, options) {
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
		handleAddSecondary
	} = useDetailSecondaryComponent(props, context, {
		deleteSecondary: async (correlationIdI, id) => {
			LibraryCommonUtility.deleteArrayById(detailItemData.value.steps, id);
			return success(correlationId);
		},
		dialogDeleteMessage: 'checklists.step',
		init: (correlationId, value) => {
			// detailItemDescription.value = value ? value.description : null;
			// detailItemIsDefault.value = value ? value.isDefault : null;
			// detailItemName.value = value ? value.name : null;
			resetData(correlationId, value);
		},
		initNewSecondary: async (correlationId) => {
			detailItemData.value.stages = detailItemData.value.stages ?? [];
			detailItemData.value.stages.push(new ChecklistStepData());
			return success(correlationId);
		},
		preCompleteOk: async (correlationId) => {
			setData(correlationId);

			const response = await serviceStore.dispatcher.saveChecklist(correlationId, detailItemData.value);
			logger.debug('checklistComponent', 'preCompleteOk', 'response', response, correlationId);
			return response;
		},
		resetAdditional: (correlationId, orig) => {
			// detailItemDescription.value = orig ? orig.description : null;
			// detailItemIsDefault.value = orig ? orig.isDefault : null;
			// detailItemName.value = orig ? orig.name : null;
			resetData(correlationId, orig);
		}
	});

	const {
		isAdmin,
		isOwner,
		isPublic,
		isPublicDisplay,
		isUser
	} = useContentSecurityComponent(props, context);

	const {
		location,
		locationIterations,
		locationIterationName
	} = useLocationsUtilityComponent(props, context);

	const {
		rocketMotorNames
	} = useRocketsUtilityComponent(props, context, options);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const dialogDeleteConfirmationManager = ref(new DialogSupport());
	const dialogDeleteConfirmationMessage = ref(null);
	const dialogDeleteConfirmationParams = ref(null);
	const dialogLocationLookupManager = ref(new DialogSupport());
	const dialogRocketLookupManager = ref(new DialogSupport());
	const dialogRocketSetupLookupManager = ref(new DialogSupport());
	const detailItemDate = ref(null);
	const detailItemDescription = ref(null);
	const detailItemIsDefault = ref(null);
	const detailItemLocationId = ref(null);
	const detailItemLocationIterationId = ref(null);
	const detailItemLocationName = ref(null);
	const detailItemName = ref(null);
	const detailItemReorder = ref(false);
	const detailItemRocketId = ref(null);
	const detailItemRocketName = ref(null);
	const detailItemRocketSetupId = ref(null);
	const detailItemRocketSetupName  = ref(null);
	const detailitemStatus = ref(null);
	
	const isDefault = computed(() => {
		return detailItemData.value ? detailItemData.value.isDefault ?? false : false;
	});
	const isDefaultEdit = computed(() => {
		return isNew.value && isAdmin.value;
	});
	const isDefaultView = computed(() => {
		return isDefault.value;
	});
	const isInProgress = computed(() => {
		return detailItemData.value ? detailItemData.value.statusId === AppCommonConstants.Checklists.ChecklistStatus.inProgress : false;
	});
	const isShared = computed(() => {
		return detailItemData.value ? detailItemData.value.isShared ?? false : false;
	});
	const statusName = computed(() => {
		if (!detailItemData.value)
			return null;
		if (!detailItemData.value.statusId)
			return null;
		if (detailItemData.value.statusId == AppCommonConstants.Checklists.ChecklistStatus.completed)
			return LibraryClientUtility.$trans.t('forms.content.checklists.completed');
		if (detailItemData.value.statusId == AppCommonConstants.Checklists.ChecklistStatus.inProgress)
			return LibraryClientUtility.$trans.t('forms.content.checklists.inProgress');
		return null;
	});
	const steps = computed(() => {
		return detailItemData.value ? detailItemData.value.steps : [{}];
	});
	const viewLocation = computed(() => {
		if (isDefault.value)
			return false;
		if (isEditable.value)
			return true;

		return detailItemLocationId.value;
	});
	const viewRocket = computed(() => {
		if (isDefault.value)
			return false;
		if (isEditable.value)
			return true;

		return detailItemRocketId.value;
	});
	const viewRocketSetup = computed(() => {
		if (isDefault.value)
			return false;
		if (isEditable.value)
			return true;

		return detailItemRocketSetupId.value;
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
	const clickSearchLocations = async (correlationId) => {
		dialogLocationLookupManager.value.open();
	};
	const clickSearchRockets = async (correlationId) => {
		dialogRocketLookupManager.value.open();
	};
	const clickSearchRocketSetups = async (correlationId) => {
		dialogRocketSetupLookupManager.value.open();
	};
	const clickViewLocation = async (item) => {
		if (!item)
			return;
		LibraryClientUtility.$navRouter.push('/user/locations/' + item.locationId);
	};
	const clickViewRocket = async () => {
		if (!item)
			return;
		LibraryClientUtility.$navRouter.push('/user/rockets/' + item.rocketId);
	};
	const clickViewRocketSetup = async () => {
		if (!item)
			return;
		LibraryClientUtility.$navRouter.push('/user/rocketsetups/' + item.rocketSetupId);
	};
	const dialogDeleteConfirmationCancel = async () => {
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
	const requestLocation = async (correlationId, id) => {
		const response = await serviceStore.dispatcher.requestLocationById(correlationId, id);
		return hasSucceeded(response) ? response.results : null;
	};
	const resetData = (correlationId, value) => {
		detailItemDate.value = value ? value.date : null;
		detailItemDescription.value = value ? value.description : null;
		detailItemIsDefault.value = value ? value.isDefault : null;
		detailItemName.value = value ? value.name : null;
		detailitemStatus.value = value ? value.statusId : null;

		if (value && value.location) {
			detailItemLocationId.value = value.location.id;
			detailItemLocationIterationId.value = value.locationIterationId;
			detailItemLocationName.value = value.location.name;
			location.value = value.location;
			// (async () => {
			// 	location.value = await requestLocation(correlationId, value.location.id);
			// })();
		}
		else {
			detailItemLocationId.value = null;
			detailItemLocationIterationId.value = null;
			detailItemLocationName.value = null;
			location.value = null;
		}

		if (value && value.rocketSetup) {
			if (value && value.rocketSetup.rocket) {
				detailItemRocketId.value = value.rocketSetup.rocket.id;
				detailItemRocketName.value = value.rocketSetup.rocket.name;
			}
			else {
				detailItemRocketId.value = null;
				detailItemRocketName.value = null;
			}
			
			detailItemRocketSetupId.value = value.rocketSetup.id;
			detailItemRocketSetupName.value = rocketName(value.rocketSetup);
		}
		else {
			detailItemRocketId.value = null;
			detailItemRocketName.value = null;
			detailItemRocketSetupId.value = null;
			detailItemRocketSetupName.value = null;
		}

		value.canLaunch = canLaunchI(value);
	};
	const rocketName = (item) => {
		if (!item)
			return null;
		return item.name ? item.name : rocketMotorNames(item)
	};
	const removeLocation = async () => {
		detailItemLocationId.value = null;
		detailItemLocationName.value = null;
		location.value = null;
	};
	const removeRocket = async () => {
		detailItemRocketId.value = null;
		detailItemRocketName.value = null;
		detailItemRocketSetupId.value = null;
		detailItemRocketSetupName.value = null;
	};
	const removeRocketSetup = async () => {
		detailItemRocketSetupId.value = null;
		detailItemRocketSetupName.value = null;
	};
	const selectLocation = async (item) => {
		try {
			if (!item)
				return error('useLaunchEditComponent', 'selectPart', 'Invalid item.', null, null, null, correlationId);
			
			detailItemLocationId.value = item.id;
			detailItemLocationName.value = item.name;
			location.value = await requestLocation(correlationId(), item.id);
		}
		finally {
			dialogLocationLookupManager.value.ok();
		}
	};
	const selectRocket = async (item) => {
		try {
			if (!item)
				return error('useLaunchEditComponent', 'selectRocket', 'Invalid item.', null, null, null, correlationId);
			
			detailItemRocketId.value = item.id;
			detailItemRocketName.value = item.name;
		}
		finally {
			dialogRocketLookupManager.value.ok();
		}
	};
	const selectRocketSetup = async (item) => {
		try {
			if (!item)
				return error('useLaunchEditComponent', 'selectRocketSetup', 'Invalid item.', null, null, null, correlationId);
			
			detailItemRocketSetupId.value = item.id;
			detailItemRocketSetupName.value = rocketName(item);
		}
		finally {
			dialogRocketSetupLookupManager.value.ok();
		}
	};
	const setData = (correlationId) => {
		detailItemData.value.date = detailItemDate.value;
		detailItemData.value.description = String.trim(detailItemDescription.value);
		detailItemData.value.name = String.trim(detailItemName.value);
		delete detailItemData.value.isDefault;

		detailItemData.value.locationId = detailItemLocationId.value;
		detailItemData.value.locationIterationId = detailItemLocationIterationId.value;

		detailItemData.value.rocketId = detailItemRocketId.value;
		detailItemData.value.rocketSetupId = detailItemRocketSetupId.value;
	};
	const updateMove = async (correlationId, dragItem, moveToId, moveToParentId, direction) => {
		if (!dragItem)
		 	throw Error('Invalid dragItem in updateMove...');
		if (String.isNullOrEmpty(dragItem.itemId))
		 	throw Error('Invalid dragItem.itemId in updateMove...');
		if (String.isNullOrEmpty(dragItem.parentId))
		 	throw Error('Invalid dragItem.parentId in updateMove...');
		if (String.isNullOrEmpty(moveToId))
		 	throw Error('Invalid moveToId in updateMove...');
		if (String.isNullOrEmpty(moveToParentId))
		 	throw Error('Invalid moveToParentId in updateMove...');

		// TODO: Should we clone, update, then set back?

		let dragItemResults = updateFindStep(correlationId, detailItemData.value.steps, dragItem.itemId, true);
		if (!dragItemResults)
		 	throw Error('Invalid dragItemResults in updateMove...');

		let dragParent = null;
		if (detailItemData.value.id === dragItem.parentId)
			dragParent = detailItemData.value;
		else
			dragParent = updateFindStep(correlationId, detailItemData.value.steps, dragItem.parentId);
		if (!dragParent)
		 	throw Error('Invalid dragParent in updateMove...');

		let moveToResults = updateFindStep(correlationId, detailItemData.value.steps, moveToId, true);
		if (!moveToResults)
		 	throw Error('Invalid moveToResults in updateMove...');

		let moveToParent = null;
		if (detailItemData.value.id === moveToParentId)
			moveToParent = detailItemData.value;
		else
			moveToParent = updateFindStep(correlationId, detailItemData.value.steps, moveToParentId);
		if (!moveToParent)
		 	throw Error('Invalid moveToParent in updateMove...');

		if (direction === 'down' || direction === 'up')
			return updateMoveDownOrUp(correlationId, dragItem, moveToId, moveToParentId, dragItemResults, dragParent, moveToResults, moveToParent, direction);
		if (direction === 'in' || direction === 'out')
			return updateMoveInAndOut(correlationId, dragItem, moveToId, moveToParentId, dragItemResults, dragParent, moveToResults, moveToParent, direction);
	};
	const updateMoveDownOrUp = async (correlationId, dragItem, moveToId, moveToParentId, dragItemResults, dragParent, moveToResults, moveToParent, direction) => {
		// TODO: Should we clone, update, then set back?

		if (!dragItemResults)
		 	throw Error('Invalid dragItemResults in updateMoveDownOrUp...');
		if (!dragParent)
		 	throw Error('Invalid dragParent in updateMoveDownOrUp...');
		if (!moveToResults)
		 	throw Error('Invalid moveToResults in updateMoveDownOrUp...');
		if (!moveToParent)
		 	throw Error('Invalid moveToParent in updateMoveDownOrUp...');

		// First remove the dragItem from the dragParent
		dragParent.steps.splice(dragItemResults.index, 1);

		// Next determine the index in the moveToParent...
		let start = moveToResults.index; // index of the moveTo item in the moveToParent
		console.log('start', start);
		if (direction === 'down') {
			// no change, the splice will insert it after the index
			console.log('start.increment1', start);
		}
		if (direction === 'up') {
			start -= 1; // decrement
			console.log('start.decrement1', start);
			start = start < 0 ? 0 : start; // can't be less than zero, so we basically didn't move it.
			console.log('start.decrement2', start);
		}

		// Finally add the dragItem to the appropriate place in the moveToParent
		moveToParent.steps.splice(start, 0, dragItemResults.item);

		updateMoveReorder(correlationId, dragParent, moveToParent);
	};
	const updateMoveInAndOut = async (correlationId, dragItem, moveToId, moveToParentId, dragItemResults, dragParent, moveToResults, moveToParent, direction) => {
		// TODO: Should we clone, update, then set back?

		if (!dragItemResults)
		 	throw Error('Invalid dragItemResults in updateMoveInAndOut...');
		if (!dragParent)
		 	throw Error('Invalid dragParent in updateMoveInAndOut...');
		if (!moveToResults)
		 	throw Error('Invalid moveToResults in updateMoveInAndOut...');
		if (!moveToResults.item)
		 	throw Error('Invalid moveToResults.item in updateMoveInAndOut...');

		// First remove the dragItem from the dragParent
		dragParent.steps.splice(dragItemResults.index, 1);

		// Finally add the dragItem to the appropriate place in the moveToParent
		moveToResults.item.steps.splice(0, 0, dragItemResults.item);

		updateMoveReorder(correlationId, dragParent, moveToParent);
	};
	const updateMoveReorder = (correlationId, dragParent, moveToParent) => {
		// reorder the dragParent
		let index = 0;
		for (const step of dragParent.steps)
			step.order = index++;
		// reorder the moveToParent
		for (const step of moveToParent.steps)
			step.order = index++;
	};
	const updateStatus = async (correlationId, id, status, launch) => {
		console.log('updateStatus', id);
		console.log('updateStatus', status);

		let item = updateFindStep(correlationId, detailItemData.value.steps, id);
		if (!item)
			throw Error('Invalid item in updateStatus...');

		console.log('updateStatus', item.statusId);
		item.statusId = status;

		if (launch) {
			detailItemData.value.launched = true;
			detailItemData.value.statusId = AppCommonConstants.Checklists.ChecklistStatus.completed;
		}
		await formControlRef.value.submitEx(true);
		detailItemData.value.canLaunch = canLaunchI(detailItemData.value);
	};
	const updateFindStep = (correlationId, steps, id, findIndex) => {
		if (!steps)
			return null;

		let item = steps.find(l => l.id === id);
		if (item) {
			if (findIndex) {
				const index = steps.findIndex(l => l.id === id);
				return { item : item , index: index };
			}

			return item;
		}

		for (const temp of steps) {
			if (!temp.steps)
				continue;

			item = updateFindStep(correlationId, temp.steps, id, findIndex);
			if (item)
				return item;
		}
	};

	const canLaunchI = (value, depth) => {
		depth = depth ?? '';
		if (!value)
			return false;
		
		// console.log(depth + 'value ' + value.id + ' ' + value.name + ' ' + value.typeId + ' ' + value.statusId + ' ' + (value.steps ? value.steps.length : null));

		let results;
		for (const temp of value.steps) {
			// console.dir(temp);
			// console.log(depth + 'temp ' + temp.id + ' ' + temp.name + ' ' + temp.typeId + ' ' + temp.statusId + ' ' + (temp.steps ? temp.steps.length : null));
			if ((temp.typeId !== AppCommonConstants.Checklists.ChecklistStepTypes.launch) &&
				(temp.typeId !== AppCommonConstants.Checklists.ChecklistStepTypes.section)) {

				if (temp.statusId !== AppCommonConstants.Checklists.ChecklistStepStatus.completed) {
					// console.log(depth + 'temp ' + temp.id + ' ' + (false));
					return false;
				}
			};

			if (temp.steps) {
				results = canLaunchI(temp, depth + '\t');
				if (!results) {
					// console.log(depth + 'temp ' + temp.id + ' ' + (false));
					return false;
				}
			}
		}

		return true;
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
		handleAddSecondary,
		buttonsDialog,
		buttonsForms,
		dialogDeleteConfirmationManager,
		dialogDeleteConfirmationMessage,
		dialogDeleteConfirmationParams,
		dialogLocationLookupManager,
		dialogRocketLookupManager,
		dialogRocketSetupLookupManager,
		detailItemDate,
		detailItemDescription,
		detailItemIsDefault,
		detailItemLocationId,
		detailItemLocationIterationId,
		detailItemLocationName,
		detailItemName,
		detailItemReorder,
		detailItemRocketId,
		detailItemRocketName,
		detailItemRocketSetupId,
		detailItemRocketSetupName,
		isDefault,
		isDefaultEdit,
		isDefaultView,
		isInProgress,
		isShared,
		locationIterations,
		steps,
		viewLocation,
		viewRocket,
		viewRocketSetup,
		clickRemoveLocation,
		clickRemoveRocket,
		clickRemoveRocketSetup,
		clickSearchLocations,
		clickSearchRockets,
		clickSearchRocketSetups,
		clickViewLocation,
		clickViewRocket,
		clickViewRocketSetup,
		dialogDeleteConfirmationCancel,
		dialogDeleteConfirmationError,
		dialogDeleteConfirmationOk,
		dialogDeleteConfirmationOpen,
		removeLocation,
		removeRocket,
		removeRocketSetup,
		selectLocation,
		selectRocket,
		selectRocketSetup,
		updateMove,
		updateStatus,
		scope: 'ChecklistControl',
		validation: useVuelidate({ $scope: 'ChecklistControl' })
	};
};
</script>
