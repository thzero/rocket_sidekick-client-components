<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentMarkupComponent } from '@/components/content/contentMarkup';
import { useDetailSecondaryComponent } from '@/components/content/detailSecondaryComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useLaunchComponent(props, context, options) {
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
		init: async (correlationId, value) => {
			resetData(correlationId, value);
		},
		preCompleteOk : async (correlationId) => {
			setData(correlationId);

			const response = await serviceStore.dispatcher.saveLaunch(correlationId, detailItemData.value);
			logger.debug('launchComponent', 'preCompleteOk', 'response', response, correlationId);
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
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		markupHint
	} = useContentMarkupComponent(props, context);
	
	const dialogLocationLookupManager = ref(new DialogSupport());
	const dialogRocketLookupManager = ref(new DialogSupport());
	const detailItemDate = ref(null);
	const detailItemDescription = ref(null);
	const detailItemName = ref(null);
	const detailItemLocationId = ref(null);
	const detailItemLocationIterationId = ref(null);
	const detailItemLocationName = ref(null);
	const detailItemNotes = ref(null);
	const detailItemRocketId = ref(null);
	const detailItemRocketName = ref(null);
	const detailItemSuccess = ref(false);
	const detailItemSuccessReasons = ref(null);
	const location = ref(null);
	
	const failureReasons = ref(Object.getOwnPropertyNames(AppCommonConstants.Rocketry.Launches.FailureReasons).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('strings.content.launches.failureReasons.' + item) }; }));

	const hasAdmin = computed(() => {
		return false;
	});
	const locationIterationName = (item) => {
		let output = '';
		if (item.number)
			output += item.number + ' ';
		if (item.year)
			output += item.year + ' ';
		return output.trim();
	}
	const locationIterations = computed(() => {
		if (location.value)
			return LibraryClientVueUtility.selectBlank(location.value.iterations.map(l => { return { id : l.id, name: locationIterationName(l) }; }), '');

		return [];
	});
	
	const clickSearchLocations = async (correlationId) => {
		dialogLocationLookupManager.value.open();
	};
	
	const clickSearchRockets = async (correlationId) => {
		dialogRocketLookupManager.value.open();
	};
	const requestLocation = async (correlationId, id) => {
		const response = await serviceStore.dispatcher.requestLocationById(correlationId, id);
		return hasSucceeded(response) ? response.results : null;
	};
	const resetData = (correlationId, value) => {
		detailItemDate.value = value ? value.date : null;
		detailItemDescription.value = value ? value.description : null;
		
		detailItemName.value = value ? value.name : null;
		detailItemNotes.value = value ? value.notes : false;

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
		if (value && value.rocket) {
			detailItemRocketId.value = value.rocket.id;
			detailItemRocketName.value = value.rocket.name;
		}
		else {
			detailItemRocketId.value = null;
			detailItemRocketName.value = null;
		}

		detailItemSuccess.value = value ? value.success : false;
		detailItemSuccessReasons.value = value ? value.successReasons : null;
	};
	const selectLocation = async (item) => {
		try {
			if (!item)
				return error('useLaunchComponent', 'selectPart', 'Invalid item.', null, null, null, correlationId);
			
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
				return error('useLaunchComponent', 'selectPart', 'Invalid item.', null, null, null, correlationId);
			
			detailItemRocketId.value = item.id;
			detailItemRocketName.value = item.name;
		}
		finally {
			dialogRocketLookupManager.value.ok();
		}
	};
	const setData = (correlationId) => {
		detailItemData.value.date = detailItemDate.value;
		detailItemData.value.description = detailItemDescription.value;
		
		detailItemData.value.name = detailItemName.value;
		detailItemData.value.notes = detailItemNotes.value;

		detailItemData.value.locationId = detailItemLocationId.value;
		detailItemData.value.locationIterationId = detailItemLocationIterationId.value;
		detailItemData.value.rocketId = detailItemRocketId.value;
		
		detailItemData.value.success = detailItemSuccess.value;
		detailItemData.value.successReaons = detailItemSuccessReasons.value;
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
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		markupHint,
		dialogLocationLookupManager,
		dialogRocketLookupManager,
		detailItemDate,
		detailItemDescription,
		detailItemName,
		detailItemNotes,
		detailItemLocationId,
		detailItemLocationIterationId,
		detailItemLocationName,
		detailItemRocketId,
		detailItemRocketName,
		detailItemSuccess,
		detailItemSuccessReasons,
		failureReasons,
		hasAdmin,
		locationIterations,
		clickSearchLocations,
		clickSearchRockets,
		selectLocation,
		selectRocket,
		scope: 'LaunchControl',
		validation: useVuelidate({ $scope: 'LaunchControl' })
	};
};
</script>
