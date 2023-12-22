<script>
import { computed, ref} from 'vue';
import { firstBy, thenBy } from 'thenby';
import useVuelidate from '@vuelidate/core';

import LibraryClientConstants from '@thzero/library_client/constants.js';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

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
	
	const location = ref(null);

	const locationIterations = computed(() => {
		if (location.value)
			return LibraryClientVueUtility.selectBlank(location.value.iterations.map(l => { return { id : l.id, name: locationIterationName(l) }; }), '');

		return [];
	});
	
	const locationIterationName = (item) => {
		let output = '';
		if (item.number)
			output += '#' + item.number + ' ';
		if (item.year)
			output += item.year + ' ';
		return output.trim();
	};

	return {
		location,
		locationIterations,
		locationIterationName
	};
};
</script>
