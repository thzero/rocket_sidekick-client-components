<template>
	<div v-if="!table && !tableHeader" style="display: flex; flex-wrap: wrap;">
	<span v-if="title" class="mr-2">{{ item.designation ?? item.name }}</span>
		<div
			v-if="additional && item.diameter"
		>
			<v-chip 
				v-if="chips"
				class="mr-2"
			>
				{{ diameterDisplay }}
			</v-chip>
		</div>
	</div>
	<span
		v-if="table && title"
		class="mr-2">{{ item.designation ?? item.name }}
	</span>
	<td
		v-if="table"
	>
		{{ diameterDisplay }}
	</td>
	<th
		v-if="tableHeader"
		class="text-left font-weight-bold"
	>
	{{ $t('forms.external.motorSearch.diameter') }}
	</th>
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
