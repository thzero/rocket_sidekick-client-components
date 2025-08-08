<template>
	<v-card
		:key="item.id"
		class="mx-auto"
		max-width="500"
		color="secondary"
	>
		<div
			style="background-color: #b6b6b6;"
		>
			<a 
				v-if="!clickType || clickType==='hyperlink'"
				:href="launchUrl(item)"
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
					<v-btn
						v-if="!clickType || clickType==='hyperlink'"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						:to="launchUrl(item)"
						size="large"
					>
						{{ launchTitle(item) }} @ <br> {{ launchTitleLocation(item) }}
					</v-btn>
					<v-btn
						v-if="clickType==='click'"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						size="large"
						@click="clickLaunch(item)"
					>
						{{ launchTitle(item) }} @ <br> {{ launchTitleLocation(item) }}
					</v-btn>
				</v-col>
				<v-col>
					<img :src="rocketTypeIcon(item.rocketSetup ? item.rocketSetup.rocket : null)" style="height: 48px; float: right;" />
				</v-col>
			</v-row>
		</v-card-title>
		<v-card-text
			v-if="displayExtras"
		>
			<v-row 
				dense
			>
				<v-col
					cols="12"
					style="text-align: center;"
				>
					<!-- <v-btn
						v-if="!clickType || clickType==='hyperlink'"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						:to="launchUrl(item)"
						size="large"
					>
						{{ launchTitle(item) }} @ {{ launchTitleLocation(item) }}
					</v-btn>
					<v-btn
						v-if="clickType==='click'"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						size="large"
						@click="clickLaunch(item)"
					>
						{{ launchTitle(item) }} @ {{ launchTitleLocation(item) }}
					</v-btn> -->
				</v-col>
			</v-row>
			<v-row 
				dense
				class="mt-2"
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
			<v-row 
				v-if="hasLaunchRocketSpecs(item)"
				dense
				class="mb-2"
			>
				<v-col 
					cols="12"
				>
					<h3>{{ $t('titles.content.rockets.specifications') }}</h3>
					<v-divider class="border-opacity-100"></v-divider>
				</v-col>
				<v-col
					v-if="launchRocketDiameter(item)"
					cols="6" sm="3" md="2"
				>
					<br 
						v-if="$vuetify.display.lgAndUp"
					>
					<b>{{ $t('strings.rockets.diameterMajor') }}</b><br>
					{{ launchRocketDiameter(item) }}
				</v-col>
				<v-col 
					v-if="launchRocketLength(item)"
					cols="6" sm="3" md="2"
				>
					<br 
						v-if="$vuetify.display.lgAndUp"
					>
					<b>{{ $t('strings.rockets.length') }}</b><br>
					{{ launchRocketLength(item) }}
				</v-col>
				<v-col 
					v-if="launchRocketWeight(item)"
					cols="6" sm="3" md="2"
				>
					<br 
						v-if="$vuetify.display.lgAndUp"
					>
					<b>{{ $t('strings.rockets.weight') }}</b><br>
					{{ launchRocketWeight(item) }}
				</v-col>
				<v-col 
					v-if="launchRocketCg(item)"
					cols="6" sm="4" md="2"
				>
					<b>{{ $t('strings.rockets.cg') }}</b><br>
					{{ launchRocketCg(item) }}
				</v-col>
				<v-col 
					v-if="launchRocketCp(item)"
					cols="6" sm="4" md="2"
				>
					<b>{{ $t('strings.rockets.cp') }}</b><br>
					{{ launchRocketCp(item) }}
				</v-col>
			</v-row>
			<v-row 
				v-if="hasLaunchWeather(item)"
				dense
				class="mb-2"
			>
				<v-col 
					cols="12"
				>
					<h3>{{ $t('forms.content.launches.weather.title') }}</h3>
					<v-divider class="border-opacity-100"></v-divider>
				</v-col>
				<v-col
					v-if="launchTemperature(item)"
					cols="4" sm="4"
				>
					<b>{{ $t('forms.content.launches.weather.temperature') }}</b><br>
					{{ launchTemperature(item) }}
				</v-col>
				<v-col
					v-if="launchWindSpeed(item)"
					cols="4" sm="4"
				>
					<b>{{ $t('forms.content.launches.weather.windspeed') }}</b><br>
					{{ launchWindSpeed(item) }}
				</v-col>
				<v-col
					v-if="launchWeather(item)"
					cols="12" sm="4"
				>
					<b>{{ $t('forms.content.launches.weather.title') }}</b><br>
					{{ launchWeather(item) }}
				</v-col>
			</v-row>
			<v-row dense
				v-if="hasLaunchResults(item)"
				class="mb-2"
			>
				<v-col 
					cols="12"
				>
					<h3>{{ $t('forms.content.launches.results.title') }}</h3>
					<v-divider class="border-opacity-100"></v-divider>
				</v-col>
				<v-col 
					cols="12"
				>
					<v-row
						dense
					>
						<v-col
							v-if="launchResultsAccelerationMax(item)"
							cols="6" sm="4"
						>
							<b>{{ $t('forms.content.launches.results.acceleration.max2') }}</b><br>
							{{ launchResultsAccelerationMax(item) }}
						</v-col>
						<v-col
							v-if="launchResultsVelocityMax(item)"
							cols="6" sm="4"
						>
							<b>{{ $t('forms.content.launches.results.velocity.max2') }}</b><br>
							{{ launchResultsVelocityMax(item) }}
						</v-col>
					</v-row>	
					<v-row
						dense
					>
						<v-col
							v-if="launchResultsAltitudeMax(item)"
							cols="4"
						>
							<b>{{ $t('forms.content.launches.results.altitude.max2') }}</b><br>
							{{ launchResultsAltitudeMax(item) }}
						</v-col>
						<v-col
							v-if="launchResultsAltitudeMain(item)"
							cols="4"
						>
							<b>{{ $t('forms.content.launches.results.altitude.main2') }}</b><br>
							{{ launchResultsAltitudeMain(item) }}
						</v-col>
						<v-col
							v-if="launchResultsAltitudeDrogue(item)"
							cols="4"
						>
							<b>{{ $t('forms.content.launches.results.altitude.drogue2') }}</b><br>
							{{ launchResultsAltitudeDrogue(item) }}
						</v-col>
					</v-row>
					<v-row
						v-if="hasLaunchResultsCoords(item)"
						dense
					>
						<v-col>
							<LaunchMap
								:id="item.id"
								type="recovery"
								:coords="launchResultsCoords(item)"
								:coordsLaunch="launchResultsCoordsLaunch(item)"
								:coordsRecovery="launchResultsCoordsRecovery(item)"
							></LaunchMap>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
import LaunchMap from '@/components/content/launches/launch/LaunchMap';

import { useLaunchPanelBaseProps } from '@/components/content/gallery/launches/launchPanelBaseProps';
import { useLaunchPanelBaseComponent } from '@/components/content/gallery/launches/launchPanelBase';

export default {
	name: 'GalleryLaunchPanel',
	components: {
		LaunchMap
	},
	props: {
		...useLaunchPanelBaseProps
	},
	emits: ['display'],
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
			clickLaunch,
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
			launchUrl
		} = useLaunchPanelBaseComponent(props, context, options);

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
			clickLaunch,
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
