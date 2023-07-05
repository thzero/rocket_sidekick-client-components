<template>
	<Parts
		title="parachutes"
		:type="type"
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
	</Parts>
</template>

<script>
import { ref} from 'vue';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import Parachhute from '@/components/content/parts/part/Parachute';
import Parts from '@/components/content/parts/Parts';

export default {
	name: 'PartsParachute',
	components: {
		Parachhute,
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
			success
		} = useBaseComponent(props, context, options);

		const type = ref(AppCommonConstants.Rocketry.PartTypes.parachute);

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
			type
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
