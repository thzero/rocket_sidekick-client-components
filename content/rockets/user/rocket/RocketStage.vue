<template>
	<div
		v-if="debug"
	>
		[[ isEditable {{ isEditable }} ]]
		{{ item  }}
	</div>
	<v-col cols="12">
		<!-- <v-expansion-panels
			v-if="!isEditable"
		>
			<v-expansion-panel>
				<v-expansion-panel-title
					color="info"
				>
					{{ item.name }}
				</v-expansion-panel-title>
				<v-expansion-panel-text> -->
		 <!-- <v-row dense>
			<v-col cols="12" md="8">
				<VTextField
					ref="di-name"
					v-model="displayItem.name"
					:readonly="true"
					:label="$t('forms.name')"
				/>
			</v-col>
		</v-row>  -->
		<v-row dense>
			<v-col>
				<VTextArea
					ref="di-description"
					v-model="displayItem.description"
					:readonly="true"
					:label="$t('forms.description')"
					:rows="0"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="5" md="2">
				<VNumberField
					ref="di-diameter"
					v-model="displayItem.diameter"
					:readonly="true"
					:label="$t('forms.content.rockets.diameter.name')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								v-model="displayItem.diameterMeasurementUnitsId"
								:readonly="true"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								v-model="displayItem.diameterMeasurementUnitId"
								:measurementUnitsId="displayItem.diameterMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:readonly="true"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="5" md="2">
				<VNumberField
					ref="di-length"
					v-model="displayItem.length"
					:readonly="true"
					:label="$t('forms.content.parts.length')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								v-model="displayItem.lengthMeasurementUnitsId"
								:readonly="true"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								v-model="displayItem.lengthMeasurementUnitId"
								:measurementUnitsId="displayItem.lengthMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:readonly="true"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="5" md="2">
				<VNumberField
					ref="di-weight"
					v-model="displayItem.weight"
					:readonly="true"
					:label="$t('forms.content.parts.weight')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								v-model="displayItem.weightMeasurementUnitsId"
								:readonly="true"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								v-model="displayItem.weightMeasurementUnitId"
								:measurementUnitsId="displayItem.weightMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsWeightType"
								:readonly="true"
								:label="$t('forms.settings.measurementUnits.weight')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="5" md="2">
				<VNumberField
					ref="di-cg"
					v-model="displayItem.cg"
					:readonly="true"
					:label="$t('forms.content.rockets.cg')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								v-model="displayItem.cgMeasurementUnitsId"
								:readonly="true"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								v-model="displayItem.cgMeasurementUnitId"
								:measurementUnitsId="displayItem.cgMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:readonly="true"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="5" md="2">
				<VNumberField
					ref="di-cp"
					v-model="displayItem.cp"
					:readonly="true"
					:label="$t('forms.content.rockets.cp')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								v-model="displayItem.cpMeasurementUnitsId"
								:readonly="true"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								v-model="displayItem.cpMeasurementUnitId"
								:measurementUnitsId="displayItem.cpMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:readonly="true"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
				<!-- </v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels> -->
		<!-- <v-sheet 
			v-if="isEditable"
			class="d-flex"
			color="info"
			rounded
		> -->
		<div
			v-if="isEditable"
			class="d-flex"
		>
			<!-- <div class="pl-6 pr-4 pb-4 pt-2">
				{{ item.name }}
			</div> -->
			<v-spacer></v-spacer>
			<div>
				<slot name="actionsEdit"></slot>
			</div>
			<div>
				<slot name="actionsView"></slot>
			</div>
		</div>
		<!-- </v-sheet> -->
	</v-col>
</template>

<script>
import { useRocketStageComponent } from '@/components/content/rockets/user/rocket/rocketStageComponent';
import { useRocketStageComponentProps } from '@/components/content/rockets/user/rocket/rocketStageComponentProps';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VNumberField from '@thzero/library_client_vue3_vuetify3/components/form/VNumberField';
import VSelect from '@thzero/library_client_vue3_vuetify3/components/form/VSelect';
import VTextArea from '@thzero/library_client_vue3_vuetify3/components/form/VTextArea';
import VTextField from '@thzero/library_client_vue3_vuetify3/components/form/VTextField';

export default {
	name: 'RocketStageControl',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		VNumberField,
		VSelect,
		VTextArea,
		VTextField
	},
	props: {
		...useRocketStageComponentProps
	},
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
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			displayItem
		} = useRocketStageComponent(props, context, options);

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
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			displayItem
		};
	}
};
</script>

<style>
.v-expansion-panel--active > .v-expansion-panel-title {
	min-height: 0px !important;
}
</style>
