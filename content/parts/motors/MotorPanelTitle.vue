<template>
	<div style="display: flex; flex-wrap: wrap;">
		<div><span class="mr-2">{{ item.designation ?? item.name }}</span></div>
		<div>
			<v-chip 
				v-if="displayCaseInfo && (item.caseInfo || item.motorCase)"
				variant="elevated"
				:color="hasCase ? 'green' : 'red'"
				class="mr-2"
			>
				<span v-if="item.manufacturer">{{ item.manufacturer }}&nbsp;</span>
				<span v-if="item.caseInfo">{{ item.caseInfo }}&nbsp;</span>
				<span v-if="item.motorCase">{{ item.motorCase }}</span>
			</v-chip>
		</div>
		<div>
			<v-chip 
				v-if="item.diameter"
				class="mr-2"
			>
				{{ diameterDisplay }}
			</v-chip>
		</div>
		<div>
			<v-chip 
				v-if="item.impulseClass"
				class="mr-2"
			>
				{{ $t('forms.external.motorSearch.impulseClass') }}
			</v-chip>
		</div>
		<div>
			<v-chip 
				v-if="item.propInfo === 'black powder'"
				class="mr-2"
			>
				{{ $t('forms.external.motorSearch.propInfo_bp') }}
			</v-chip>
		</div>
		<div>
			<v-chip 
				v-if="item.sparky"
				class="mr-2"
			>
				{{ $t('forms.external.motorSearch.sparky') }}
			</v-chip>
		</div>
		<div>
			<v-chip 
				v-if="item.type"
				class="mr-2"
			>
				{{ $t(`motorSearch.motor_type_${item.type}`) }}
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
	name: 'MotorPanelTitle',
	props: {
		...usePartPanelComponentProps,
		displayCaseInfo: {
			type: Boolean,
			value: false
		},
		hasCase: {
			type: Boolean,
			value: false
		}
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
