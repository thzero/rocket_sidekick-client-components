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
	<div
		v-if="displayItem.enabled"
	>
		<v-row dense>
			<v-col cols="9">
				<VTextArea
					v-model="fromRocketStageDescription"
					:readonly="true"
					:label="$t('forms.description')"
					:rows="0"
				/>
			</v-col>
			<v-col cols="3">
				<VTextField
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
				v-if="fromRocketStageDiameterMajor"
				cols="6" xs="3"
			>
				<VTextField
					v-model="fromRocketStageDiameterMajor"
					:hide-details="true"
					:readonly="true"
					:label="$t('forms.content.rockets.diameter.name')"
				/>
			</v-col>
			<v-col 
				v-if="fromRocketStageLength"
				cols="6" xs="3"
			>
				<VTextField
					v-model="fromRocketStageLength"
					:hide-details="true"
					:readonly="true"
					:label="$t('forms.content.parts.length')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col
				v-if="displayItemWeight"
				cols="12" sm="4"
			>
				<VTextField
					v-model="displayItemWeight"
					:hide-details="true"
					:readonly="true"
					:label="$t('forms.content.parts.weight')"
				/>
			</v-col>
			<v-col 
				v-if="fromRocketStageCp"
				cols="6" sm="4"
			>
				<VTextField
					v-model="fromRocketStageCp"
					:hide-details="true"
					:readonly="true"
					:label="$t('forms.content.rockets.cp')"
				/>
			</v-col>
			<v-col
				v-if="displayItemCg"
				cols="6" sm="4"
			>
				<VTextField
					v-model="displayItemCg"
					:hide-details="true"
					:readonly="true"
					:label="$t('forms.content.rockets.cg')"
				/>
			</v-col>
		</v-row>
		<v-row
			dense
		>
			<v-col 
				v-if="fromRocketStageHasMotor(0)"
				cols="12" sm="4"
			>
				<VTextField
					v-model="fromRocketStageMotor(0).value"
					:readonly="true"
					:label="$t('forms.content.parts.motor.name')"
				/>
				<!-- <table style="width: 100%;">
					<tr>
						<td style="width: 100%;">
							<VTextField
								v-model="fromRocketStageMotor(0).value"
								:readonly="true"
								:label="$t('forms.content.parts.motor.name')"
							/>
						</td>
						<td
							v-if="isEditable"
						>
							<v-btn
								variant="flat"
								color="green ml-2"
								@click="clickMotorsSearch(0)"
							>
								{{ $t('forms.content.parts.motor.name') }}
							</v-btn>
						</td>
					</tr>
				</table> -->
			</v-col>
			<v-col 
				v-if="fromRocketStageHasMotor(1)"
				cols="12" sm="4"
			>
				<VTextField
					v-model="fromRocketStageMotor(1).value"
					:readonly="true"
					:label="$t('forms.content.parts.motor.name')"
				/>
				<!-- <table style="width: 100%;">
					<tr>
						<td style="width: 100%;">
							<VTextField
								v-model="fromRocketStageMotor(1).value"
								:readonly="true"
								:label="$t('forms.content.parts.motor.name')"
							/>
						</td>
						<td
							v-if="isEditable"
						>
							<v-btn
								variant="flat"
								color="green ml-2"
								@click="clickMotorsSearch(1)"
							>
								{{ $t('forms.content.parts.motor.name') }}
							</v-btn>
						</td>
					</tr>
				</table> -->
			</v-col>
			<v-col 
				v-if="fromRocketStageHasMotor(2)"
				cols="12" sm="4"
			>
				<VTextField
					v-model="fromRocketStageMotor(2).value"
					:readonly="true"
					:label="$t('forms.content.parts.motor.name')"
				/>
				<!-- <table style="width: 100%;">
					<tr>
						<td style="width: 100%;">
							<VTextField
								v-model="fromRocketStageMotor(2).value"
								:readonly="true"
								:label="$t('forms.content.parts.motor.name')"
							/>
						</td>
						<td
							v-if="isEditable"
						>
							<v-btn
								variant="flat"
								color="green ml-2"
								@click="clickMotorsSearch(2)"
							>
								{{ $t('forms.content.parts.motor.name') }}
							</v-btn>
						</td>
					</tr>
				</table> -->
			</v-col>
		</v-row>
	</div>
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
						v-if="displayItem.enabled"
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
										@click="clickAltimetersSearch"
									>
										{{ $t('forms.content.parts.altimeter.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickChuteProtectorsSearch"
									>
										{{ $t('forms.content.parts.chuteProtector.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickChuteReleasesSearch"
									>
										{{ $t('forms.content.parts.chuteRelease.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickDeploymentBagsSearch"
									>
										{{ $t('forms.content.parts.deploymentBag.name') }}
									</v-btn>
								</v-list-item>
								<!-- <v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickMotorsSearch"
									>
										{{ $t('forms.content.parts.motor.name') }}
									</v-btn>
								</v-list-item> -->
								<!-- <v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickMotorCasesSearch"
									>
										{{ $t('forms.content.parts.motorCase.name') }}
									</v-btn>
								</v-list-item> -->
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickParachutesSearch"
									>
										{{ $t('forms.content.parts.parachute.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickStreamersSearch"
									>
										{{ $t('forms.content.parts.streamer.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="blue"
										@click="clickTrackersSearch"
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
	<v-row 
		v-if="displayItem.enabled"
		dense
	>
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
					:manufacturers="manufacturers"
					:stage-id="displayItem.id"
					@delete="handleAltimeterDelete"
					@edit="handleAltimeterEdit"
				>
				</RocketParts>
				<RocketParts
					:items="chuteProtectors"
					:deletable="isEditable"
					:editable="isEditable"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleChuteProtectorDelete"
					@edit="handleChuteProtectorEdit"
				>
				</RocketParts>
				<RocketParts
					:items="chuteReleases"
					:deletable="isEditable"
					:editable="isEditable"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleChuteReleaseDelete"
					@edit="handleChuteReleaseEdit"
				>
				</RocketParts>
				<RocketParts
					:items="deploymentBags"
					:deletable="isEditable"
					:editable="isEditable"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleDeploymentBagDelete"
					@edit="handleDeploymentBagEdit"
				>
				</RocketParts>
				<RocketParts
					:items="parachutes"
					:deletable="isEditable"
					:editable="isEditable"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleParachuteDelete"
					@edit="handleParachuteEdit"
				>
				</RocketParts>
				<RocketParts
					:items="streamers"
					:deletable="isEditable"
					:editable="isEditable"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleStreamerDelete"
					@edit="handleTrackerEdit"
				>
				</RocketParts>
				<RocketParts
					:items="trackers"
					:deletable="isEditable"
					:editable="isEditable"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleTrackerDelete"
					@edit="handleTrackerEdit"
				></RocketParts>
			</v-expansion-panels>
		</v-col>
	</v-row>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchAltimetersRef"
		:signal="dialogPartsSearchAltimetersManager.signal"
		:part-types="manufacturerTypeAltimeter"
		@close="dialogPartsSearchAltimetersManager.cancel()"
		@select="selectAltimeter"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchChuteProtectorsRef"
		:signal="dialogPartsSearchChuteProtectorsManager.signal"
		:part-types="manufacturerTypeChuteProtector"
		@close="dialogPartsSearchChuteProtectorsManager.cancel()"
		@select="selectChuteProtector"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchChuteReleasesRef"
		:signal="dialogPartsSearchChuteReleasesManager.signal"
		:part-types="manufacturerTypeChuteRelease"
		@close="dialogPartsSearchChuteReleasesManager.cancel()"
		@select="selectChuteRelease"
	/>
	<RocketPartsLookupDialog
		ref="dialoSearchgDeploymentBagsRef"
		:signal="dialogPartsSearchDeploymentBagsManager.signal"
		:part-types="manufacturerTypeDeploymentBag"
		@close="dialogPartsSearchDeploymentBagsManager.cancel()"
		@select="selectDeploymentBag"
	/>
	<!-- <RocketPartsLookupDialog
		ref="dialoSearchgMotorsRef"
		:signal="dialogPartsSearchMotorsManager.signal"
		:part-types="manufacturerTypeMotor"
		@close="dialogPartsSearchMotorsManager.cancel()"
		@select="selectDeploymentBags"
	/>
	<RocketPartsLookupDialog
		ref="dialoSearchgMotorCasesRef"
		:signal="dialogPartsSearchMotorCasesManager.signal"
		:part-types="manufacturerTypeMotorCase"
		@close="dialogPartsSearchMotorCasesManager.cancel()"
		@select="selectDeploymentBags"
	/> -->
	<RocketPartsLookupDialog
		ref="dialogPartsSearchParachutesRef"
		:signal="dialogPartsSearchParachutesManager.signal"
		:part-types="manufacturerTypeParachute"
		@close="dialogPartsSearchParachutesManager.cancel()"
		@select="selectParachute"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchStreamersRef"
		:signal="dialogPartsSearchStreamersManager.signal"
		:part-types="manufacturerTypeStreamer"
		@close="dialogPartsSearchStreamersManager.cancel()"
		@ok="selectStreamer"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchTrackersRef"
		:signal="dialogPartsSearchTrackersManager.signal"
		:part-types="manufacturerTypeTracker"
		@close="dialogPartsSearchTrackersManager.cancel()"
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

import RocketParts from '@/components/content/rockets/parts/RocketParts';
import RocketPartsLookupDialog from '@/components/content/rockets/dialogs/parts/RocketPartsLookupDialog';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VSelect2 from '@thzero/library_client_vue3_vuetify3/components/form/VSelect2';
import VTextArea from '@thzero/library_client_vue3_vuetify3/components/form/VTextArea';
import VTextField from '@thzero/library_client_vue3_vuetify3/components/form/VTextField';

export default {
	name: 'RocketSetupStageControl',
	components: {
		ChuteProtectorPanelTitle,
		DeploymentBagPanelTitle,
		ParachutePanelTitle,
		RocketParts,
		RocketPartsLookupDialog,
		StreamerPanelTitle,
		VConfirmationDialog,
		VSelect2,
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
			altimeters,
			chuteProtectors,
			chuteReleases,
			fromRocketStageCp,
			fromRocketStageDescription,
			fromRocketStageDiameterMajor,
			fromRocketStageDiameterMinor,
			fromRocketStageLength,
			fromRocketStageHasMotor,
			fromRocketStageMotor,
			fromRocketStageWeight,
			deploymentBags,
			displayItem,
			displayItemCg,
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
			motorDiameter,
			motorDiameters,
			dialogPartsDeleteManager,
			dialogPartsDeleteMessage,
			dialogPartsEditMessage,
			dialogPartsEditAltimeterManager,
			dialogPartsEditChuteProtectorManager,
			dialogPartsEditChuteReleaseManager,
			dialogPartsEditDeploymentBagManager,
			dialogPartsEditMotorManager,
			dialogPartsEditMotorCaseManager,
			dialogPartsEditParachuteManager,
			dialogPartsEditStreamerManager,
			dialogPartsEditTrackerManager,
			dialogPartsSearchAltimetersManager,
			dialogPartsSearchChuteProtectorsManager,
			dialogPartsSearchChuteReleasesManager,
			dialogPartsSearchDeploymentBagsManager,
			// dialogPartsSearchMotorsManager,
			// dialogPartsSearchMotorCasesManager,
			dialogPartsSearchParachutesManager,
			dialogPartsSearchStreamersManager,
			dialogPartsSearchTrackersManager,
			manufacturerTypeAltimeter,
			manufacturerTypeChuteProtector,
			manufacturerTypeChuteRelease,
			manufacturerTypeDeploymentBag,
			// manufacturerTypeMotor,
			// manufacturerTypeMotorCase,
			manufacturerTypeParachute,
			manufacturerTypeStreamer,
			manufacturerTypeTracker,
			manufacturers,
			panels,
			clickAltimetersSearch,
			clickChuteProtectorsSearch,
			clickChuteReleasesSearch,
			clickDeploymentBagsSearch,
			// clickMotorsSearch,
			// clickMotorCasesSearch,
			clickParachutesSearch,
			clickStreamersSearch,
			clickTrackersSearch,
			dialogPartsDeleteCancel,
			dialogPartsDeleteOk,
			handleAltimeterDelete,
			handleAltimeterEdit,
			handleChuteProtectorDelete,
			handleChuteProtectorEdit,
			handleChuteReleaseDelete,
			handleChuteReleaseEdit,
			handleDeploymentBagDelete,
			handleDeploymentBagEdit,
			handleParachuteDelete,
			handleParachuteEdit,
			handleStreamerDelete,
			handleStreamerEdit,
			handleTrackerDelete,
			handleTrackerEdit,
			panelsUpdated,
			selectAltimeter,
			selectChuteProtector,
			selectChuteRelease,
			selectDeploymentBag,
			selectParachute,
			selectStreamer,
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
			altimeters,
			chuteProtectors,
			chuteReleases,
			fromRocketStageCp,
			fromRocketStageDescription,
			fromRocketStageDiameterMajor,
			fromRocketStageDiameterMinor,
			fromRocketStageLength,
			fromRocketStageHasMotor,
			fromRocketStageMotor,
			fromRocketStageWeight,
			deploymentBags,
			displayItem,
			displayItemCg,
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
			motorDiameter,
			motorDiameters,
			dialogPartsDeleteManager,
			dialogPartsDeleteMessage,
			dialogPartsEditMessage,
			dialogPartsEditAltimeterManager,
			dialogPartsEditChuteProtectorManager,
			dialogPartsEditChuteReleaseManager,
			dialogPartsEditDeploymentBagManager,
			dialogPartsEditMotorManager,
			dialogPartsEditMotorCaseManager,
			dialogPartsEditParachuteManager,
			dialogPartsEditStreamerManager,
			dialogPartsEditTrackerManager,
			dialogPartsSearchAltimetersManager,
			dialogPartsSearchChuteProtectorsManager,
			dialogPartsSearchChuteReleasesManager,
			dialogPartsSearchDeploymentBagsManager,
			// dialogPartsSearchMotorsManager,
			// dialogPartsSearchMotorCasesManager,
			dialogPartsSearchParachutesManager,
			dialogPartsSearchStreamersManager,
			dialogPartsSearchTrackersManager,
			manufacturerTypeAltimeter,
			manufacturerTypeChuteProtector,
			manufacturerTypeChuteRelease,
			manufacturerTypeDeploymentBag,
			// manufacturerTypeMotor,
			// manufacturerTypeMotorCase,
			manufacturerTypeParachute,
			manufacturerTypeStreamer,
			manufacturerTypeTracker,
			manufacturers,
			panels,
			clickAltimetersSearch,
			clickChuteProtectorsSearch,
			clickChuteReleasesSearch,
			clickDeploymentBagsSearch,
			// clickMotorsSearch,
			// clickMotorCasesSearch,
			clickParachutesSearch,
			clickStreamersSearch,
			clickTrackersSearch,
			dialogPartsDeleteCancel,
			dialogPartsDeleteOk,
			handleAltimeterDelete,
			handleAltimeterEdit,
			handleChuteProtectorDelete,
			handleChuteProtectorEdit,
			handleChuteReleaseDelete,
			handleChuteReleaseEdit,
			handleDeploymentBagDelete,
			handleDeploymentBagEdit,
			handleParachuteDelete,
			handleParachuteEdit,
			handleStreamerDelete,
			handleStreamerEdit,
			handleTrackerDelete,
			handleTrackerEdit,
			panelsUpdated,
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
