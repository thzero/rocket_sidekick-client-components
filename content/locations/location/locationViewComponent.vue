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
		organizations,
		organizationName,
		organizationNames
	} = useOrganizationsUtilityComponent(props, context);

	const {
		rocketTypes,
		hasCoverUrl,
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

	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	const displayItemAddress = computed(() => {
		if (!displayItem.value)
			return '';

		// let temp = '';
		// if (displayItem.value.address) {
		// 	if (!String.isNullOrEmpty(displayItem.value.address.city))
		// 		temp += displayItem.value.address.city;
		// 	if (!String.isNullOrEmpty(temp))
		// 		temp += ', ';
		// 	if (!String.isNullOrEmpty(displayItem.value.address.stateProvince))
		// 		temp += displayItem.value.address.stateProvince;
		// 	if (!String.isNullOrEmpty(temp))
		// 		temp += ' ';
		// 	if (!String.isNullOrEmpty(displayItem.value.address.country))
		// 		temp += displayItem.value.address.country;
		// }
		// return temp;
		return AppUtility.address(displayItem.value.address);
	});
	const hasCoords = computed(() => {
		if (!displayItem.value || !displayItem.value.results)
			return false;

		return (
			displayItem.value.results.coordsLat || 
			displayItem.value.results.coordsLong
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
		organizations,
		rocketTypes,
		displayItem,
		displayItemAddress,
		hasCoords
	};
};
</script>
