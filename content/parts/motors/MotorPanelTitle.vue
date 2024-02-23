<template>
	{{ item.designation ?? item.name }} 
	<v-chip 
		v-if="displayCaseInfo"
		class="mr-2"
	>
		<span v-if="item.caseInfo">{{ item.manufacturer }} {{ item.caseInfo }}</span>
		<span v-if="item.motorCase">{{ item.motorCase }}</span>
	</v-chip>
	<v-chip 
		v-if="item.sparky"
	>
		{{ $t('forms.external.motorSearch.sparky') }}
	</v-chip>
	<v-chip 
		v-if="item.type"
	>
		{{ $t(`motorSearch.motor_type_${item.type}`) }}
	</v-chip>
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
