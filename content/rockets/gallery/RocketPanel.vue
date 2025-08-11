<template>
	<v-card
		:key="item.name"
		class="mx-auto"
		max-width="500"
		color="secondary"
	>
		<div
			style="background-color: #b6b6b6;"
		>
			<a 
				v-if="!clickType || clickType==='hyperlink'"
				:href="rocketUrl(item)"
			>
				<v-img
					:src="hasCoverUrl(item) ? item.coverUrl : '/images/blank.png'"
					cover
				></v-img>
			</a>
			<a 
				v-if="clickType==='click'"
				@click="clickRocket(item)"
				style="cursor: pointer;"
			>
				<v-img
					:src="hasCoverUrl(item) ? item.coverUrl : '/images/blank.png'"
					cover
				>
					<div class="text-right pt-4">
						<v-btn
							:variant="buttonsForms.variant.default"
							:color="buttonsForms.color.default"
							class="mr-2"
							:to="rocketUrl(item)"
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
		<v-card-title>
			<v-row dense>
				<v-col>
					<v-btn
						v-if="!clickType || clickType==='hyperlink'"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						:to="rocketUrl(item)"
						size="large"
					>
						{{ item.name }}
					</v-btn>
					<v-btn
						v-if="clickType==='click'"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						size="large"
						@click="clickRocket(item)"
					>
						{{ item.name }}
					</v-btn>
				</v-col>
				<v-col>
					<img :src="rocketTypeIcon(item)" style="height: 48px; float: right;" />
				</v-col>
			</v-row>
		</v-card-title>
		<v-card-text
			v-if="displayExtras"
		>
			<v-row 
				dense
				class="mt-2"
			>
				<v-col 
					cols="12"
				>
					<h3>{{ $t('forms.content.manufacturer.name') }}</h3>
					<v-divider class="border-opacity-100"></v-divider>
				</v-col>
				<v-col 
					cols="5"
				>
					<b>{{ $t('forms.name') }}</b><br>
					<a v-if="manufacturerUrl" :href="manufacturerUrl" style="color: white" target="_blank">{{ manufacturerName }}</a>
					<span v-if="!manufacturerUrl">{{ manufacturerName }}</span>
				</v-col>
				<v-col 
					v-if="manufacturerStockId"
					cols="3"
				>
					<b>{{ $t('forms.content.parts.manufacturerStockId2') }}</b><br>
					<a v-if="manufacturerUrl" :href="manufacturerUrl" style="color: white" target="_blank">{{ manufacturerStockId }}</a>
					<span v-if="!manufacturerUrl">{{ manufacturerStockId }}</span>
				</v-col>
				<v-col 
					v-if="manufacturerRocketName"
					cols="4"
				>
					<b>{{ $t('forms.content.parts.manufacturerRocketName2') }}</b><br>
					<a v-if="manufacturerUrl" :href="manufacturerUrl" style="color: white" target="_blank">{{ manufacturerRocketName }}</a>
					<span v-if="!manufacturerUrl">{{ manufacturerRocketName }}</span>
				</v-col>
			</v-row>
			<v-row 
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
					cols="3"
				>
					<b>{{ $t('strings.rockets.stages') }}</b><br>
					{{ stages }}
				</v-col>
				<v-col
					cols="2"
				>
					<b>{{ $t('strings.rockets.diameterMajor') }}</b><br>
					{{ stagePrimary.diameterMajor }} {{ measurementUnitTranslateLength(stagePrimary.diameterMajorMeasurementUnitsId, stagePrimary.diameterMajorMeasurementUnitId) }}
				</v-col>
				<v-col 
					cols="2"
				>
					<b>{{ $t('strings.rockets.length') }}</b><br>
					{{ stagePrimary.length }} {{ measurementUnitTranslateLength(stagePrimary.lengthMeasurementUnitsId, stagePrimary.lengthMeasurementUnitId) }}
				</v-col>
				<v-col 
					cols="2"
				>
					<b>{{ $t('strings.rockets.weight') }}</b><br>
					{{ stagePrimary.weight }} {{ measurementUnitTranslateWeight(stagePrimary.weightMeasurementUnitsId, stagePrimary.weightMeasurementUnitId) }}
				</v-col>
				<v-col 
					cols="3"
				>
					<b>{{ $t('strings.rockets.cp') }}</b><br>
					{{ stagePrimary.cp }} {{ measurementUnitTranslateLength(stagePrimary.cpMeasurementUnitsId, stagePrimary.cpMeasurementUnitId) }}
				</v-col>
				<!-- <v-col 
					v-if="launchRocketCg(item)"
					cols="6" sm="4" md="2"
				>
					<b>{{ $t('strings.rockets.cg') }}</b><br>
					{{ stagePrimary.cg }} {{ measurementUnitTranslateLength(stagePrimary.cgMeasurementUnitsId, stagePrimary.cgMeasurementUnitId) }}
				</v-col> -->
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
import { useRocketPanelBaseProps } from '@/components/content/rockets/gallery/rocketPanelBaseProps';
import { useRocketPanelBaseComponent } from '@/components/content/rockets/gallery/rocketPanelBase';

export default {
	name: 'RocketGalleryPanel',
	props: {
		...useRocketPanelBaseProps
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
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			stagePrimary,
			stages,
			clickRocket,
			manufacturer,
			manufacturerName,
			manufacturerRocketName,
			manufacturerStockId,
			manufacturerUrl,
			measurementUnitTranslateLength,
			measurementUnitTranslateWeight,
			rocketUrl,
			rocketUrlBack
		} = useRocketPanelBaseComponent(props, context, options);

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
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			stagePrimary,
			stages,
			clickRocket,
			manufacturer,
			manufacturerName,
			manufacturerRocketName,
			manufacturerStockId,
			manufacturerUrl,
			measurementUnitTranslateLength,
			measurementUnitTranslateWeight,
			rocketUrl,
			rocketUrlBack
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
