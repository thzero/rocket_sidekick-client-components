<template>
	<Parts
		title="chuteReleases"
		:type="type"
		:fetchParams="fetchParams"
		:debug="debug"
	>
		<template #default="{ detailItem, detailClose, detailError, detailOk, debug }">
			<ChuteRelease
				:model-value="detailItem"
				@cancel="detailClose"
				@close="detailClose"
				@error="detailError"
				@ok="detailOk"
				:debug="debug"
			>s
			</ChuteRelease>
		</template>
		<template #panelTitle="{ item }">
			<ChuteReleasePanelTitle
				:item="item"
				:manufacturers="manufacturers"
			>
			</ChuteReleasePanelTitle>
		</template> 
	</Parts>
</template>

<script>
import { usePartsDisplayCompany } from '@/components/content/parts/partsDisplayCompany';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import ChuteRelease from '@/components/content/parts/part/chuteRelease/ChuteRelease';
import ChuteReleasePanelTitle from '@/components/content/parts/chuteReleases/ChuteReleasePanelTitle';
import Parts from '@/components/content/parts/Parts';

export default {
	name: 'PartsChuteRelease',
	components: {
		ChuteRelease,
		ChuteReleasePanelTitle,
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
			type: AppCommonConstants.Rocketry.PartTypes.chuteRelease
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
