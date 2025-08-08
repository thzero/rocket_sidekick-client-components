<template>
	<div
		v-if="showUserName"
		class="d-flex"
	>
		<ContentHeader 
			:value="title(item)"
		>
			<!-- <template v-slot:after>
				<v-btn
					:variant="buttonsForms.variant.default"
					:color="buttonsForms.color.default"
					class="mr-2"
				>
					{{ $t('buttons.back') }}
				</v-btn>
			</template> -->
		</ContentHeader>
		<v-btn
			:variant="buttonsForms.variant.default"
			:color="buttonsForms.color.default"
			:to="launchUrlBack(item)"
			class="text-right"
		>
			{{ $t('buttons.gallery') }}
		</v-btn>
	</div>
	<ContentHeader 
		v-if="!showUserName"
		:value="title(item)"
	>
		<!-- <template v-slot:after>
			<v-btn
				:variant="buttonsForms.variant.default"
				:color="buttonsForms.color.default"
				class="mr-2"
			>
				{{ $t('buttons.back') }}
			</v-btn>
		</template> -->
	</ContentHeader>
	<v-card
		class="mx-auto"
		color="secondary"
	>
		<div
			style="background-color: #b6b6b6;"
		>
			<a 
				v-if="!clickType || clickType==='hyperlink'"
				:href="launchUrlBack(item)"
			>
				<v-img 
					:src="hasLaunchCoverUrl(item) ? launchCoverUrl(item) : '/images/blank.png'"
					cover
				></v-img>
			</a>
			<a 
				v-if="clickType==='click'"
				@click="clickLaunch(item)"
				style="cursor: pointer;"
			>
				<v-img
					:src="hasLaunchCoverUrl(item) ? launchCoverUrl(item) : '/images/blank.png'"
					cover
				>
					<div class="text-right pt-4">
						<v-btn
							v-if="backType==='hyperlink'"
							:variant="buttonsForms.variant.default"
							:color="buttonsForms.color.default"
							class="mr-2"
							:to="launchUrl(item)"
						>
							{{ $t('buttons.back') }}
						</v-btn>
						<v-btn
							v-if="backType==='close'"
							:variant="buttonsForms.variant.default"
							:color="buttonsForms.color.default"
							class="mr-2"
							@click="clickClose"
						>
							{{ $t('buttons.close') }}
						</v-btn>
						<v-btn
							:variant="buttonsForms.variant.default"
							:color="buttonsForms.color.default"
							class="mr-2"
							:to="launchUrl(item)"
							target="_blank"
							icon="mdi-open-in-new"
							@click.native.stop=""
						>
						</v-btn>
						<!-- 
						append-icon="mdi mdi-open-in-new"
						{{ $t('buttons.open') }} -->
					</div>
				</v-img>
			</a>
		</div>
		<v-card-title
			:class="launchStatusColor(item)"
		>
			<v-row dense>
				<v-col>
					<v-icon
						v-if="launchStatusIcon(item)"
						class="mr-2"
					>	
						{{ launchStatusIcon(item) }}
					</v-icon>
					<!-- <v-btn
						v-if="!clickType || clickType==='hyperlink'"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						:to="launchUrlBack(item)"
						size="large"
					>
						{{ launchTitleLocation(item) }}
					</v-btn>
					<v-btn
						v-if="clickType==='click'"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						size="large"
						@click="clickLaunch(item)"
					>
						{{ launchTitleLocation(item) }}
					</v-btn> -->
					<span>{{ launchTitleLocation(item) }}</span>
					<v-btn
						v-if="rocketIsPublic(item)"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						size="large"
						:to="rocketUrl(item)"
						class="ml-2"
					>
						{{ launchTitle(item) }}
					</v-btn>
					<span
						v-if="!rocketIsPublic(item)"
						class="ml-2"
					>
						{{ launchTitle(item) }}
					</span>
				</v-col>
				<v-col>
					<img :src="rocketTypeIcon(item && item.rocketSetup ? item.rocketSetup.rocket : null)" style="height: 48px; float: right;" />
				</v-col>
			</v-row>
		</v-card-title>
	</v-card>
	<v-row 
		dense
		class="mt-2"
	>
		<V-col
			cols="12" md="6"
		>
			<v-card>
				<v-card-title>
<p class="text-h6 text-center">{{ $t('forms.content.launches.location.title') }}</p>
				</v-card-title>
				<v-card-text>
					<v-row 
						dense
					>
						<v-col 
							cols="6"
						>
							<b>{{ $t('forms.content.launches.date') }}</b><br>
							{{ launchDate(item) }}
						</v-col>
						<v-col 
							cols="6"
						>
							<b>{{ $t('forms.content.locations.address') }}</b><br>
							{{ launchLocationIterationAddress(item) }}
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</V-col>
		<V-col
			cols="12" md="6"
		>
			<v-card
				v-if="hasLaunchRocketSpecs(item)"
				dense
			>
				<v-card-title>
<p class="text-h6 text-center">{{ $t('titles.content.rockets.plural') }}&nbsp;{{ $t('titles.content.rockets.specifications') }}</p>
				</v-card-title>
				<v-card-text>
					<v-row 
						dense
					>
						<v-col
							v-if="launchRocketDiameter(item)"
							cols="3" md="2"
						>
							<br 
								v-if="$vuetify.display.lgAndUp"
							>
							<b>{{ $t('strings.rockets.diameterMajor') }}</b><br>
							{{ launchRocketDiameter(item) }}
						</v-col>
						<v-col 
							v-if="launchRocketLength(item)"
							cols="3" md="2"
						>
							<br 
								v-if="$vuetify.display.lgAndUp"
							>
							<b>{{ $t('strings.rockets.length') }}</b><br>
							{{ launchRocketLength(item) }}
						</v-col>
						<v-col 
							v-if="launchRocketWeight(item)"
							cols="3" md="2"
						>
							<br 
								v-if="$vuetify.display.lgAndUp"
							>
							<b>{{ $t('strings.rockets.weight') }}</b><br>
							{{ launchRocketWeight(item) }}
						</v-col>
						<v-col 
							v-if="launchRocketCg(item)"
							cols="4" md="2"
						>
							<b>{{ $t('strings.rockets.cg') }}</b><br>
							{{ launchRocketCg(item) }}
						</v-col>
						<v-col 
							v-if="launchRocketCp(item)"
							cols="4" md="2"
						>
							<b>{{ $t('strings.rockets.cp') }}</b><br>
							{{ launchRocketCp(item) }}
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</V-col>
	</v-row>
	<v-row 
		v-if="hasLaunchWeather(item)"
		dense
		class="mb-2"
	>
		<v-col 
			cols="12"
		>
			<v-card
				dense
			>
				<v-card-title>
<p class="text-h6 text-center">{{ $t('forms.content.launches.weather.title') }}</p>
				</v-card-title>
				<v-card-text>
					<v-row 
						dense
					>
						<v-col
							v-if="launchTemperature(item)"
							cols="4"
						>
							<b>{{ $t('forms.content.launches.weather.temperature') }}</b><br>
							{{ launchTemperature(item) }}
						</v-col>
						<v-col
							v-if="launchWindSpeed(item)"
							cols="4"
						>
							<b>{{ $t('forms.content.launches.weather.windspeed') }}</b><br>
							{{ launchWindSpeed(item) }}
						</v-col>
						<v-col
							v-if="launchWeather(item)"
							cols="4"
						>
							<b>{{ $t('forms.content.launches.weather.title') }}</b><br>
							{{ launchWeather(item) }}
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
	<v-row 
		v-if="hasLaunchResults(item)"
		dense
		class="mb-2"
	>
		<v-col 
			cols="12"
		>
			<v-card
				dense
			>
				<v-card-title>
<p class="text-h6 text-center">{{ $t('forms.content.launches.results.title') }}</p>
				</v-card-title>
				<v-card-text>
					<v-row dense
						class="mb-2"
					>
						<v-col 
							cols="12"
						>
							<v-row
								dense
							>
								<v-col
									v-if="launchResultsAccelerationMax(item)"
									cols="6" md="2"
								>
									<b>{{ $t('forms.content.launches.results.acceleration.max2') }}</b><br>
									{{ launchResultsAccelerationMax(item) }}
								</v-col>
								<v-col
									v-if="launchResultsVelocityMax(item)"
									cols="6" md="2"
								>
									<b>{{ $t('forms.content.launches.results.velocity.max2') }}</b><br>
									{{ launchResultsVelocityMax(item) }}
								</v-col>
								<v-col
									v-if="launchResultsAltitudeMax(item)"
									cols="4" md="2"
								>
									<b>{{ $t('forms.content.launches.results.altitude.max2') }}</b><br>
									{{ launchResultsAltitudeMax(item) }}
								</v-col>
								<v-col
									v-if="launchResultsAltitudeMain(item)"
									cols="4" md="2"
								>
									<b>{{ $t('forms.content.launches.results.altitude.main2') }}</b><br>
									{{ launchResultsAltitudeMain(item) }}
								</v-col>
								<v-col
									v-if="launchResultsAltitudeDrogue(item)"
									cols="4" md="2"
								>
									<b>{{ $t('forms.content.launches.results.altitude.drogue2') }}</b><br>
									{{ launchResultsAltitudeDrogue(item) }}
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
	<v-row 
		v-if="hasLaunchResultsCoords(item)"
		dense
		class="mb-2"
	>
		<v-col 
			cols="12"
		>
			<v-card
				dense
			>
				<v-card-title>
<p class="text-h6 text-center">{{ $t('forms.content.launches.map') }}</p>
				</v-card-title>
				<v-card-text>
					<LaunchMap
						:id="item.id"
						type="recovery"
						:coords="launchResultsCoords(item)"
						:coordsLaunch="launchResultsCoordsLaunch(item)"
						:coordsRecovery="launchResultsCoordsRecovery(item)"
					></LaunchMap>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
	<v-row 
		v-if="item && item.notes"
		dense
		class="mb-2"
	>
		<v-col 
			cols="12"
		>
			<v-card
				dense
			>
				<v-card-title>
<p class="text-h6 text-center">{{ $t('forms.content.launches.notes') }}</p>
				</v-card-title>
				<v-card-text>
					<VtMarkdown v-model="item.notes" :use-github=false />
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
	<v-row 
		v-if="item && item.notes"
		dense
		class="mb-2"
	>
		<v-col 
			cols="12"
		>
			<v-card
				dense
			>
				<v-card-title>
<p class="text-h6 text-center">{{ $t('forms.content.launches.urls') }}</p>
				</v-card-title>
				<v-card-text>
					<v-row dense>
						<v-col
							cols="12"
						>
							<v-row dense>
								<v-col
									v-if="item && item.albumUrl"
									cols="12" md="6"
								>
									<b>{{ $t('forms.content.launches.album') }}</b><br>
									<a 
										:href="item.albumUrl"
										target="_blank"
										style="color: white"
									>
										{{ item.albumUrl }}
									</a>
								</v-col>
								<v-col
									v-if="item && item.videoUrl"
									cols="12" md="6"
								>
									<b>{{ $t('forms.content.launches.video') }}</b><br>
									<a 
										:href="item.videoUrl"
										target="_blank"
										style="color: white"
									>
										{{ item.videoUrl }}
									</a>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import ContentHeader from '@/components/content/Header';
import LaunchMap from '@/components/content/launches/launch/LaunchMap';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';

import { useLaunchInfoBaseProps } from '@/components/content/gallery/launches/launchInfoBaseProps';
import { useLaunchInfoBaseComponent } from '@/components/content/gallery/launches/launchInfoBase';

export default {
	name: 'GalleryLaunchInfo',
	components: {
		ContentHeader,
		LaunchMap,
		VtMarkdown
	},
	props: {
		...useLaunchInfoBaseProps
	},
	emits: ['close'],
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
			serviceStore,
			sortByOrder,
			target,
			buttonsDialog,
			buttonsForms,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			hasLaunchCoverUrl,
			hasLaunchResults,
			hasLaunchResultsCoords,
			hasLaunchResultsCoordsLaunch,
			hasLaunchResultsCoordsLocation,
			hasLaunchResultsCoordsRecovery,
			hasCoordsLocationIteration,
			hasLaunchRocketSpecs,
			hasLaunchWeather,
			isLaunchFailure,
			isLaunchSuccess,
			launchLocationIterationAddress,
			launchCoverUrl,
			launchDate,
			launchLocationIteration,
			launchLocationName,
			launchLocationIterationCoords,
			launchResultsAccelerationDrogue,
			launchResultsAccelerationMain,
			launchResultsAccelerationMax,
			launchResultsAltitudeDrogue,
			launchResultsAltitudeMain,
			launchResultsAltitudeMax,
			launchResultsCoords,
			launchResultsCoordsLatLaunch,
			launchResultsCoordsLongLaunch,
			launchResultsCoordsLatRecovery,
			launchResultsCoordsLongRecovery,
			launchResultsCoordsLaunch,
			launchResultsCoordsLocation,
			launchResultsCoordsRecovery,
			launchResultsVelocityMax,
			launchResultsVelocityRecovery,
			launchRocketCg,
			launchRocketCp,
			launchRocketDiameter,
			launchRocketLength,
			launchRocketWeight,
			launchStatusColor,
			launchStatusIcon,
			launchTemperature,
			launchWeather,
			launchWindSpeed,
			launchTitle,
			launchTitleLocation,
			item,
			clickClose,
			clickLaunch,
			clickRocket,
			requestedTag,
			launchUrl,
			launchUrlBack,
			rocketIsPublic,
			rocketUrl,
			title
		} = useLaunchInfoBaseComponent(props, context, options);

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
			buttonsDialog,
			buttonsForms,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			hasLaunchCoverUrl,
			hasLaunchResults,
			hasLaunchResultsCoords,
			hasLaunchResultsCoordsLaunch,
			hasLaunchResultsCoordsLocation,
			hasLaunchResultsCoordsRecovery,
			hasCoordsLocationIteration,
			hasLaunchRocketSpecs,
			hasLaunchWeather,
			isLaunchFailure,
			isLaunchSuccess,
			launchLocationIterationAddress,
			launchCoverUrl,
			launchDate,
			launchLocationIteration,
			launchLocationName,
			launchLocationIterationCoords,
			launchResultsAccelerationDrogue,
			launchResultsAccelerationMain,
			launchResultsAccelerationMax,
			launchResultsAltitudeDrogue,
			launchResultsAltitudeMain,
			launchResultsAltitudeMax,
			launchResultsCoords,
			launchResultsCoordsLatLaunch,
			launchResultsCoordsLongLaunch,
			launchResultsCoordsLatRecovery,
			launchResultsCoordsLongRecovery,
			launchResultsCoordsLaunch,
			launchResultsCoordsLocation,
			launchResultsCoordsRecovery,
			launchResultsVelocityMax,
			launchResultsVelocityRecovery,
			launchRocketCg,
			launchRocketCp,
			launchRocketDiameter,
			launchRocketLength,
			launchRocketWeight,
			launchStatusColor,
			launchStatusIcon,
			launchTemperature,
			launchWeather,
			launchWindSpeed,
			launchTitle,
			launchTitleLocation,
			item,
			clickClose,
			clickLaunch,
			clickRocket,
			requestedTag,
			launchUrl,
			launchUrlBack,
			rocketIsPublic,
			rocketUrl,
			title
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
