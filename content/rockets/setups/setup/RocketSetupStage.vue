<template>
	<div
		v-if="debug"
	>
		[[ isEditable {{ isEditable }} ]]
		<!-- [[ detailItemData {{ detailItemData }} ]]
		[[ altimeters {{ altimeters }} ]]
		[[ chuteProtectors {{ chuteProtectors }} ]]
		[[ chuteReleases {{ chuteReleases }} ]]
		[[ deploymentBags {{ deploymentBags }} ]]
		[[ parachutes {{ parachutes }} ]]
		[[ streamers {{ streamers }} ]]
		[[ trackers {{ trackers }} ]] -->
	</div>
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
			<v-col cols="6">
				<VSelect
					ref="manufacturerRef"
					v-model="displayItem.manufacturerId"
					vid="detailItemManufacturer"
					:items="manufacturers"
					:readonly="true"
					:label="$t('forms.content.manufacturer.name')"
				/>
			</v-col>
			<v-col cols="6">
				<VTextField
					ref="detailItemManufacturerStockIdRef"
					v-model="displayItem.manufacturerStockId"
					vid="detailItemManufacturerStockId"
					:readonly="true"
					:label="$t('forms.content.parts.manufacturerId')"
				/>
			</v-col>
		</v-row>
	<v-row dense>
		<v-col cols="5" md="2">
			<VNumberField
				ref="di-diameter"
				v-model="displayItem.diameterMajor"
				:readonly="true"
				:label="$t('forms.content.rockets.diameter.name')"
			/>
		</v-col>
		<v-col cols="7" md="4">
			<table>
				<tr>
					<td class="measurementUnits">
						<MeasurementUnitsSelect
							v-model="displayItem.diameterMajorMeasurementUnitsId"
							:readonly="true"
							:label="$t('forms.settings.measurementUnits.title')"
						/>
					</td>
					<td class="measurementUnit">
						<MeasurementUnitSelect
							v-model="displayItem.diameterMajorMeasurementUnitId"
							:measurementUnitsId="displayItem.diameterMajorMeasurementUnitsId"
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
					<td class="measurementUnit">
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
					<td class="measurementUnit">
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
					<td class="measurementUnit">
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
	<!-- <v-row dense>
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
					<td class="measurementUnit">
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
					<td class="measurementUnit">
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
	</v-row> -->
	<v-row dense>
		<v-col>
			<div
				v-if="isEditable"
				class="d-flex"
			>
				<v-spacer></v-spacer>
				<div
					v-if="isEditable"
					class="pl-4 pr-4 pb-2 pt-2"
				>
					<v-btn
						class="mr-2"
						color="primary"
					>
						{{ $t('buttons.add') }}
						<v-menu 
							activator="parent"
							location="top"
						>
							<v-list>
								<v-list-item>
									<v-btn
										variant="flat"
										color="purple"
										@click="clickAltimetersSearch(detailItemData.id)"
									>
										{{ $t('forms.content.parts.altimeter.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickChuteProtectorsSearch(detailItemData.id)"
									>
										{{ $t('forms.content.parts.chuteProtector.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickChuteReleasesSearch(detailItemData.id)"
									>
										{{ $t('forms.content.parts.chuteRelease.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickDeploymentBagsSearch(detailItemData.id)"
									>
										{{ $t('forms.content.parts.deploymentBag.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickParachutesSearch(detailItemData.id)"
									>
										{{ $t('forms.content.parts.parachute.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickStreamersSearch(detailItemData.id)"
									>
										{{ $t('forms.content.parts.streamer.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="blue"
										@click="clickTrackersSearch(detailItemData.id)"
									>
										{{ $t('forms.content.parts.tracker.name') }}
									</v-btn>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-btn>
					<slot 
						v-if="isEditable"
						name="actionsEdit"
					>
					</slot>
				</div>
				<div>
					<slot 
						v-if="!isEditable"
						name="actionsView"
					></slot>
				</div>
			</div>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col>
			<v-expansion-panels
				v-model="panels"
				multiple
				@update:modelValue="panelsUpdated"
			>
				<RocketParts
					:items="altimeters"
					:deletable="isEditable"
					:stage-id="detailItemData.id"
					@delete="handleAltimeterDelete"
				>
				</RocketParts>
				<RocketParts
					:items="chuteProtectors"
					:deletable="isEditable"
					:stageId="detailItemData.id"
					@delete="handleChuteProtectorsDelete"
				>
				</RocketParts>
				<RocketParts
					:items="chuteReleases"
					:deletable="isEditable"
					:stageId="detailItemData.id"
					@delete="handleChuteReleasesDelete"
				>
				</RocketParts>
				<RocketParts
					:items="deploymentBags"
					:deletable="isEditable"
					:stageId="detailItemData.id"
					@delete="handleDeploymentBagsDelete"
				>
				</RocketParts>
				<RocketParts
					:items="parachutes"
					:deletable="isEditable"
					:stageId="detailItemData.id"
					@delete="handleParachutesDelete"
				>
				</RocketParts>
				<RocketParts
					:items="streamers"
					:deletable="isEditable"
					:stageId="detailItemData.id"
					@delete="handleStreamersDelete"
				>
				</RocketParts>
				<RocketParts
					:items="trackers"
					:deletable="isEditable"
					:stageId="detailItemData.id"
					@delete="handleTrackerDelete"
				></RocketParts>
			</v-expansion-panels>
		</v-col>
	</v-row>
	<RecoveryLookupDialog
		ref="dialogAltimetersSearchManagerRef"
		:signal="dialogAltimetersSearchManager.signal"
		:part-types="manufacturerTypeAltimeter"
		@close="dialogAltimetersSearchManager.cancel()"
		@select="selectAltimeter"
	/>
	<RecoveryLookupDialog
		ref="dialogChuteProtectorsSearchRef"
		:signal="dialogChuteProtectorsSearchManager.signal"
		:part-types="manufacturerTypeChuteProtector"
		@close="dialogChuteProtectorsSearchManager.cancel()"
		@select="selectChuteProtectors"
	/>
	<RecoveryLookupDialog
		ref="dialogChuteReleasesSearchRef"
		:signal="dialogChuteReleasesSearchManager.signal"
		:part-types="manufacturerTypeChuteRelease"
		@close="dialogChuteReleasesSearchManager.cancel()"
		@select="selectChuteReleases"
	/>
	<RecoveryLookupDialog
		ref="dialogDeploymentBagsSearchRef"
		:signal="dialogDeploymentBagsSearchManager.signal"
		:part-types="manufacturerTypeChuteDeploymentBag"
		@close="dialogDeploymentBagsSearchManager.cancel()"
		@select="selectDeploymentBags"
	/>
	<RecoveryLookupDialog
		ref="dialogParachutesSearchRef"
		:signal="dialogParachutesSearchManager.signal"
		:part-types="manufacturerTypeParachute"
		@close="dialogParachutesSearchManager.cancel()"
		@select="selectParachutes"
	/>
	<RecoveryLookupDialog
		ref="dialogStreamersSearchRef"
		:signal="dialogStreamersSearchManager.signal"
		:part-types="manufacturerTypeStreamer"
		@close="dialogStreamersSearchManager.cancel()"
		@ok="selectStreamers"
	/>
	<RecoveryLookupDialog
		ref="dialogStreamersSearchRef"
		:signal="dialogTrackersSearchManager.signal"
		:part-types="manufacturerTypeTracker"
		@close="dialogTrackersSearchManager.cancel()"
		@ok="selectTracker"
	/>
	<VConfirmationDialog
		ref="dialogPartsDeleteRef"
		:message="dialogPartsDeleteMessage"
		:messageRaw=true
		:signal="dialogPartsDeleteManager.signal"
		@cancel="dialogPartsDeleteCancel"
		@ok="dialogPartsDeleteOk"
	/>
</template>

<script>
import { useRocketSetupStageComponent } from '@/components/content/rockets/setups/setup/rocketSetupStageComponent';
import { useRocketSetupStageComponentProps } from '@/components/content/rockets/setups/setup/rocketSetupStageComponentProps';

import ChuteProtectorPanelTitle from '@/components/content/parts/chuteProtectors/ChuteProtectorPanelTitle';
import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';
import ParachutePanelTitle from '@/components/content/parts/parachutes/ParachutePanelTitle';
import StreamerPanelTitle from '@/components/content/parts/streamers/StreamerPanelTitle';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketParts from '@/components/content/rockets/parts/RocketParts';
import RecoveryLookupDialog from '@/components/content/rockets/dialogs/recovery/RecoveryLookupDialog';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VNumberField from '@thzero/library_client_vue3_vuetify3/components/form/VNumberField';
import VSelect from '@thzero/library_client_vue3_vuetify3/components/form/VSelect';
import VTextArea from '@thzero/library_client_vue3_vuetify3/components/form/VTextArea';
import VTextField from '@thzero/library_client_vue3_vuetify3/components/form/VTextField';

export default {
	name: 'RocketSetupStageControl',
	components: {
		ChuteProtectorPanelTitle,
		DeploymentBagPanelTitle,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		ParachutePanelTitle,
		RocketParts,
		RecoveryLookupDialog,
		StreamerPanelTitle,
		VConfirmationDialog,
		VFormControl,
		VNumberField,
		VSelect,
		VTextArea,
		VTextField
	},
	props: {
		...useRocketSetupStageComponentProps
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
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			displayItem,
			altimeters,
			chuteProtectors,
			chuteReleases,
			deploymentBags,
			detailItemData,
			hasAltimeters,
			hasChuteProtectors,
			hasChuteReleases,
			hasDeploymentBags,
			hasParachutes,
			hasStreamers,
			hasTrackers,
			parachutes,
			streamers,
			trackers,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			dialogPartsDeleteManager,
			dialogPartsDeleteMessage,
			dialogAltimetersSearchManager,
			dialogChuteProtectorsSearchManager,
			dialogChuteReleasesSearchManager,
			dialogDeploymentBagsSearchManager,
			dialogParachutesSearchManager,
			dialogStreamersSearchManager,
			dialogTrackersSearchManager,
			manufacturerTypeAltimeter,
			manufacturerTypeChuteProtector,
			manufacturerTypeChuteRelease,
			manufacturerTypeChuteDeploymentBag,
			manufacturerTypeParachute,
			manufacturerTypeStreamer,
			manufacturerTypeTracker,
			manufacturers,
			panels,
			clickAltimetersSearch,
			clickChuteProtectorsSearch,
			clickChuteReleasesSearch,
			clickDeploymentBagsSearch,
			clickParachutesSearch,
			clickStreamersSearch,
			clickTrackersSearch,
			dialogPartsDeleteCancel,
			dialogPartsDeleteOk,
			handleAltimeterDelete,
			handleChuteProtectorsDelete,
			handleChuteReleasesDelete,
			handleDeploymentBagsDelete,
			handleParachutesDelete,
			handleStreamersDelete,
			handleTrackerDelete,
			panelsUpdated,
			selectAltimeter,
			selectChuteProtectors,
			selectChuteReleases,
			selectDeploymentBags,
			selectParachutes,
			selectStreamers,
			selectTracker
		} = useRocketSetupStageComponent(props, context, options);

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
			displayItem,
			altimeters,
			chuteProtectors,
			chuteReleases,
			deploymentBags,
			detailItemData,
			hasAltimeters,
			hasChuteProtectors,
			hasChuteReleases,
			hasDeploymentBags,
			hasParachutes,
			hasStreamers,
			hasTrackers,
			parachutes,
			streamers,
			trackers,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			dialogPartsDeleteManager,
			dialogPartsDeleteMessage,
			dialogAltimetersSearchManager,
			dialogChuteProtectorsSearchManager,
			dialogChuteReleasesSearchManager,
			dialogDeploymentBagsSearchManager,
			dialogParachutesSearchManager,
			dialogStreamersSearchManager,
			dialogTrackersSearchManager,
			manufacturerTypeAltimeter,
			manufacturerTypeChuteProtector,
			manufacturerTypeChuteRelease,
			manufacturerTypeChuteDeploymentBag,
			manufacturerTypeParachute,
			manufacturerTypeStreamer,
			manufacturerTypeTracker,
			manufacturers,
			panels,
			clickAltimetersSearch,
			clickChuteProtectorsSearch,
			clickChuteReleasesSearch,
			clickDeploymentBagsSearch,
			clickParachutesSearch,
			clickStreamersSearch,
			clickTrackersSearch,
			dialogPartsDeleteCancel,
			dialogPartsDeleteOk,
			handleAltimeterDelete,
			handleChuteProtectorsDelete,
			handleChuteReleasesDelete,
			handleDeploymentBagsDelete,
			handleParachutesDelete,
			handleStreamersDelete,
			handleTrackerDelete,
			panelsUpdated,
			selectAltimeter,
			selectChuteProtectors,
			selectChuteReleases,
			selectDeploymentBags,
			selectParachutes,
			selectStreamers,
			selectTracker
		};
	}
};
</script>

<style>
.v-expansion-panel--active > .v-expansion-panel-title {
	min-height: 0px !important;
}
</style>
