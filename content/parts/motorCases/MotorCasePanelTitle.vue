<template>
	<div style="display: flex; flex-wrap: wrap;">
		<div><span class="mr-2">{{ item.designation ?? item.name }}</span></div>
		<div>
			<v-chip 
				v-if="item.diameter"
				class="mr-2"
			>
				{{ diameterDisplay }}
			</v-chip>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import { usePartsPanelComponent } from '@/components/content/parts/partPanelComponent';
import { usePartPanelComponentProps } from '@/components/content/parts/partPanelComponentProps';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';

export default {
	name: 'MotorCasePanelTitle',
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

		const {
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			displayItemMeasurementLength,
			displayItemMeasurementWeight
		} = useToolsMeasurementUtilityComponent(props, context);

		const diameterDisplay = computed(() => {
			if (!props.item)
				return null;
			return displayItemMeasurementLength(correlationId(), props.item, (value) => { return value.diameter; }, (value) => AppCommonConstants.MeasurementUnits.metrics.id, (value) => AppCommonConstants.MeasurementUnits.metrics.length.mm);
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
			serviceStore,
			sort,
			target,
			manufacturer,
			measurementUnitTranslateLength,
			measurementUnitTranslateWeight,
			diameterDisplay
		};
	}
};
</script>

<style scoped>
</style>
