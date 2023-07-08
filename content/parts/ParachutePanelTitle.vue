<template>
	<!-- <v-card-title>
		{{ item.diameter }} {{ measurementUnitTranslateLength(item.diameterMeasurementUnitsId, item.diameterMeasurementUnitId) }}
		{{ item.name }}
		<div class="float-right">{{ manufacturer(item) }}</div>
	</v-card-title>
	<v-card-text
		v-if="item.description"
	>
		{{ item.description }}
	</v-card-text> -->
	{{ item.diameter }} {{ measurementUnitTranslateLength(item.diameterMeasurementUnitsId, item.diameterMeasurementUnitId) }} 
	{{ item.thinMill ? `(${ $t('forms.content.parts.parachute.thinMill')})` : '' }}
	{{ item.name }} 
</template>

<script>
import { usePartsPanelComponent } from '@/components/content/parts/partPanelComponent';
import { usePartPanelComponentProps } from '@/components/content/parts/partPanelComponentProps';

export default {
	name: 'ParachutePanelTitle',
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
