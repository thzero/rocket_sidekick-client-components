<template>
	<ContentHeader :value="title" />
	<!-- <pre>{{ JSON.stringify(rockets, null, '  ') }}</pre> -->
	<v-row dense>
		<v-col 
			cols="12"
			style="padding-bottom: 18px;"
		>
			<v-alert 
				v-if="showInvalid"
				:text="$t('errors.gallery.invalid')"
				type="error"
			>
			</v-alert>
			<Rockets 
				:type="type" 
			/>
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
	name: 'UserGalleryGamerTag',
	components: {
		ContentHeader,
		Rockets
	},
	props: {
	},
	setup(props, context, options) {
		const type = ref(AppCommonConstants.Rocketry.DisplayTypes.GamerTag);

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
			showInvalid,
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
			showInvalid,
			title,
			user,
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
