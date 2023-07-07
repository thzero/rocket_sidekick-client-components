<script>
import { onMounted, ref } from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function usePartsDisplayCompany(props, context, options) {
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
		contentLoadSignal,
		serviceStore,
		sort,
		target
	} = useContentBaseComponent(props, context, options);

	const manufacturers = ref(null);
	const type = ref(options.type);

	onMounted(async () => {
		if (manufacturers.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId);
		if (hasFailed(response))
			return;

		let temp2 = response.results.filter(l => l.types.find(j => j === options.type));
		temp2 = temp2.map((item) => { return { id: item.id, name: item.name }; });
		manufacturers.value = temp2.sort((a, b) => a.name.localeCompare(b.name));
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
		contentLoadSignal,
		serviceStore,
		sort,
		target,
		manufacturers,
		type
	};
};
</script>
