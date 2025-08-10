<template>
	<ContentHeader :value="title" />
	<!-- <pre>{{ JSON.stringify(rockets, null, '  ') }}</pre> -->
	<v-row 
		v-if="!rocketId"
		dense
	>
		<v-col 
			cols="12" md="6"
			v-for="item in rockets"
			:key="item.name"
			style="padding-bottom: 18px;"
		>
			<RocketPanel
				:item="item"
				:manufacturers="manufacturers"
				:type="type"
				displayExtras="true"
				clickType="click"
				@display="handleRocket"
			/>
		</v-col>
	</v-row>
	<div
		v-if="rocketId"
	>
		<RocketInfo
			ref="rocketInfo"
			backType="close"
			:manufacturers="manufacturers"
			:type="type"
			:id="rocketId"
			@close="handleRocketClose"
		/>
	</div>
</template>

<script>
import { ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import { useRocketsBaseComponent } from '@/components/content/rockets/gallery/rocketsBase';
import { useRocketsBaseProps } from '@/components/content/rockets/gallery/rocketsBaseProps';
import RocketInfo from '@/components/content/rockets/gallery/rocket/RocketInfo';
import RocketPanel from '@/components/content/rockets/gallery/RocketPanel';

import ContentHeader from '@/components/content/Header';

export default {
	name: 'RocketsGallery',
	components: {
		ContentHeader,
		RocketInfo,
		RocketPanel
	},
	props: {
		...useRocketsBaseProps
	},
	setup(props, context) {
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
			sortByOrder,
			target,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			manufacturers,
			params,
			rockets,
			title,
			type,
			rocketUrl
		} = useRocketsBaseComponent(props, context, {
			type: AppCommonConstants.Rocketry.DisplayTypes.Site
		});

		const rocketId = ref(null);
		
		const handleRocket = (id) => {
			rocketId.value = id;
		};
		const handleRocketClose = () => {
			rocketId.value = null;
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
			serviceStore,
			sortByOrder,
			target,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			manufacturers,
			params,
			rockets,
			title,
			type,
			rocketUrl,
			rocketId,
			handleRocket,
			handleRocketClose
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
