<template>
	<!-- <pre>{{ displayItem }}</pre> -->
	<!-- {{ stagePrimary }} -->
	<!-- length {{ length }} -->
	<v-row dense
		v-if="displayItem.description"
	>
		<v-col>
			<VtMarkdown v-model="displayItem.description" :use-github=false />
		</v-col>
	</v-row>
	<v-row dense>
		<!-- <v-col cols="12">
			<p class="text-h6 text-center">{{ $t('titles.content.rockets.specifications') }}</p>
		</v-col> -->
		<!-- <v-col 
			v-if="stages"
			cols="12" sm="6"
		>
			<VtTextField
				v-model="stages"
				:label="$t('strings.rockets.stages')"
				:readonly="true"
			/>
		</v-col> -->
		<v-col 
			v-if="diameter"
			cols="12" sm="6"
		>
			<VtTextField
				v-model="diameter"
				:label="$t('strings.rockets.diameterMajor')"
				:readonly="true"
			/>
		</v-col>
		<v-col 
			v-if="length"
			cols="12" sm="6"
		>
			<VtTextField
				v-model="length"
				:label="$t('strings.rockets.length')"
				:readonly="true"
			/>
		</v-col>
		<v-col 
			v-if="cp"
			cols="12" sm="6"
		>
			<VtTextField
				v-model="cp"
				:label="$t('strings.rockets.cp')"
				:readonly="true"
			/>
		</v-col>
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
</template>

<script>
import { useRocketSetupViewComponent } from '@/components/content/rockets/setups/setup/rocketSetupViewComponent';
import { useRocketSetupViewComponentProps } from '@/components/content/rockets/setups/setup/rocketSetupViewComponentProps';

import ContentHeader from '@/components/content/Header';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtTextArea from '@thzero/library_client_vue3_vuetify3/components/form/VtTextArea';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

export default {
	name: 'RocketSetupView',
	components: {
		ContentHeader,
		VtMarkdown,
		VtSelect,
		VtTextArea,
		VtTextField
	},
	props: {
		...useRocketSetupViewComponentProps
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
			cp,
			diameter,
			displayItem,
			length,
			manufacturer,
			stagePrimary,
			sStages,
			weight
		} = useRocketSetupViewComponent(props, context);

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
			cp,
			diameter,
			displayItem,
			length,
			manufacturer,
			stagePrimary,
			sStages,
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
