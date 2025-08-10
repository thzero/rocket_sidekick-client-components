<script>
import { onMounted, ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useRocketUserGalleryComponent(props, context, options) {
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
		sortByOrder,
		target
	} = useContentBaseComponent(props, context, options);

	const manufacturers = ref(null);
	const type = ref(AppCommonConstants.Rocketry.DisplayTypes.GamerTag);
	
	const fetchManufacturers = async (correlationId) => {
		if (manufacturers.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		manufacturers.value = response.results.sort((a, b) => a.name.localeCompare(b.name));
	};

	onMounted(async () => {
		await fetchManufacturers();
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
		manufacturers,
		type
	};
}
</script>