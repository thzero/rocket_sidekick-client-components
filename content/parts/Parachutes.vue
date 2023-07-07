<template>
	<Parts
		title="parachutes"
		:type="type"
		:fetchParams="fetchParams"
	>
		<template #default="{ detailItem, detailClose, detailOk }">
			[[ {{  detailItem }}]]
			[[ {{  detailClose }}]]
			[[ {{  detailOk }}]]
			<Parachhute
				:model-value="detailItem"
				@cancel="detailClose"
				@close="detailClose"
				@ok="detailOk"
			>
			</Parachhute>
		</template>
		<template #panelTitle="{ item }">
			<ParachutePanelTitle
				:item="item"
				:manufacturers="manufacturers"
			>
			</ParachutePanelTitle>
		</template> 
	</Parts>
</template>

<script>
import { usePartsDisplayCompany } from '@/components/content/parts/partsDisplayCompany';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import Parachhute from '@/components/content/parts/part/Parachute';
import ParachutePanelTitle from '@/components/content/parts/ParachutePanelTitle';
import Parts from '@/components/content/parts/Parts';

export default {
	name: 'PartsParachute',
	components: {
		Parachhute,
		ParachutePanelTitle,
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
			manufacturers,
			type
		} = usePartsDisplayCompany(props, context, { 
			type: AppCommonConstants.Rocketry.PartTypes.parachute
		});

		const fetchParams = async (correlationId, params) => {
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
