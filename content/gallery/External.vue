<template>
	<v-alert
		v-if="showInvalid"
		type="error"
		:text="$t('errors.content.gallery.invalid')"
	></v-alert>
	<div
		v-if="!showInvalid"
	>
		<div
			class="d-flex"
		>
			<ContentHeader :value="title" />
			<!-- <v-btn
				:variant="buttonsForms.variant.default"
				:color="buttonsForms.color.default"
				icon="mdi-share-variant"
			>
			</v-btn> -->
		</div>
		<!-- <pre>{{ JSON.stringify(rockets, null, '  ') }}</pre> -->
		<v-row dense>
			<v-col 
				cols="12"
				style="padding-bottom: 18px;"
			>
				<v-tabs
					v-model="tabs"
					bg-color="primary"
					grow
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
							:requestedTag="requestedTag"
						/>
					</v-tabs-window-item>
					<v-tabs-window-item
						value="2"
					>
						<Launches 
							:type="type" 
							:requestedTag="requestedTag"
						/>
					</v-tabs-window-item>
				</v-tabs-window>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useUserGalleryComponent } from '@/components/content/gallery/galleryComponent';

import ContentHeader from '@/components/content/Header';
import Launches from '@/components/content/gallery/launches/Launches';
import Rockets from '@/components/content/gallery/rockets/Rockets';

export default {
	name: 'UserGalleryGamerTag',
	components: {
		ContentHeader,
		Launches,
		Rockets
	},
	props: {
	},
	setup(props, context, options) {
		const tabs = ref(null);
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

		const {
			buttonsDialog,
			buttonsForms
		} = useButtonComponent(props, context);

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
			tabs,
			type,
			buttonsDialog,
			buttonsForms
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
