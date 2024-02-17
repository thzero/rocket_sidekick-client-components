<script>
import { computed, onMounted, ref} from 'vue';
import { firstBy, thenBy } from 'thenby';
import useVuelidate from '@vuelidate/core';

import LibraryClientConstants from '@thzero/library_client/constants.js';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import InventoryData from 'rocket_sidekick_common/data/inventory/index';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentBaseComponent } from '@/components/content/contentBase';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useNotify } from '@thzero/library_client_vue3/components/notify';
import { useOrganizationsUtilityComponent } from '@/components/content/organizationsUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useInventoryBaseComponent(props, context, options) {
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
		serviceStore,
		sort,
		target
	} = useContentBaseComponent(props, context, options);

	const {
		isAdmin,
		isOwner,
		isPublic,
		isPublicDisplay,
		isUser
	} = useContentSecurityComponent(props, context);

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify
	} = useNotify(props, context, options);

	const {
		organizations,
		organizationName,
		organizationNames
	} = useOrganizationsUtilityComponent(props, context);

	const {
		rocketTypes
	} = useRocketsUtilityComponent(props, context, options);

	const debug = ref(false);
	const inventory = ref(new InventoryData());
	const inventoryListing = ref([]);
	const inventoryListingRef = ref(null);
	// const filterItemName = ref(null);
	// const filterItemOrganizations = ref([]);
	// const filterItemRocketTypes = ref([]);
	const title = ref(LibraryClientUtility.$trans.t('titles.content.yours') + ' ' + LibraryClientUtility.$trans.t(`titles.content.inventory.title`));

	if (LibraryCommonUtility.isDev) {
		const serviceConfig = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG);
		const config = serviceConfig.get('debug');
		if (config)
			debug.value = config['inventory'] ?? false;
	}

	const fetchParams = (correlationId, params) => {
		// params.name = filterItemName.value;
		// params.organizations = filterItemOrganizations.value;
		// params.rocketTypes = filterItemRocketTypes.value;
		return params;
	};
	const resetAdditional = async (correlationId, data) => {
		// filterItemName.value = data ? data.name : null;
		// filterItemOrganizations.value = data ? data.organizations : null;
		// filterItemRocketTypes.value = data ? data.rocketTypes : null;
	};
	const search = async (correlationId) => {
		const params = fetchParams(correlationId, {});
		if (!params)
			return error('useInventoryBaseComponent', 'fetchI', 'Invalid params', null, null, null, correlationId);

		serviceStore.dispatcher.setInventorySearchCriteria(correlationId, params);

		const response = await serviceStore.dispatcher.requestInventory(correlationId, params);
		if (hasFailed(response))
			return;
		
		inventory.value = response.results;
		inventoryListing.value = response.results.items;
		return success(correlationId);
	};

	onMounted(async () => {
		await search(correlationId());
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
		serviceStore,
		sort,
		target,
		buttonsDialog,
		buttonsForms,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		debug,
		inventory,
		inventoryListing,
		inventoryListingRef,
		// filterItemName,
		// filterItemOrganizations,
		// filterItemRocketTypes,
		title,
		resetAdditional,
		search,
		scope: 'InventoryFilterControl',
		validation: useVuelidate({ $scope: 'InventoryilterControl' })
	};
};
</script>
