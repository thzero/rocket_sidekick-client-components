<template>
	<v-row dense>
		<v-col>
			{{ item.designation ?? item.name }}
		</v-col>
		<v-col>
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
			<v-chip 
				v-if="item.diameter"
				class="mr-2"
			>
				{{ $t('forms.external.motorSearch.diameter') }}
			</v-chip>
			<v-chip 
				v-if="item.impulseClass"
				class="mr-2"
			>
				{{ $t('forms.external.motorSearch.impulseClass') }}
			</v-chip>
			<v-chip 
				v-if="item.propInfo === 'black powder'"
				class="mr-2"
			>
				{{ $t('forms.external.motorSearch.propInfo_bp') }}
			</v-chip>
			<v-chip 
				v-if="item.sparky"
				class="mr-2"
			>
				{{ $t('forms.external.motorSearch.sparky') }}
			</v-chip>
			<v-chip 
				v-if="item.type"
				class="mr-2"
			>
				{{ $t(`motorSearch.motor_type_${item.type}`) }}
			</v-chip>
		</v-col>
	</v-row>
</template>

<script>
import { usePartsPanelComponent } from '@/components/content/parts/partPanelComponent';
import { usePartPanelComponentProps } from '@/components/content/parts/partPanelComponentProps';

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
