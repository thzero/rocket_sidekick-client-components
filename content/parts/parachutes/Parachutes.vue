<template>
	<Parts
		title="parachutes"
		:type="type"
		:fetchParams="fetchParams"
		:debug="debug"
	>
		<template #default="{ detailItem, detailClose, detailError, detailOk, debug }">
			<Parachute
				:model-value="detailItem"
				@cancel="detailClose"
				@close="detailClose"
				@error="detailError"
				@ok="detailOk"
				:debug="debug"
			>
			</Parachute>
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

import Parachute from '@/components/content/parts/part/parachute/Parachute';
import ParachutePanelTitle from '@/components/content/parts/parachutes/ParachutePanelTitle';
import Parts from '@/components/content/parts/Parts';

export default {
	name: 'PartsParachute',
	components: {
		Parachute,
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
			debug,
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
