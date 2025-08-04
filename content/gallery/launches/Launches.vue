<template>
	<v-row
		v-if="!launchId"
		dense
		style="margin-top: 24px;"
	>
		<v-col 
			cols="12" md="6"
			v-for="item in launches"
			:key="item.name"
			style="padding-bottom: 18px;"
		>
			<LaunchPanel
				:item="item"
				clickType="click"
				:displayExtras="true"
				:type="type"
				:requestedTag="requestedTag"
				@display="handleLaunch"
			/>
		</v-col>
	</v-row>
	<div
		v-if="launchId"
	>
		<!-- <LaunchInfo
			ref="launchInfo"
			backType="close"
			:type="type"
			:id="launchId"
			:requestedTag="requestedTag"
			:showUserName="false"
			@close="handleLaunchClose"
		/> -->
	</div>
</template>

<script>
import { useLaunchPanelBaseProps } from '@/components/content/gallery/launches/launchPanelBaseProps';
import { useLaunchesUserGalleryComponent } from '@/components/content/gallery/launches/launchesGalleryComponent';

// import LaunchInfo from '@/components/content/gallery/launches/LaunchInfo';
import LaunchPanel from '@/components/content/gallery/launches/LaunchPanel';

export default {
	name: 'UserGalleryLaunches',
	components: {
		// LaunchInfo,
		LaunchPanel
	},
	props: {
		...useLaunchPanelBaseProps
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
			requestedTag,
			user,
			serviceStore,
			sortByOrder,
			target,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			launches,
			title,
			launchId,
			handleLaunch,
			handleLaunchClose,
			launchUrl
		} = useLaunchesUserGalleryComponent(props, context);

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
			requestedTag,
			user,
			serviceStore,
			sortByOrder,
			target,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			launches,
			title,
			launchId,
			handleLaunch,
			handleLaunchClose,
			launchUrl
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
