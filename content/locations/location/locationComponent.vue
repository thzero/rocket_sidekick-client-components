<script>
import { computed, onMounted, ref, watch } from 'vue';
import { firstBy, thenBy } from 'thenby';

import useVuelidate from '@vuelidate/core';

import LibraryCommonUtility from '@thzero/library_common/utility';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';

import LocationIterationData from 'rocket_sidekick_common/data/locations/iteration';

import { useAdminComponent } from '@/components/content/adminComponent';
import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useDetailSecondaryComponent } from '@/components/content/detailSecondaryComponent';
import { useOrganizationsUtilityComponent } from '@/components/content/organizationsUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

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
		dialogDeleteMessage: 'locations',
		dialogDeleteSecondaryOk: async (correlationId, id) => {
			const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);
			LibraryCommonUtility.deleteArrayById(temp.iterations, id);
			
			const response = await serviceStore.dispatcher.saveLocation(correlationId, temp);
			logger.debug('useLocationComponent', 'dialogDeleteSecondaryOk', 'response', response, correlationId);
			return response;
		},
		dialogEditSecondaryPreCompleteOk : async (correlationId, item) => {
			const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);
			temp.stages = LibraryCommonUtility.updateArrayByObject(detailItemData.value.iterations, item);
			
			const response = await serviceStore.dispatcher.saveLocation(correlationId, detailItemData.value);
			logger.debug('useLocationComponent', 'dialogEditSecondaryPreCompleteOk', 'response', response, correlationId);
			
			return response;
		},
		init: async (correlationId, value) => {
			const temp2 = await serviceStore.getters.getLocationsExpanded();
			const temp3 = temp2[panelsKey(value)];
			panels.value = temp3 ?? [];

			resetData(correlationId, value);
		},
		initNewSecondary: async (correlationId) => {
			detailItemData.value.iterations = detailItemData.value.iterations ?? [];
			const iteration = new LocationIterationData();

			// Open the dialog...
			dialogEditSecondaryOpen(iteration);
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
		organizations,
		organizationName,
		organizationNames
	} = useOrganizationsUtilityComponent(props, context);

	const {
		rocketTypes,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketsUtilityComponent(props, context, options);

	const {
		hasAdminDelete,
		hasAdminEdit,
		hasAdminRoles,
		isLoggedIn
	} = useAdminComponent(props, context, { role: 'locations:public'});

	const countriesAndStates = ref(null);
	const detailItemAddressCity = ref(null);
	const detailItemAddressCountry = ref(null);
	const detailItemAddressPostalCode = ref(null);
	const detailItemAddressStateProvince = ref(null);
	const detailItemCoordsLat = ref(null);
	const detailItemCoordsLong = ref(null);
	const detailItemDescription = ref(null);
	const detailItemExperimental = ref(false);
	const detailItemIsPublic = ref(false);
	const detailItemLink = ref(null);
	const detailItemName = ref(null);
	const detailItemOrganizations = ref([]);
	const detailItemRocketTypes = ref([]);
	const panels = ref([]);

	const countries = computed(() => {
		let temp = [];
		if (props.countriesAndStates)
			temp = props.countriesAndStates.map(l => { return { id: l.id, name: l.name }; });
		return LibraryClientVueUtility.selectBlank(temp, '');
	});
	const hasAdmin = computed(() => {
		return true; // TODO: SECURITY: Admin can...
	});
	const iterations = computed(() => {
		let temp = detailItemData.value && detailItemData.value.iterations ? detailItemData.value.iterations : [];
		temp = temp.sort(
			firstBy((v1, v2) => { return (v1.number && v2.number) && v1.number.localeCompare(v2.number); })
			.thenBy((v1, v2) => { return (v1.year && v2.year) && v1.year.localeCompare(v2.year); })
		);
		return temp;
	});
	const states = computed(() => {
		if (!countriesAndStates.value)
			return [];
		const id = detailItemAddressCountry.value;
		if (String.isNullOrEmpty(id))
			return [];
		const temp = countriesAndStates.value.find(l => l.id === id);
		if (!temp)
			return [];
		return temp.states.map(l => { return { id: l.state_code, name: l.name }; });
	});

	const numberOrYear = (item) => {
		return item.number ? item.number : item.year;
	};
	const panelsKey = (value) => {
		return value ? value.id : detailItemData.value ? detailItemData.value.id : null;
	};
	const panelsUpdated = async (value) => {
		await serviceStore.dispatcher.setLocationsExpanded(correlationId(), { id: panelsKey(), expanded: value });
	};
	const resetData = (correlationId, value) => {
		detailItemDescription.value = value ? value.description : null;
		
		detailItemAddressCity.value = value && value.address ? value.address.city : null;
		detailItemAddressCountry.value = value && value.address ? value.address.country : null;
		detailItemAddressPostalCode.value = value && value.address ? value.address.postalCode : null;
		detailItemAddressStateProvince.value = value && value.address ? value.address.stateProvince : null;

		detailItemCoordsLat.value = value ? value.coordsLat : null;
		detailItemCoordsLong.value = value ? value.coordsLong : null;

		detailItemExperimental.value = value ? value.experimental : false;
		detailItemIsPublic.value = value ? value.public : false;
		detailItemLink.value = value ? value.link : null;
		detailItemName.value = value ? value.name : null;
		detailItemOrganizations.value = value ? value.organizations : null;
		detailItemRocketTypes.value = value ? value.rocketTypes : null;
	};
	const setData = (correlationId) => {
		detailItemData.value.description = detailItemDescription.value;

		detailItemData.value.address.city = detailItemAddressCity.value;
		detailItemData.value.address.country = detailItemAddressCountry.value;
		detailItemData.value.address.postalCode = detailItemAddressPostalCode.value;
		detailItemData.value.address.stateProvince = detailItemAddressStateProvince.value;

		detailItemData.value.coordsLat = detailItemCoordsLat.value;
		detailItemData.value.coordsLong = detailItemCoordsLong.value;

		detailItemData.value.experimental = detailItemExperimental.value;
		detailItemData.value.public = detailItemIsPublic.value;
		detailItemData.value.link = detailItemLink.value;
		detailItemData.value.name = detailItemName.value;
		detailItemData.value.organizations = detailItemOrganizations.value;
		detailItemData.value.organizations = detailItemData.value.organizations && detailItemData.value.organizations.length > 0 ? detailItemData.value.organizations : null;
		detailItemData.value.rocketTypes = detailItemRocketTypes.value;
		detailItemData.value.rocketTypes = detailItemData.value.rocketTypes && detailItemData.value.rocketTypes.length > 0 ? detailItemData.value.rocketTypes : null;
		
	};
	const updateIteration = async(correlationId, stage) => {
		const temp = LibraryCommonUtility.cloneDeep(detailItemData.value);

		temp.iterations = LibraryCommonUtility.updateArrayByObject(temp.iterations, stage);

		const response = await serviceStore.dispatcher.saveLocation(correlationId, temp);
		logger.debug('useLocationComponent', 'updateStage', 'response', response, correlationId);
		if (hasFailed(response))
			return response;

		detailItemData.value.iterations = response.results.iterations;
		return response;
	};

	onMounted(async () => {
		const correlationIdI = correlationId();

		if (!countriesAndStates.value) {
			const response = await serviceStore.dispatcher.requestCountries(correlationIdI);
			if (hasFailed(response))
				return;
				
			countriesAndStates.value = response.results.map((item) => { return { id: item.iso3, name: item.name, states: item.states}; });
		}
	});

	watch(() => detailItemAddressCountry.value,
		(value, prev) => {
			if (value === prev)
				return;

			detailItemAddressStateProvince.value = null;
		}
	);
	
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
		organizations,
		hasAdminDelete,
		hasAdminEdit,
		hasAdminRoles,
		isLoggedIn,
		detailItemAddressCity,
		detailItemAddressCountry,
		detailItemAddressPostalCode,
		detailItemAddressStateProvince,
		detailItemCoordsLat,
		detailItemCoordsLong,
		detailItemDescription,
		detailItemExperimental,
		detailItemIsPublic,
		detailItemLink,
		detailItemName,
		detailItemOrganizations,
		detailItemRocketTypes,
		countries,
		countriesAndStates,
		hasAdmin,
		iterations,
		states,
		panels,
		numberOrYear,
		panelsUpdated,
		updateIteration,
		scope: 'LocationControl',
		validation: useVuelidate({ $scope: 'LocationControl' })
	};
};
</script>
