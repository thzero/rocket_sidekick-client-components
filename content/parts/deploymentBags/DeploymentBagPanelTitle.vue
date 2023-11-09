<template>
	{{ item.diameter }} {{ measurementUnitTranslateLength(item.diameterMeasurementUnitsId, item.diameterMeasurementUnitId) }} x
	{{ item.length }} {{ measurementUnitTranslateLength(item.lengthMeasurementUnitsId, item.lengthMeasurementUnitId) }} 
	{{ item.name }} 
	{{ item.pilotChute ? '(' : '' }}{{ item.pilotChute ? $t('forms.content.parts.deploymentBag.pilotChute') : '' }}
	{{ item.pilotChute ? item.pilotChuteDiameter ?? '' : '' }}
	{{ item.pilotChute ? item.pilotChuteDiameter ? (measurementUnitTranslateLength(item.lengthMeasurementUnitsId, item.lengthMeasurementUnitId)) : '' : '' }}{{ item.pilotChute ? ')' : '' }}
</template>

<script>
import { usePartsPanelComponent } from '@/components/content/parts/partPanelComponent';
import { usePartPanelComponentProps } from '@/components/content/parts/partPanelComponentProps';

export default {
	name: 'DeploymentBagPanelTitle',
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
