<template>
	<div
		class="mt-2"
	>
		<!-- <pre>{{ detailItem }}</pre>
		<pre>{{ displayItem }}</pre>
		{{ stagePrimary }}
		length {{ length }} -->
		<v-row dense
		>
			<v-col>
				<img
					:src="coverUrl"
					style="width: 150px;display: block;margin-left: auto; margin-right: auto; float: right;"
				/>
				<VtMarkdown 
					v-if="displayItem.description"
					v-model="displayItem.description" :use-github=false 
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col 
				v-if="manufacturerName"
				cols="3"
			>
				<VtTextField
					v-model="manufacturerName"
					:label="$t('forms.content.manufacturer.name')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="manufacturerStockId"
				cols="3"
			>
				<VtTextField
					v-model="manufacturerStockId"
					:label="$t('forms.content.parts.manufacturerStockId')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="manufacturerRocketName"
				cols="3"
			>
				<VtTextField
					v-model="manufacturerRocketName"
					:label="$t('forms.content.parts.manufacturerRocketName')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				cols="12"
			>
				<v-sheet
					class="pt-2 pb-2"
				>
					<h3>{{ $t('titles.content.rockets.specifications') }}</h3>
					<v-divider></v-divider>
				</v-sheet>
			</v-col>
			<v-col 
				v-if="manufacturer"
				cols="3"
			>
				<VtTextField
					v-model="manufacturer"
					:label="$t('strings.rockets.diameter')"
					:readonly="true"
				/>
			</v-col>
			<!-- <v-col 
				v-if="stages"
				cols="6" sm="4"
			>
				<VtTextField
					v-model="stages"
					:label="$t('strings.rockets.stages')"
					:readonly="true"
				/>
			</v-col> -->
			<!-- <v-col 
				v-if="diameter"
				cols="4" sm="3"
			>
				<VtTextField
					v-model="diameter"
					:label="$t('strings.rockets.diameterMajor')"
					:readonly="true"
				/>
			</v-col> -->
			<v-col 
				v-if="stages"
				cols="3"
			>
				<VtTextField
					v-model="stages"
					:label="$t('strings.rockets.stages')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="diameter"
				cols="3"
			>
				<VtTextField
					v-model="diameter"
					:label="$t('strings.rockets.diameter')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="length"
				cols="3"
			>
				<VtTextField
					v-model="length"
					:label="$t('strings.rockets.length')"
					:readonly="true"
				/>
			</v-col>
			<!-- <v-col 
				v-if="weight"
				cols="3"
			>
				<VtTextField
					v-model="weight"
					:label="$t('strings.rockets.weight')"
					:readonly="true"
				/>
			</v-col> -->
			<!-- <v-col 
				v-if="cp"
				cols="3"
			>
				<VtTextField
					v-model="cp"
					:label="$t('strings.rockets.cp')"
					:readonly="true"
				/>
			</v-col> -->
		</v-row>
		<v-row dense>
			<v-col 
				v-if="stagePrimary.manufacturerId"
				cols="12" sm="6"
			>
				<VtTextField
					v-model="manufacturer"
					:label="$t('forms.content.parts.manufacturer')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="stagePrimary.manufacturerStockId"
				cols="12" sm="6"
			>
				<VtTextField
					v-model="stagePrimary.manufacturerStockId"
					:label="$t('forms.content.parts.manufacturerId')"
					:readonly="true"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col 
				v-if="albums"
				cols="12"
			>
				<h4>{{ $t('titles.content.rockets.albums.title') }}</h4>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col 
				v-if="albums"
				cols="4" md="12"
				v-for="album in albums"
			>
				<span><a
					:href="album.link"
					target="_blank"
				>
					{{ album.name }}
				</a></span>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col 
				v-if="documents"
				cols="12"
			>
				<h4>{{ $t('titles.content.rockets.documents.title') }}</h4>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col 
				v-if="documents"
				cols="4" md="12"
				v-for="document in documents"
			>
				<span><a
					:href="document.link"
					target="_blank"
				>
					{{ document.name }}
				</a></span>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col 
				v-if="videos"
				cols="12"
			>
				<h4>{{ $t('titles.content.rockets.videos.plural') }}</h4>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col 
				v-if="videos"
				cols="4" md="12"
				v-for="video in videos"
			>
				<span><a
					:href="video.link"
					target="_blank"
				>
					{{ video.name }}
				</a></span>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { useRocketViewComponent } from '@/components/content/rockets/library/rocket/rocketViewComponent';
import { useRocketViewComponentProps } from '@/components/content/rockets/library/rocket/rocketViewComponentProps';

import ContentHeader from '@/components/content/Header';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

export default {
	name: 'RocketView',
	components: {
		ContentHeader,
		VtMarkdown,
		VtSelect,
		VtTextField
	},
	props: {
		...useRocketViewComponentProps
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
			albums,
			coverUrl,
			cp,
			diameter,
			displayItem,
			documents,
			length,
			manufacturer,
			manufacturerName,
			manufacturerRocketName,
			manufacturerStockId,
			stagePrimary,
			stages,
			videos,
			weight
		} = useRocketViewComponent(props, context);

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
			albums,
			coverUrl,
			cp,
			diameter,
			displayItem,
			documents,
			length,
			manufacturer,
			manufacturerName,
			manufacturerRocketName,
			manufacturerStockId,
			stagePrimary,
			stages,
			videos,
			weight
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
