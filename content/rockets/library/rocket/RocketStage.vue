<template>
	<div
		v-if="debug"
	>
		<!-- [[ isEditable {{ isEditable }} ]]
		[[ displayItem {{ displayItem }} ]]
		[[ altimeters {{ altimeters }} ]]
		[[ chuteProtectors {{ chuteProtectors }} ]]
		[[ chuteReleases {{ chuteReleases }} ]]
		[[ deploymentBags {{ deploymentBags }} ]]
		[[ parachutes {{ parachutes }} ]]
		[[ streamers {{ streamers }} ]]
		[[ trackers {{ trackers }} ]] -->
	</div>
	<v-row dense>
		<v-col
			cols="10" md="11"
		>
			<VtMarkdown 
				v-model="displayItem.description" :use-github=false 
			/>
		</v-col>
		<v-col 
			cols="2" md="1"
		>
			<VtTextField
				v-model="stageIndex"
				:readonly="true"
				:label="$t('forms.content.rockets.stage.name')"
			/>
		</v-col>
	</v-row>
	<v-row
		dense
	>
		<v-col 
			v-if="displayItem.manufacturerId"
			cols="6"
		>
			<VtSelect
				v-model="displayItem.manufacturerId"
				:items="manufacturers"
				:readonly="true"
				:label="$t('forms.content.manufacturer.name')"
			/>
		</v-col>
		<v-col 
			v-if="displayItem.manufacturerStockId"
			cols="6"
		>
			<VtTextField
				v-model="displayItem.manufacturerStockId"
				:readonly="true"
				:label="$t('forms.content.parts.manufacturerId')"
			/>
		</v-col>
	</v-row>
	<v-row
		dense
	>
		<v-col 
			v-if="displayItemDiameterMajor"
			cols="6" xs="3"
		>
			<VtTextField
				v-model="displayItemDiameterMajor"
				:hide-details="true"
				:readonly="true"
				:label="$t('forms.content.rockets.diameter.name')"
			/>
		</v-col>
		<v-col 
			v-if="displayItemLength"
			cols="6" xs="3"
		>
			<VtTextField
				v-model="displayItemLength"
				:hide-details="true"
				:readonly="true"
				:label="$t('forms.content.parts.length')"
			/>
		</v-col>
		<v-col 
			v-if="displayItemWeight"
			cols="6" xs="3"
		>
			<VtTextField
				v-model="displayItemWeight"
				:hide-details="true"
				:readonly="true"
				:label="$t('forms.content.parts.weight')"
			/>
		</v-col>
		<v-col 
			v-if="displayItemCp"
			cols="6" xs="3"
		>
			<VtTextField
				v-model="displayItemCp"
				:hide-details="true"
				:readonly="true"
				:label="$t('forms.content.rockets.cp')"
			/>
		</v-col>
	</v-row>
	<v-row
	 	dense
	>
		<v-col 
			v-if="hasMotor(0)"
			cols="12" sm="4"
		>
			<VtTextField
				v-model="motor(0).value"
				:readonly="true"
				:label="$t('forms.content.parts.motor.name')"
			/>
		</v-col>
		<v-col 
			v-if="hasMotor(1)"
			cols="12" sm="4"
		>
			<VtTextField
				v-model="motor(1).value"
				:readonly="true"
				:label="$t('forms.content.parts.motor.name')"
			/>
		</v-col>
		<v-col 
			v-if="hasMotor(2)"
			cols="12" sm="4"
		>
			<VtTextField
				v-model="motor(2).value"
				:readonly="true"
				:label="$t('forms.content.parts.motor.name')"
			/>
		</v-col>
	</v-row>
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
										:variant="buttonsForms.variant.default"
										color="purple"
										block
										@click="clickAltimetersSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.altimeter.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										:variant="buttonsForms.variant.default"
										color="orange"
										block
										@click="clickChuteProtectorsSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.chuteProtector.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										:variant="buttonsForms.variant.default"
										color="orange"
										block
										@click="clickChuteReleasesSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.chuteRelease.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										:variant="buttonsForms.variant.default"
										color="orange"
										block
										@click="clickDeploymentBagsSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.deploymentBag.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										:variant="buttonsForms.variant.default"
										color="orange"
										block
										@click="clickParachutesSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.parachute.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										:variant="buttonsForms.variant.default"
										color="orange"
										block
										@click="clickStreamersSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.streamer.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										:variant="buttonsForms.variant.default"
										color="blue"
										block
										@click="clickTrackersSearch(displayItem.id)"
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
					:editable="isEditable"
					:pre-complete-ok="preCompleteOkRocketParts"
					:manufacturers="manufacturers"
					:stage-id="displayItem.id"
					@delete="handleAltimeterDelete"
				>
				</RocketParts>
				<RocketParts
					:items="chuteProtectors"
					:deletable="isEditable"
					:editable="isEditable"
					:pre-complete-ok="preCompleteOkRocketParts"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleChuteProtectorsDelete"
				>
				</RocketParts>
				<RocketParts
					:items="chuteReleases"
					:deletable="isEditable"
					:editable="isEditable"
					:pre-complete-ok="preCompleteOkRocketParts"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleChuteReleasesDelete"
				>
				</RocketParts>
				<RocketParts
					:items="deploymentBags"
					:editable="isEditable"
					:pre-complete-ok="preCompleteOkRocketParts"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleDeploymentBagsDelete"
				>
				</RocketParts>
				<RocketParts
					:items="parachutes"
					:deletable="isEditable"
					:editable="isEditable"
					:pre-complete-ok="preCompleteOkRocketParts"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleParachutesDelete"
				>
				</RocketParts>
				<RocketParts
					:items="streamers"
					:manufacturers="manufacturers"
					:deletable="isEditable"
					:editable="isEditable"
					:pre-complete-ok="preCompleteOkRocketParts"
					:stageId="displayItem.id"
					@delete="handleStreamersDelete"
				>
				</RocketParts>
				<RocketParts
					:items="trackers"
					:deletable="isEditable"
					:editable="isEditable"
					:pre-complete-ok="preCompleteOkRocketParts"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleTrackerDelete"
				></RocketParts>
			</v-expansion-panels>
		</v-col>
	</v-row>
	<RocketPartsLookupDialog
		ref="dialogAltimetersSearchManagerRef"
		:signal="dialogAltimetersSearchManager.signal"
		:part-types="manufacturerTypeAltimeter"
		@close="dialogAltimetersSearchManager.cancel()"
		@select="selectAltimeter"
	/>
	<RocketPartsLookupDialog
		ref="dialogChuteProtectorsSearchRef"
		:signal="dialogChuteProtectorsSearchManager.signal"
		:part-types="manufacturerTypeChuteProtector"
		@close="dialogChuteProtectorsSearchManager.cancel()"
		@select="selectChuteProtector"
	/>
	<RocketPartsLookupDialog
		ref="dialogChuteReleasesSearchRef"
		:signal="dialogChuteReleasesSearchManager.signal"
		:part-types="manufacturerTypeChuteRelease"
		@close="dialogChuteReleasesSearchManager.cancel()"
		@select="selectChuteRelease"
	/>
	<RocketPartsLookupDialog
		ref="dialogDeploymentBagsSearchRef"
		:signal="dialogDeploymentBagsSearchManager.signal"
		:part-types="manufacturerTypeChuteDeploymentBag"
		@close="dialogDeploymentBagsSearchManager.cancel()"
		@select="selectDeploymentBag"
	/>
	<RocketPartsLookupDialog
		ref="dialogParachutesSearchRef"
		:signal="dialogParachutesSearchManager.signal"
		:part-types="manufacturerTypeParachute"
		@close="dialogParachutesSearchManager.cancel()"
		@select="selectParachute"
	/>
	<RocketPartsLookupDialog
		ref="dialogStreamersSearchRef"
		:signal="dialogStreamersSearchManager.signal"
		:part-types="manufacturerTypeStreamer"
		@close="dialogStreamersSearchManager.cancel()"
		@ok="selectStreamer"
	/>
	<RocketPartsLookupDialog
		ref="dialogStreamersSearchRef"
		:signal="dialogTrackersSearchManager.signal"
		:part-types="manufacturerTypeTracker"
		@close="dialogTrackersSearchManager.cancel()"
		@ok="selectTracker"
	/>
	<VtConfirmationDialog
		ref="dialogPartsDeleteRef"
		:message="dialogPartsDeleteMessage"
		:messageRaw=true
		:signal="dialogPartsDeleteManager.signal"
		@cancel="dialogPartsDeleteCancel"
		@ok="dialogPartsDeleteOk"
	/>
</template>

<script>
import { useRocketStageComponent } from '@/components/content/rockets/library/rocket/rocketStageComponent';
import { useRocketStageComponentProps } from '@/components/content/rockets/library/rocket/rocketStageComponentProps';

import ChuteProtectorPanelTitle from '@/components/content/parts/chuteProtectors/ChuteProtectorPanelTitle';
import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';
import ParachutePanelTitle from '@/components/content/parts/parachutes/ParachutePanelTitle';
import StreamerPanelTitle from '@/components/content/parts/streamers/StreamerPanelTitle';

import RocketParts from '@/components/content/rockets/parts/RocketParts';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import RocketPartsLookupDialog from '@/components/content/rockets/dialogs/parts/RocketPartsLookupDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

export default {
	name: 'RocketStageControl',
	components: {
		ChuteProtectorPanelTitle,
		DeploymentBagPanelTitle,
		ParachutePanelTitle,
		RocketParts,
		RocketPartsLookupDialog,
		StreamerPanelTitle,
		VtConfirmationDialog,
		VtMarkdown,
		VtSelect,
		VtTextField
	},
	props: {
		...useRocketStageComponentProps
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
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			altimeters,
			chuteProtectors,
			chuteReleases,
			deploymentBags,
			displayItem,
			displayItemCp,
			displayItemDiameterMajor,
			displayItemDiameterMinor,
			displayItemLength,
			displayItemWeight,
			hasAltimeters,
			hasChuteProtectors,
			hasChuteReleases,
			hasDeploymentBags,
			hasParachutes,
			hasStreamers,
			hasTrackers,
			parachutes,
			stageIndex,
			streamers,
			trackers,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			motorMountDiameters,
			motorMountDiameter,
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
			hasMotor,
			motor,
			panelsUpdated,
			preCompleteOkRocketParts,
			selectAltimeter,
			selectChuteProtector,
			selectChuteRelease,
			selectDeploymentBag,
			selectParachute,
			selectStreamer,
			selectTracker
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
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			altimeters,
			chuteProtectors,
			chuteReleases,
			deploymentBags,
			displayItem,
			displayItemCp,
			displayItemDiameterMajor,
			displayItemDiameterMinor,
			displayItemLength,
			displayItemWeight,
			hasAltimeters,
			hasChuteProtectors,
			hasChuteReleases,
			hasDeploymentBags,
			hasParachutes,
			hasStreamers,
			hasTrackers,
			parachutes,
			stageIndex,
			streamers,
			trackers,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			motorMountDiameters,
			motorMountDiameter,
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
			hasMotor,
			motor,
			panelsUpdated,
			preCompleteOkRocketParts,
			selectAltimeter,
			selectChuteProtector,
			selectChuteRelease,
			selectDeploymentBag,
			selectParachute,
			selectStreamer,
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
