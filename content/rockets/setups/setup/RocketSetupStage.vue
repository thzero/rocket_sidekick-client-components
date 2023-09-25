<template>
	<div
		v-if="debug"
	>
		[[ isEditable {{ isEditable }} ]]
		[[ displayItem {{ displayItem }} ]]
		<!-- [[ altimeters {{ altimeters }} ]]
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
			<v-col cols="12">
				<VTextArea
					v-model="fromRocketStageDescription"
					:readonly="true"
					:label="$t('forms.description')"
					:rows="0"
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
			<v-col
				v-if="displayItemWeight"
				cols="6" sm="4"
			>
				<VTextField
					v-model="displayItemWeight"
					:hide-details="true"
					:readonly="true"
					:label="$t('forms.content.parts.weight')"
				/>
			</v-col>
		</v-row>
		<!-- <v-row
			dense
		>
			<v-col 
				v-if="hasMotorInfo(0)"
				cols="12"
			>
				<v-row
					dense
				>
					<v-col 
						cols="6" md="4"
					>
						<VTextField
							v-model="fromRocketStageMotor(0).value"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motor.name')"
						/>
					</v-col>
					<v-col 
						cols="6" md="4"
					>
						<VTextField
							v-model="motorInfo(0).value"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motor.name')"
						/>
					</v-col>
					<v-col 
						cols="12" md="4"
					>
						<VTextField
							v-model="motorCaseInfo(0).value"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motorCase.name2')"
						/>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-row
			dense
		>
			<v-col 
				v-if="hasMotorInfo(1)"
				cols="12"
			>
				<v-row
					dense
				>
					<v-col 
						cols="6" md="4"
					>
						<VTextField
							v-model="fromRocketStageMotor(1).value"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motor.name')"
						/>
					</v-col>
					<v-col 
						cols="6" md="4"
					>
						<VTextField
							v-model="motorInfo(1).value"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motor.name')"
						/>
					</v-col>
					<v-col 
						cols="12" md="4"
					>
						<VTextField
							v-model="motorCaseInfo(1).value"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motorCase.name2')"
						/>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-row
			dense
		>
			<v-col 
				v-if="hasMotorInfo(2)"
				cols="12"
			>
				<v-row
					dense
				>
					<v-col 
						cols="6" md="4"
					>
						<VTextField
							v-model="fromRocketStageMotor(2).value"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motor.name')"
						/>
					</v-col>
					<v-col 
						cols="6" md="4"
					>
						<VTextField
							v-model="motorInfo(2).value"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motor.name')"
						/>
					</v-col>
					<v-col 
						cols="12" md="4"
					>
						<VTextField
							v-model="motorCaseInfo(2).value"
							:readonly="true"
							:hide-details="true"
							:label="$t('forms.content.parts.motorCase.name2')"
						/>
					</v-col>
				</v-row>
			</v-col>
		</v-row> -->
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
					:editable="isEditablePart"
					:manufacturers="manufacturers"
					:stage-id="displayItem.id"
					@delete="handleAltimeterDelete"
					@edit="handleAltimeterEdit"
				>
				</RocketParts>
				<RocketParts
					:items="chuteProtectors"
					:deletable="isEditable"
					:editable="isEditablePart"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleChuteProtectorDelete"
					@edit="handleChuteProtectorEdit"
				>
				</RocketParts>
				<RocketParts
					:items="chuteReleases"
					:deletable="isEditable"
					:editable="isEditablePart"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleChuteReleaseDelete"
					@edit="handleChuteReleaseEdit"
				>
				</RocketParts>
				<RocketParts
					:items="deploymentBags"
					:deletable="isEditable"
					:editable="isEditablePart"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleDeploymentBagDelete"
					@edit="handleDeploymentBagEdit"
				>
				</RocketParts>
				<RocketParts
					:items="motors"
					:manufacturer-abbrev="true"
					:deletable="false"
					:editable="false"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
				>
					<template #partText	="{ item }">
						<v-row 
							dense
							class="mb-2"
						>
							<v-col 
								cols="12" sm="5"
							>
								<VTextField
									v-model="item.motor"
									:readonly="true"
									:hide-details="true"
									:label="$t('forms.content.parts.motor.name')"
								/>
							</v-col><v-col 
								cols="12" sm="7"
							>
								<VTextField
									v-model="item.motorCase"
									:readonly="true"
									:hide-details="true"
									:label="$t('forms.content.parts.motorCase.name')"
								/>
							</v-col>
						</v-row>
					</template> 
				</RocketParts>
				<!-- <RocketParts
					:items="motorCases"
					:manufacturer-abbrev="true"
					:deletable="false"
					:editable="false"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
				>
				</RocketParts> -->
				<RocketParts
					:items="parachutes"
					:deletable="isEditable"
					:editable="isEditablePart"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleParachuteDelete"
					@edit="handleParachuteEdit"
				>
				</RocketParts>
				<RocketParts
					:items="streamers"
					:deletable="isEditable"
					:editable="isEditablePart"
					:manufacturers="manufacturers"
					:stageId="displayItem.id"
					@delete="handleStreamerDelete"
					@edit="handleTrackerEdit"
				>
				</RocketParts>
				<RocketParts
					:items="trackers"
					:deletable="isEditable"
					:editable="isEditablePart"
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
			isEditablePart,
			motors,
			motorCases,
			parachutes,
			stageIndex,
			streamers,
			trackers,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			motorDiameters,
			motorDiameter,
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
			dialogPartsSearchParachutesManager,
			dialogPartsSearchStreamersManager,
			dialogPartsSearchTrackersManager,
			manufacturerTypeAltimeter,
			manufacturerTypeChuteProtector,
			manufacturerTypeChuteRelease,
			manufacturerTypeDeploymentBag,
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
			hasMotorInfo,
			motorCaseInfo,
			motorInfo,
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
			isEditablePart,
			motors,
			motorCases,
			parachutes,
			stageIndex,
			streamers,
			trackers,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			motorDiameters,
			motorDiameter,
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
			hasMotorInfo,
			motorCaseInfo,
			motorInfo,
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
