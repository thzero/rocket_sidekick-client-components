<template>
	<Parts
		title="deploymentBags"
		:type="type"
		:fetchParams="fetchParams"
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
