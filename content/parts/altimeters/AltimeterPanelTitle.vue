<template>
	<span v-if="title">{{ item.name }} </span>
</template>

<script>
import { usePartsPanelComponent } from '@/components/content/parts/partPanelComponent';
import { usePartPanelComponentProps } from '@/components/content/parts/partPanelComponentProps';

export default {
	name: 'AltimeterrPanelTitle',
	props: {
		...usePartPanelComponentProps
	},
	setup (props, context, options) {
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
			target,
			manufacturer,
			measurementUnitTranslateLength,
			measurementUnitTranslateWeight
		} = usePartsPanelComponent(props, context, options);

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
			manufacturer,
			measurementUnitTranslateLength,
			measurementUnitTranslateWeight
		};
	}
};
</script>

<style scoped>
</style>
