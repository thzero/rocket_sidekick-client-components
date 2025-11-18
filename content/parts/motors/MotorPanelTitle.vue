<template>
	<div v-if="!table && !tableHeader" style="display: flex; flex-wrap: wrap;">
		<div v-if="title"><span class="mr-2">{{ item.designation ?? item.name }}</span></div>
		<v-chip 
			v-if="chips && displayCaseInfo && (item.caseInfo || item.motorCase)"
			variant="elevated"
			:color="hasCase ? 'green' : 'red'"
			class="mr-2"
		>
			<span v-if="item.motorCase && item.motorCase.manufacturer">{{ item.motorCase.manufacturer }}&nbsp;</span>
			<!-- <span v-if="item.caseInfo">{{ item.caseInfo }}&nbsp;</span> -->
			<span v-if="item.motorCase && item.motorCase.name">{{ item.motorCase.name }}</span>
		</v-chip>
		<v-chip 
			v-if="chips && item.diameter"
			class="mr-2"
		>
			{{ diameterDisplay }}
		</v-chip>
		<v-chip 
			v-if="chips && item.impulseClass"
			class="mr-2"
		>
			{{ item.impulseClass }}
		</v-chip>
		<v-chip 
			v-if="chips && item.propInfo === 'black powder'"
			class="mr-2"
		>
			{{ $t('forms.external.motorSearch.propInfo_bp') }}
		</v-chip>
		<v-chip 
			v-if="chips && item.sparky"
			class="mr-2"
		>
			{{ $t('forms.external.motorSearch.sparky') }}
		</v-chip>
		<v-chip 
			v-if="chips && item.type"
			class="mr-2"
		>
			{{ $t(`forms.external.motorSearch.type_${item.type}`) }}
		</v-chip>
	</div>
	<span v-if="table && title" class="mr-2">{{ item.designation ?? item.name }}</span>
	<td 
		v-if="table"
		variant="elevated"
		:color="hasCase ? 'green' : 'red'"
		class="mr-2" 
		style="white-space:nowrap;"
	>
		{{ displayCaseInfo && item.manufacture ? item.manufacturer : ' ' }}
		{{ displayCaseInfo && item.caseInfo ? item.caseInfo : ' ' }}
		{{ displayCaseInfo && item.motorCase ? item.motorCase : ' ' }}
	</td>
	<td 
		v-if="table"
		class="mr-2"
		style="white-space:nowrap;"
	>
		<span v-if="item.diameter">{{ diameterDisplay }}</span>
	</td>
	<td 
		v-if="table"
		class="mr-2"
		style="white-space:nowrap;"
	>
		<span v-if="item.impulseClass">{{ item.impulseClass }}</span>
	</td>
	<td 
		v-if="table"
		class="mr-2"
	>
		<span>{{ item.propInfo === 'black powder' ? $t('strings.yes') : '' }}</span>
	</td>
	<td 
		v-if="table"
		class="mr-2"
	>
		{{ item.sparky ? $t('strings.yes') : '' }}
	</td>
	<td 
		v-if="table"
		class="mr-2"
	>
		<span>{{ $t(`forms.external.motorSearch.type_${item.type}`) }}</span>
	</td>
	<th
		v-if="tableHeader"
		class="text-left font-weight-bold"
	>
	{{ $t('forms.external.motorSearch.motorCase') }}
	</th>
	<th
		v-if="tableHeader"
		class="text-left font-weight-bold"
	>
	{{ $t('forms.external.motorSearch.diameter') }}
	</th>
	<th
		v-if="tableHeader"
		class="text-left font-weight-bold"
	>
	{{ $t('forms.external.motorSearch.impulseClass') }}
	</th>
	<th
		v-if="tableHeader"
		class="text-left font-weight-bold"
	>
	{{ $t('forms.external.motorSearch.propInfo_bp') }}
	</th>
	<th
		v-if="tableHeader"
		class="text-left font-weight-bold"
	>
	{{ $t('forms.external.motorSearch.sparky') }}
	</th>
	<th
		v-if="tableHeader"
		class="text-left font-weight-bold"
	>
	{{ $t('forms.external.motorSearch.type') }}
	</th>
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
