<template>
	<div>
		<v-row
			dense
			:pt-4="$vuetify.display.smAndDown && newsCount > 0"
			:pt-2="$vuetify.display.mdAndUp || newsCount === 0"
		>
			<v-col
				col="12"
				md="4"
				class="pb-4"
				v-if="$vuetify.display.mdAndUp"
			>
				<v-card
					class="mb-2"
					height="100%"
				>
					<v-card-item>
						<v-badge :content="newsCount" inline>
 							<p class="text-h5">
								{{ $t('titles.newsLatest') }}&nbsp;&nbsp;
							</p>
						</v-badge>
					</v-card-item>
					<News />
					<!-- <v-overlay
						:model-value="!initializeCompleted"
						contained
						class="align-center justify-center"
					>
						<v-progress-circular
							:size="70"
							:width="7"
							color="purple"
							indeterminate
						></v-progress-circular>
					</v-overlay> -->
					<LoadingOverlay
						:signal="!initializeCompleted"
					/>
				</v-card>
			</v-col>
			<v-col
				col="12"
				md="8"
				:pl-2="$vuetify.display.mdAndUp"
			>
				<v-card
					class="mb-2"
				>
					<v-card-item>
						<v-row dense>
							<v-col
								cols="12"
							>
								<div class="text-center text-h5">
									{{ $t('strings.welcome') }} {{ $t('titles.application') }} {{ userDisplayName }}
									<!-- <v-chip
										class="float-right"
										color="success"
										outlined
										label
									>
										{{ userDisplayName }}
									</v-chip> -->
								</div>
							</v-col>
							<v-col
								cols="12"
							>
								<p v-html="webSiteInject($t('strings.content.home.description'))"></p>
							</v-col>
							<v-col
								cols="12"
							>
								<p v-html="webSiteInject($t('strings.content.home.tools.description'))"></p>
							</v-col>
							<v-col
								v-if="features.Home.additional"
								cols="12"
							>
								<p v-html="webSiteInject($t(features.Home.additionalId))"></p>
							</v-col>
							<v-col
								v-if="hasContentTools"
								cols="12"
								class="text-center"
							>
								<hr />
							</v-col>
							<v-col
								v-for="item in tools"
								:key="item.name"
								cols="12"
								md="6"
								lg="4"
								class="text-center"
							>
								<v-card 
									class="mb-2"
									height="100%"
									variant="outlined"
								>
									<v-card-item>
										<v-btn variant="flat" block class="mr-2" color="primary"
											:to="contentLink(item)"
										>
											{{ contentTitle(item) }}
										</v-btn>
									</v-card-item>
									<v-card-text class="text-left">
										{{ contentDescription(item) }}
									</v-card-text>
								</v-card>
							</v-col>
							<v-col
								v-if="hasContentInfo"
								cols="12"
								class="text-center"
							>
								<hr />
							</v-col>
							<v-col
								v-for="item in info"
								:key="item.name"
								cols="12"
								md="6"
								lg="4"
								class="text-center"
							>
								<v-card 
									class="mb-2"
									height="100%"
									variant="outlined"
								>
									<v-card-item>
										<v-btn variant="flat" block class="mr-2" color="primary"
											:to="contentLink(item)"
										>
											{{ contentTitle(item) }}
										</v-btn>
									</v-card-item>
									<v-card-text class="text-left">
										{{ contentDescription(item) }}
									</v-card-text>
								</v-card>
							</v-col>
							<!--
							<v-col
								cols="12"
								class="text-center"
							>
								<hr />
							</v-col>
							<v-col
								cols="12"
							>
								<p>
									{{ $t('strings.content.home.tools.additional1a') }}
									<a :href="externalGithub" target="_blank">{{ externalGithub }}</a>
									{{ $t('strings.content.home.tools.additional1b') }}
								</p>
							</v-col>
							-->
						</v-row>
					</v-card-item>
					<!-- <v-overlay
						:model-value="!initializeCompleted"
						contained
						class="align-center justify-center"
					>
						<v-progress-circular
							:size="70"
							:width="7"
							color="purple"
							indeterminate
						></v-progress-circular>
					</v-overlay> -->
					<LoadingOverlay
						:signal="!initializeCompleted"
					/>
				</v-card>
				<v-card
					class="mb-2"
				>
					<v-card-item>
						<v-row dense>
							<v-col
								v-if="features.Home.slideshow"
								cols="12"
								class="mt-4 mb-4"
							>
								<p>
									{{ $t('strings.content.home.slideshow.description') }}
								</p>
							</v-col>
							<v-col
								v-if="features.Home.slideshow"
								cols="12"
							>
								<div class="slideshow">
									<iframe id="slideshow" :src="slideshow" frameborder="0" class="slideshowFrame"></iframe>
								</div>
							</v-col>
						</v-row>
					</v-card-item>
				</v-card>
			</v-col>
			<v-col
				v-if="$vuetify.display.smAndDown"
				id="element"
				cols="12"
				class="pb-4"
			>
				<v-card
					class="mb-2"
					style="height: 100%;"
				>
					<v-card-text>
						<v-badge :content="newsCount" inline>
 							<p class="text-h5">
								{{ $t('titles.newsLatest') }}&nbsp;&nbsp;
							</p>
						</v-badge>
					</v-card-text>
					<News />
					<!-- <v-overlay
						:model-value="!initializeCompleted"
						contained
						class="align-center justify-center"
					>
						<v-progress-circular
							:size="70"
							:width="7"
							color="purple"
							indeterminate
						></v-progress-circular>
					</v-overlay> -->
					<LoadingOverlay
						:signal="!initializeCompleted"
					/>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { useHomeBaseComponent } from '@/components/homeBase';

import News from '@/components/News';
import LoadingOverlay from '@/components/LoadingOverlay';
import VtLoadingOverlay from '@thzero/library_client_vue3_vuetify3/components/VtLoadingOverlay';

export default {
	name: 'AppHomeComponent',
	components: {
		LoadingOverlay,
		News,
		VtLoadingOverlay
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
			externalGithub,
			features,
			initializeCompleted,
			contentDescription,
			contentLink,
			contentTitle,
			hasContent,
			hasContentInfo,
			hasContentTools,
			info,
			isLoggedIn,
			newsCount,
			slideshow,
			tools,
			user,
			userDisplayName,
			webSiteInject
		} = useHomeBaseComponent(props, context);

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
			externalGithub,
			features,
			initializeCompleted,
			contentDescription,
			contentLink,
			contentTitle,
			hasContent,
			hasContentInfo,
			hasContentTools,
			info,
			isLoggedIn,
			newsCount,
			slideshow,
			tools,
			user,
			userDisplayName,
			webSiteInject
		};
	},
	// eslint-disable-next-line
	// async beforeRouteUpdate (to, from, next) {
	// 	// called when the route that renders this component has changed,
	// 	// but this component is reused in the new route.
	// 	// For example, for a route with dynamic params `/foo/:id`, when we
	// 	// navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
	// 	// will be reused, and this hook will be called when that happens.
	// 	// has access to `this` component instance.
	// 	(async () => {
	// 		const self = this;
	// 		try {
	// 			this.initializeCompleted = false;

	// 			const correlationId = this.correlationId();

	// 			await Promise.all([
	// 				LibraryClientUtility.$store.dispatcher.news.getLatest(correlationId)
	// 			]);
	// 		}
	// 		finally {
	// 			const timeout = setTimeout(function () {
	// 				self.initializeCompleted = true;
	// 				clearTimeout(timeout);
	// 			}, DelayMs);
	// 		}
	// 	})().catch(err => {
	// 		// eslint-disable-next-line
	// 		console.error(err);
	// 	});
	// 	next();
	// }
};
</script>

<style>
.slideshow {
    width: 100%;
    height: 0;
    padding-bottom: 56%; /* Change this till it fits the dimensions of your video */
    position: relative;
}

.slideshowFrame {
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
}
</style>
