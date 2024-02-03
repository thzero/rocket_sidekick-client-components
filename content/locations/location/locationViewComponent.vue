<script>
import { computed } from 'vue';

import AppUtility from '@/utility/app';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useOrganizationsUtilityComponent } from '@/components/content/organizationsUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useLocationViewComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useBaseComponent(props, context, options);

	const {
		organizationNames
	} = useOrganizationsUtilityComponent(props, context);

	const {
		rocketTypeNames
	} = useRocketsUtilityComponent(props, context, options);

	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	const displayItemAddress = computed(() => {
		if (!displayItem.value)
			return '';
		return AppUtility.address(displayItem.value.address);
	});
	const displayItemOrganizations = computed(() => {
		return organizationNames(displayItem.value.organizations);
	});
	const displayItemRocketTypeNames = computed(() => {
		return rocketTypeNames(displayItem.value.rocketTypes);
	});
	const hasCoords = computed(() => {
		if (!displayItem.value)
			return false;

		return (
			displayItem.value.coordsLat &&
			displayItem.value.coordsLong
		);
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
		organizationNames,
		displayItem,
		displayItemAddress,
		displayItemOrganizations,
		displayItemRocketTypeNames,
		hasCoords
	};
};
</script>
