<template>
	<ContentHeader :value="title" />
	<!-- <pre>{{ JSON.stringify(rockets, null, '  ') }}</pre> -->
	<v-row dense>
		<v-col 
			cols="12"
			style="padding-bottom: 18px;"
		>
			<v-tabs
				v-model="tabs"
				bg-color="primary"
				fixed-tabs
			>
				<v-tab :text="$t('titles.content.rockets.plural')" value="1"></v-tab>
				<v-tab :text="$t('titles.content.launches.title')" value="2"></v-tab>
			</v-tabs>
			<v-tabs-window 
				v-model="tabs"
			>
				<v-tabs-window-item
					value="1"
				>
			<Rockets 
				:type="type" 
			/>
				</v-tabs-window-item>
				<v-tabs-window-item
					value="2"
				>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</v-tabs-window-item>
			</v-tabs-window>
		</v-col>
	</v-row>
</template>

<script>
import { ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

// import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useUserGalleryComponent } from '@/components/content/gallery/galleryComponent';

import ContentHeader from '@/components/content/Header';
import Rockets from '@/components/content/gallery/Rockets';

export default {
	name: 'UserGallery',
	components: {
		ContentHeader,
		Rockets
	},
	props: {
	},
	setup(props, context, options) {
		const tabs = ref(null);
		const type = ref(AppCommonConstants.Rocketry.DisplayTypes.User);

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
			title,
			user
		} = useUserGalleryComponent(props, context, { 
			type: type.value,
			user: true 
		});

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
			title,
			user,
			tabs,
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
