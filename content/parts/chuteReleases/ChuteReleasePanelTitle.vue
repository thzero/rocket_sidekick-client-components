<template>
	{{ item.name }} 
</template>

<script>
import { usePartsPanelComponent } from '@/components/content/parts/partPanelComponent';
import { usePartPanelComponentProps } from '@/components/content/parts/partPanelComponentProps';

export default {
	name: 'ChuteProtectorPanelTitle',
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
			contentLoadSignal,
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
			contentLoadSignal,
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
