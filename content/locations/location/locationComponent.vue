<script>
import { computed, onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useDetailSecondaryComponent } from '@/components/content/detailSecondaryComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useLocationComponent(props, context, options) {
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

			const response = await serviceStore.dispatcher.saveLocation(correlationId, detailItemData.value);
			logger.debug('locationComponent', 'preCompleteOk', 'response', response, correlationId);
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
	
	const countriesI = ref(null);
	const detailItemDescription = ref(null);
	const detailItemAddressCity = ref(null);
	const detailItemAddressCountry = ref(null);
	const detailItemAddressPostalCode = ref(null);
	const detailItemAddressStateProvince = ref(null);
	const detailItemName = ref(null);
	const detailItemRocketTypes = ref([]);

	const countries = computed(() => {
		if (!countriesI.value)
			return [];
		return countriesI.value.map(l => { return { id: l.id, name: l.name }; });
	});
	const hasAdmin = computed(() => {
		return false;
	});
	const states = computed(() => {
		if (!countriesI.value)
			return [];
		const id = detailItemAddressCountry.value;
		if (String.isNullOrEmpty(id))
			return [];
		const temp = countriesI.value.find(l => l.id === id);
		if (!temp)
			return [];
		return temp.states.map(l => { return { id: l.state_code, name: l.name }; });
	});

	const resetData = (correlationId, value) => {
		detailItemDescription.value = value ? value.description : null;
		
		detailItemAddressCity.value = value ? value.city : null;
		detailItemAddressCountry.value = value ? value.country : null;
		detailItemAddressPostalCode.value = value ? value.postalCode : null;
		detailItemAddressStateProvince.value = value ? value.stateProvince : null;

		detailItemName.value = value ? value.name : null;

		detailItemRocketTypes.value = value ? value.rocketTypes : null;
	};
	const setData = (correlationId) => {
		detailItemData.value.description = detailItemDescription.value;

		detailItemData.value.city = detailItemAddressCity.value;
		detailItemData.value.country = detailItemAddressCountry.value;
		detailItemData.value.postalCode = detailItemAddressPostalCode.value;
		detailItemData.value.stateProvince = detailItemAddressStateProvince.value;
		
		detailItemData.value.name = detailItemName.value;

		detailItemData.value.rocketTypes = detailItemRocketTypes.value;
	};

	onMounted(async () => {
		const correlationIdI = correlationId();

		if (!countriesI.value) {
			const response = await serviceStore.dispatcher.requestCountries(correlationIdI);
			if (hasFailed(response))
				return;
				
			countriesI.value = response.results.map((item) => { return { id: item.id, name: item.name, states: item.states}; });
		}		
	});
	
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
		detailItemAddressCity,
		detailItemAddressCountry,
		detailItemAddressPostalCode,
		detailItemAddressStateProvince,
		detailItemDescription,
		detailItemName,
		detailItemRocketTypes,
		countries,
		hasAdmin,
		states,
		scope: 'LocationControl',
		validation: useVuelidate({ $scope: 'LocationControl' })
	};
};
</script>
