<script>
import { computed, ref } from 'vue';

import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useLocationsUtilityComponent(props, context, options) {
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
		rocketTypeNames
	} = useRocketsUtilityComponent(props, context, options);
	
	const location = ref(null);

	const locationIterations = computed(() => {
		if (location.value)
			return LibraryClientVueUtility.selectBlank(location.value.iterations.map(l => { return { 
				id : l.id, 
				name: locationIterationName(l)
			}; 
		}), '');

		return [];
	});
	
	const locationIterationName = (item) => {
		let output = [];
		if (item.number)
			output.push(`#${item.number}`);
		// if (item.name)
		// 	output.push(item.name);

		if (!item.number && !item.number) {
			if (item.address) {
				if (item.address.city)
					output.push(item.address.city);
			}
		}
		if (item.year)
			output.push(item.year);

		if (item.rocketTypes) {
			output.push(`(${rocketTypeNames(item.rocketTypes)})`);
		}

		return output.join(' ');
	};

	return {
		location,
		locationIterations,
		locationIterationName
	};
};
</script>
