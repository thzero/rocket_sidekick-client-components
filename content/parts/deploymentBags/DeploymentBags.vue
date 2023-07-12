<template>
	<Parts
		title="deploymentBags"
		:type="type"
		:fetchParams="fetchParams"
		:validation="validation"
		:debug="debug"
	>
		<template #default="{ detailItem, detailClose, detailError, detailOk, debug }">
			<DeploymentBag
				:model-value="detailItem"
				@cancel="detailClose"
				@close="detailClose"
				@error="detailError"
				@ok="detailOk"
				:debug="debug"
			>
			</DeploymentBag>
		</template>
		<template #panelTitle="{ item }">
			<deploymentBagPanelTitle
				:item="item"
				:manufacturers="manufacturers"
			>
			</DeploymentBagPanelTitle>
		</template> 
		<template #filters="{  }">
			<v-row dense>
				<v-col cols="12" sm="6">
					<!-- <VTextFieldWithValidation
						ref="motorRef"
						v-model="motor"
						vid="motor"
						:validation="validation"
						:label="$t('forms.external.motorSearch.motor')"
						:hint="$t('forms.external.motorSearch.motor_hint')"
					/> -->
					name
				</v-col>
				<v-col cols="12" sm="6">
					<!-- <VSelectWithValidation
						ref="diameterRef"
						v-model="diameter"
						vid="diameter"
						:items="diameters"
						:validation="validation"
						:label="$t('forms.external.motorSearch.diameter')"
					/> -->
					diameter
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12" sm="6">
					<!-- <v-checkbox
						v-model="singleUse"
						density="compact"
						:label="$t('forms.external.motorSearch.singleUse')"
					/> -->
					pilot chute
				</v-col>
			</v-row>
			<v-row dense>
				<v-col col="12">
					<!-- <VSelectWithValidation
						ref="manufacturerRef"
						v-model="manufacturer"
						vid="manufacturer"
						multiple
						:max-values="2"
						:items="manufacturers"
						:validation="validation"
						:label="$t('forms.external.motorSearch.manufacturer')"
						:hint="$t('forms.external.motorSearch.manufacturer_hint')"
					/> -->
					manufacturers
				</v-col>
			</v-row>
		</template> 
	</Parts>
</template>

<script>
import { usePartsDisplayCompany } from '@/components/content/parts/partsDisplayCompany';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import DeploymentBag from '@/components/content/parts/part/deploymentBag/DeploymentBag';
import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';
import Parts from '@/components/content/parts/Parts';

export default {
	name: 'PartsdeploymentBag',
	components: {
		DeploymentBag,
		DeploymentBagPanelTitle,
		Parts
	},
	setup(props, context, options) {
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
			debug,
			manufacturers,
			type
		} = usePartsDisplayCompany(props, context, { 
			type: AppCommonConstants.Rocketry.PartTypes.deploymentBag
		});

		const fetchParams = (correlationId, params) => {
			return params; // TODO: setup params...
		};

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
			debug,
			manufacturers,
			type,
			fetchParams
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
