<template>
	<div
		v-if="showUserName"
		class="d-flex"
	>
		<ContentHeader 
			:value="title"
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
			:to="rocketsUrl"
			class="text-right"
		>
			{{ $t('buttons.gallery') }}
		</v-btn>
	</div>
	<ContentHeader 
		v-if="!showUserName"
		:value="title"
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
	<v-row dense>
		<v-col cols="12">
			<v-card
				v-if="rocket"
			>
				<div
					style="background-color: #b6b6b6;"
				>
					<v-img
						:src="hasCoverUrl(rocket) ? rocket.coverUrl : '/images/blank.png'"
						cover
					>
						<div class="text-right pt-4">
							<v-btn
								v-if="backType==='back'"
								:variant="buttonsForms.variant.default"
								:color="buttonsForms.color.default"
								class="mr-2"
								:to="rocketsUrl"
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
								v-if="backType==='close'"
								:variant="buttonsForms.variant.default"
								:color="buttonsForms.color.default"
								class="mr-2"
								:to="rocketUrl"
								target="_blank"
								icon="mdi-open-in-new"
								@click.native.stop=""
							>
							</v-btn>
						</div>
					</v-img>
				</div>

				<v-card-title
					class="bg-secondary"
					color="secondary"
				>
					<v-row dense>
						<v-col>
<p class="text-h6 text-center" style="float: left;">{{ rocket.name }}</p>
						</v-col>
						<v-col>
<img :src="rocketTypeIcon(rocket)" style="height: 48px; float: right;" />
						</v-col>
					</v-row>
				</v-card-title>
				<v-card-text class="pt-4">
<VtMarkdown v-model="rocket.description" :use-github=false />
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="12" md="6">
			<v-card>
				<v-card-title>
					<p class="text-h6 text-center">{{ $t('forms.content.manufacturer.name') }}</p>
				</v-card-title>
				<v-card-text>
					<table style="padding-bottom: 12px;">
						<tbody>
							<tr>
								<td nowrap class="specifications">{{ $t('forms.name') }}</td>
								<td>
									<a v-if="manufacturerUrl" :href="manufacturerUrl" style="color: white" target="_blank">{{ manufacturerName }}</a>
									<span v-if="!manufacturerUrl">{{ manufacturerName }}</span>
								</td>
							</tr>
							<tr>
								<td nowrap class="specifications">{{ $t('forms.content.parts.manufacturerStockId2') }}</td>
								<td>
									<a v-if="manufacturerUrl" :href="manufacturerUrl" style="color: white" target="_blank">{{ manufacturerStockId }}</a>
									<span v-if="!manufacturerUrl">{{ manufacturerStockId }}</span>
								</td>
							</tr>
							<tr>
								<td nowrap class="specifications">{{ $t('forms.content.parts.manufacturerRocketName2') }}</td>
								<td>
									<a v-if="manufacturerUrl" :href="manufacturerUrl" style="color: white" target="_blank">{{ manufacturerRocketName }}</a>
									<span v-if="!manufacturerUrl">{{ manufacturerRocketName }}</span>
								</td>
							</tr>
						</tbody>
					</table>
				</v-card-text>
			</v-card>
			<!-- // TODO: stages for displayTypeUser -->
		</v-col>
		<v-col cols="12" md="6">
			<v-card>
				<v-card-title>
					<p class="text-h6 text-center">{{ $t('titles.content.rockets.specifications') }}</p>
				</v-card-title>
				<v-card-text>
					<v-row dense>
						<v-col cols="6">
							<table style="padding-bottom: 12px;">
								<tbody>
									<tr>
										<td nowrap class="specifications">{{ $t('strings.rockets.stages') }}</td>
										<td>{{ stages }} </td>
									</tr>
									<tr>
										<td nowrap class="specifications">{{ $t('strings.measurements.length') }}</td>
										<td>{{ stagePrimary.length }} {{ measurementUnitTranslateLength(stagePrimary.lengthMeasurementUnitsId, stagePrimary.lengthMeasurementUnitId) }}</td>
									</tr>
									<tr
										v-if="stagePrimary.cg"
									>
										<td nowrap class="specifications">{{ $t('strings.rockets.cg') }}</td>
										<td>{{ stagePrimary.cg }} {{ measurementUnitTranslateLength(stagePrimary.cgMeasurementUnitsId, stagePrimary.cgMeasurementUnitId) }} </td>
									</tr>
								</tbody>
							</table>
						</v-col>
						<v-col cols="6">
							<table style="padding-bottom: 12px;">
								<tbody>
									<tr>
										<td nowrap class="specifications">{{ $t('strings.rockets.diameterMajor') }}</td>
										<td>{{ stagePrimary.diameterMajor }} {{ measurementUnitTranslateLength(stagePrimary.diameterMajorMeasurementUnitsId, stagePrimary.diameterMajorMeasurementUnitId) }} </td>
									</tr>
									<tr>
										<td nowrap class="specifications">{{ $t('strings.measurements.weight') }}</td>
										<td>{{ stagePrimary.weight }} {{ measurementUnitTranslateWeight(stagePrimary.weightMeasurementUnitsId, stagePrimary.weightMeasurementUnitId) }}</td>
									</tr>
									<tr
										v-if="stagePrimary.cp"
									>
										<td nowrap class="specifications">{{ $t('strings.rockets.cp') }}</td>
										<td>{{ stagePrimary.cp }} {{ measurementUnitTranslateLength(stagePrimary.cpMeasurementUnitsId, stagePrimary.cpMeasurementUnitId) }} </td>
									</tr>
								</tbody>
							</table>
						</v-col>
						<v-col cols="12">
							<table style="padding-bottom: 12px;">
								<tbody>
									<tr>
										<td nowrap class="specifications">{{ $t('strings.rockets.buildLogUrl') }}</td>
										<td><a :href="rocket.buildLogUrl" target="_blank">{{ rocket.buildLogUrl }}</a></td>
									</tr>
								</tbody>
							</table>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
			<!-- // TODO: stages for displayTypeUser -->
		</v-col>
		<v-col 
			v-if="hasAlbums"
			cols="12" md="4"
		>
			<v-card>
				<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.rockets.albums.plural') }}</p>
				</v-card-title>
				<v-card-text>
	<v-list density="compact">
		<v-list-item
			v-for="item in albums"
			:key="item.name"
			:href="item.link"
			:target="target(item)"
			class="link"
		>
			<v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
		</v-list-item>
	</v-list>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col
			v-if="hasVideos"
			cols="12" md="4"
		>
			<v-card>
				<v-card-title>
<p class="text-h6 text-center">{{ $t('titles.content.rockets.videos.plural') }}</p>
				</v-card-title>
				<v-card-text>
	<v-list density="compact">
		<v-list-item
			v-for="item in videos"
			:key="item.name"
			:href="item.link"
			:target="target(item)"
			class="link"
		>
			<v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
		</v-list-item>
	</v-list>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col
			v-if="hasDocuments"
			cols="12" md="4"
		>
			<v-card>
				<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.rockets.documents.plural') }}</p>
				</v-card-title>
				<v-card-text>
	<v-list density="compact">
		<v-list-item
			v-for="item in documents"
			:key="item.name"
			:href="item.link"
			:target="target(item)"
			class="link"
		>
			<v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
		</v-list-item>
	</v-list>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col
			v-if="hasLaunches"
			cols="12"
		>
			<v-card>
				<v-card-title>
<p class="text-h6 text-center">{{ $t('titles.rockets.launches') }}</p>
				</v-card-title>
				<v-card-text>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col
			cols="12"
		>
			<div class="text-right pt-4">
					<v-btn
						v-if="backType==='back'"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						class="mr-2"
						:to="rocketsUrl"
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
			</div>
		</v-col>
	</v-row>
</template>

<script>
import { useRocketInfoBaseComponent } from '@/components/content/rockets/gallery/rocket/rocketInfoBase';
import { useRocketInfoBaseProps } from '@/components/content/rockets/gallery/rocket/rocketInfoBaseProps';

import ContentHeader from '@/components/content/Header';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';

export default {
	name: 'RocketInfo',
	components: {
		ContentHeader,
		VtMarkdown
	},
	props: {
		...useRocketInfoBaseProps
	},
	emits: ['close'],
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
			rocket,
			buttonsDialog,
			buttonsForms,
			rocketTypes,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			albums,
			displayTypeGamerTag,
			displayTypeSite,
			displayTypeUser,
			documents,
			hasAlbums,
			hasDocuments,
			hasLaunches,
			hasVideos,
			manufacturer,
			manufacturerName,
			manufacturerRocketName,
			manufacturerStockId,
			manufacturerUrl,
			requestedTag,
			rocketId,
			rocketUrl,
			rocketsUrl,
			stagePrimary,
			stages,
			title,
			clickClose,
			fetch,
			measurementUnitTranslateLength,
			measurementUnitTranslateWeight,
			videos
		} = useRocketInfoBaseComponent(props, context);

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
			rocket,
			buttonsDialog,
			buttonsForms,
			rocketTypes,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			albums,
			displayTypeGamerTag,
			displayTypeSite,
			displayTypeUser,
			documents,
			hasAlbums,
			hasDocuments,
			hasLaunches,
			hasVideos,
			manufacturer,
			manufacturerName,
			manufacturerRocketName,
			manufacturerStockId,
			manufacturerUrl,
			requestedTag,
			rocketId,
			rocketUrl,
			rocketsUrl,
			stagePrimary,
			stages,
			title,
			clickClose,
			fetch,
			measurementUnitTranslateLength,
			measurementUnitTranslateWeight,
			videos
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
tr .specifications {
	padding-right: 12px;
}
</style>
