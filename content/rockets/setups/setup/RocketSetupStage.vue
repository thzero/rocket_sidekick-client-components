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
				v-model="displayItem.description"
				:readonly="true"
				:label="$t('forms.description')"
				:rows="0"
			/>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="6">
			<VTextField
				v-model="motorDiameter"
				:readonly="true"
				:label="$t('forms.content.rockets.diameter.motor')"
			/>
		</v-col>
		<v-col cols="6">
			<VTextField
				v-model="stageNumber"
				:readonly="true"
				:label="$t('forms.content.rockets.stage.name')"
			/>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="6" xs="3">
			<VTextField
				v-model="displayItemWeight"
				:hide-details="true"
				:readonly="true"
				:label="$t('forms.content.parts.weight')"
			/>
		</v-col>
		<v-col cols="6" xs="3">
			<VTextField
				v-model="displayItemCg"
				:hide-details="true"
				:readonly="true"
				:label="$t('forms.content.rockets.cg')"
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
										variant="flat"
										color="purple"
										@click="clickAltimetersSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.altimeter.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickChuteProtectorsSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.chuteProtector.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickChuteReleasesSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.chuteRelease.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickDeploymentBagsSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.deploymentBag.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickMotorsSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.motor.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickMotorCasesSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.motorCase.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickParachutesSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.parachute.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="orange"
										@click="clickStreamersSearch(displayItem.id)"
									>
										{{ $t('forms.content.parts.streamer.name') }}
									</v-btn>
								</v-list-item>
								<v-list-item>
									<v-btn
										variant="flat"
										color="blue"
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
		@select="selectChuteProtectors"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchChuteReleasesRef"
		:signal="dialogPartsSearchChuteReleasesManager.signal"
		:part-types="manufacturerTypeChuteRelease"
		@close="dialogPartsSearchChuteReleasesManager.cancel()"
		@select="selectChuteReleases"
	/>
	<RocketPartsLookupDialog
		ref="dialoSearchgDeploymentBagsRef"
		:signal="dialogPartsSearchDeploymentBagsManager.signal"
		:part-types="manufacturerTypeDeploymentBag"
		@close="dialogPartsSearchDeploymentBagsManager.cancel()"
		@select="selectDeploymentBags"
	/>
	<RocketPartsLookupDialog
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
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchParachutesRef"
		:signal="dialogPartsSearchParachutesManager.signal"
		:part-types="manufacturerTypeParachute"
		@close="dialogPartsSearchParachutesManager.cancel()"
		@select="selectParachutes"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchStreamersRef"
		:signal="dialogPartsSearchStreamersManager.signal"
		:part-types="manufacturerTypeStreamer"
		@close="dialogPartsSearchStreamersManager.cancel()"
		@ok="selectStreamers"
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
import VSelect from '@thzero/library_client_vue3_vuetify3/components/form/VSelect';
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
			altimeters,
			chuteProtectors,
			chuteReleases,
			cp,
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
			motorDiameter,
			parachutes,
			stageNumber,
			streamers,
			trackers,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			dialogPartsDeleteManager,
			dialogPartsDeleteMessage,
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
			dialogPartsSearchMotorsManager,
			dialogPartsSearchMotorCasesManager,
			dialogPartsSearchParachutesManager,
			dialogPartsSearchStreamersManager,
			dialogPartsSearchTrackersManager,
			manufacturerTypeAltimeter,
			manufacturerTypeChuteProtector,
			manufacturerTypeChuteRelease,
			manufacturerTypeDeploymentBag,
			manufacturerTypeMotor,
			manufacturerTypeMotorCase,
			manufacturerTypeParachute,
			manufacturerTypeStreamer,
			manufacturerTypeTracker,
			manufacturers,
			panels,
			clickAltimetersSearch,
			clickChuteProtectorsSearch,
			clickChuteReleasesSearch,
			clickDeploymentBagsSearch,
			clickMotorsSearch,
			clickMotorCasesSearch,
			clickParachutesSearch,
			clickStreamersSearch,
			clickTrackersSearch,
			dialogPartsDeleteCancel,
			dialogPartsDeleteOk,
			handleAltimeterDelete,
			handleChuteProtectorDelete,
			handleChuteReleaseDelete,
			handleDeploymentBagDelete,
			handleParachuteDelete,
			handleStreamerDelete,
			handleTrackerDelete,
			handleAltimeterEdit,
			handleChuteProtectorEdit,
			handleChuteReleaseEdit,
			handleDeploymentBagEdit,
			handleParachuteEdit,
			handleStreamerEdit,
			handleTrackerEdit,
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
			altimeters,
			chuteProtectors,
			chuteReleases,
			cp,
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
			motorDiameter,
			parachutes,
			stageNumber,
			streamers,
			trackers,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			dialogPartsDeleteManager,
			dialogPartsDeleteMessage,
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
			dialogPartsSearchMotorsManager,
			dialogPartsSearchMotorCasesManager,
			dialogPartsSearchParachutesManager,
			dialogPartsSearchStreamersManager,
			dialogPartsSearchTrackersManager,
			manufacturerTypeAltimeter,
			manufacturerTypeChuteProtector,
			manufacturerTypeChuteRelease,
			manufacturerTypeDeploymentBag,
			manufacturerTypeMotor,
			manufacturerTypeMotorCase,
			manufacturerTypeParachute,
			manufacturerTypeStreamer,
			manufacturerTypeTracker,
			manufacturers,
			panels,
			clickAltimetersSearch,
			clickChuteProtectorsSearch,
			clickChuteReleasesSearch,
			clickDeploymentBagsSearch,
			clickMotorsSearch,
			clickMotorCasesSearch,
			clickParachutesSearch,
			clickStreamersSearch,
			clickTrackersSearch,
			dialogPartsDeleteCancel,
			dialogPartsDeleteOk,
			handleAltimeterDelete,
			handleChuteProtectorDelete,
			handleChuteReleaseDelete,
			handleDeploymentBagDelete,
			handleParachuteDelete,
			handleStreamerDelete,
			handleTrackerDelete,
			handleAltimeterEdit,
			handleChuteProtectorEdit,
			handleChuteReleaseEdit,
			handleDeploymentBagEdit,
			handleParachuteEdit,
			handleStreamerEdit,
			handleTrackerEdit,
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
