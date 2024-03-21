<script>
import { computed } from 'vue';

// import AppCommonConstants from 'rocket_sidekick_common/constants.js';

import { useBaseEditComponent } from '@thzero/library_client_vue3/components/baseEdit';

export function useChecklistStepsComponent(props, context, options) {
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
		setErrors
	} = useBaseEditComponent(props, context, {
	});

	const hasItem = computed(() => {
		return props.item !== null && props.item !== undefined;
	});

	const getChildPayload = (idChain, itemIndex) => {
      	console.log('getChildPayload', idChain, itemIndex);
		let item = null;
		if (Array.isArray(idChain)) {
			let steps = props.item.steps;
			for (const id of idChain) {
				console.log('getChildPayload', id);
				item = steps.find(l => l.id == id);
				if (item)
					steps = item.steps;
			}
		}
		else 
			item = props.item.steps[itemIndex];

		if (!item)
			throw Error('Invalid item in getChildPayload...');
		console.log('getChildPayload', item.name);
		if (!item.steps)
			throw Error('Invalid item.steps in getChildPayload...');

		item = item.steps[itemIndex];
		if (!item)
			throw Error('Invalid item in getChildPayload...');

		console.log('getChildPayload', item.name);
		console.log('getChildPayload', { chain: idChain, item: item });
		return { idChain: idChain, item: item };
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
		hasItem,
		getChildPayload
	};
};
</script>
