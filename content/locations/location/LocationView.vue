<template>
	<div
		v-if="debug"
	>
		[[ displayItem {{ displayItem }} ]]
	</div>
	<div>
		<v-row dense
			v-if="displayItem.description"
		>
			<v-col>
				<VtMarkdown v-model="displayItem.description" :use-github=false />
			</v-col>
		</v-row>
		<v-row dense>
			<v-col
				v-if="displayItem.organizations"
				class="mt-2"
			>
				<VtTextArea
					v-model="displayItemOrganizations"
					:label="$t('forms.content.organizations.plural')"
					:readonly="true"
					rows="1"
				/>
			</v-col>
			<v-col
				v-if="displayItem.rocketTypes"
				class="mt-2"
			>
				<VtTextArea
					v-model="displayItemRocketTypeNames"
					:label="$t('forms.content.rockets.level')"
					:readonly="true"
					rows="1"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col 
				v-if="displayItemAddress"
				cols="12" sm="6"
				class="mt-2"
			>
				<VtTextField
					v-model="displayItemAddress"
					:label="$t('forms.content.locations.address')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="displayItem.link"
				cols="12" sm="6"
				style="display: flex; align-items: end; "
			>
				<!-- <v-btn
					:target="blank"
					:to="displayItem.link">
					{{ displayItem.link }}
				</v-btn> -->
					<span style="float: right;"><a 
						:href="displayItem.link"
						target="_blank"
					>
						{{ displayItem.link }}
					</a></span>
					<!-- <v-text-field
						v-model="displayItem.link"
						label="First name"
						readonly="true"
						variant="underlined"
					>
						<template #default>
							adsfasdfadsssss
						</template>
					</v-text-field> -->
			</v-col>
		</v-row>
		<v-row
			v-if="hasCoords"
			dense
		>
			<v-col>
				<LocationMap
					:id="displayItem.id"
					type="recovery"
					:coords="[ Number(displayItem.coordsLat),  Number(displayItem.coordsLong) ]"
				></LocationMap>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { useLocationViewComponent } from '@/components/content/locations/location/locationViewComponent';
import { useLocationViewComponentProps } from '@/components/content/locations/location/locationViewComponentProps';

import LocationMap from '@/components/content/locations/location/LocationMap';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtTextArea from '@thzero/library_client_vue3_vuetify3/components/form/VtTextArea';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

export default {
	name: 'LocationViewControl',
	components: {
		LocationMap,
		MeasurementUnitSelect2,
		VtMarkdown,
		VtSelect,
		VtTextArea,
		VtTextField
	},
	props: {
		...useLocationViewComponentProps
	},
	// emits: ['deleteAltimeter', 'deleteRecovery', 'deleteTracker'],
	setup (props, context, options) {
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
			organizationNames,
			displayItem,
			displayItemAddress,
			displayItemOrganizations,
			displayItemRocketTypeNames,
			hasCoords
		} = useLocationViewComponent(props, context, options);

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
			organizationNames,
			displayItem,
			displayItemAddress,
			displayItemOrganizations,
			displayItemRocketTypeNames,
			hasCoords
		};
	}
};
</script>

<style>
.v-expansion-panel--active > .v-expansion-panel-title {
	min-height: 0px !important;
}
</style>
