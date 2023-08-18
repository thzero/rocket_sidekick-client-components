<template>
	<VFormListingDialog
		ref="dialogTrackersLookup"
		:label="$t('titles.content.parts.trackers.search')"
		:signal="signal"
		:button-ok-disabled-override="buttonOkDisabledOverride"
		:pre-complete-ok="preCompleteOk"
		:reset-additional="resetAdditional"
		:reset-on-submit="false"
		:validation="validation"
		width="80vh"
		max-width="90vh"
		@close="close"
	>
		<template #default="{ buttonOkDisabled, isLoading }">
			<v-row dense>
				<v-col cols="12">
					<v-card>
						<v-card-text>
							<v-row dense>
								<v-col cols="12">
									<VTextFieldWithValidation
										ref="detailItemNameRef"
										v-model="detailItemName"
										vid="detailItemName"
										:validation="validation"
										:label="$t('forms.name')"
										:counter="30"
									/>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col cols="8">
									<VSelectWithValidation
										ref="detailItemManufacturerRef"
										v-model="detailItemManufacturer"
										vid="detailItemManufacturer"
										multiple
										:max-values="2"
										:items="manufacturers"
										:validation="validation"
										:label="$t('forms.content.manufacturer.name')"
									/>
								</v-col>
								<v-col col="4">
									<VTextFieldWithValidation
										ref="detailItemManufacturerStockIdRef"
										v-model="detailItemManufacturerStockId"
										vid="detailItemManufacturerStockId"
										:validation="validation"
										:label="$t('forms.content.parts.manufacturerId')"
									/>
								</v-col>
							</v-row>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn
								:variant="buttonsForms.variant.clear"
								:color="buttonsForms.color.clear"
								:loading="isLoading"
								@click="clickTrackersSearchClear"
							>{{ $t('buttons.clear') }}</v-btn>
							<v-btn
								:variant="buttonsForms.variant.ok"
								:color="buttonsForms.color.ok"
								:disabled="buttonOkDisabled"
								:loading="isLoading"
								@click="clickTrackersSearch"
							>{{ $t('buttons.search') }}</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</template>
		<template v-slot:listing>
			<div
				v-if="!results"
				style="height: 35vh"
			>
				&nbsp;
			</div>
			<div
				v-if="results"
				class="row"
				style="height: 35vh"
			>
				<v-expansion-panels
					multiple
				>
					<RocketParts
						:items="results"
						:selectable="true"
						:search="true"
						panel-type-id="trackers-search"
						@select="clickTrackersSelect"
					>
					</RocketParts>
				</v-expansion-panels>
			</div>
		</template>
	</VFormListingDialog>
	<VConfirmationDialog
		:message="dialogResetMessage"
		:messageRaw=true
		:signal="dialogResetManager.signal"
		@cancel="dialogResetManager.cancel()"
		@ok="dialogResetOk"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useRocketEditValidation } from '@/components/content/rockets/user/rocket/rocketEditValidation';
import { useTrackersRocketLookupDialogComponent } from '@/components/content/rockets/user/dialogs/trackers/trackersLookupDialogComponent';
import { useTrackersRocketLookupDialogValidation } from '@/components/content/rockets/user/dialogs/trackers/trackersLookupDialogValidation';
import { useRocketLookupDialogProps } from '@/components/content/rockets/user/dialogs/lookupDialogProps';

import ChuteProtectorPanelTitle from '@/components/content/parts/chuteProtectors/ChuteProtectorPanelTitle';
import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';
import ParachutePanelTitle from '@/components/content/parts/parachutes/ParachutePanelTitle';
import StreamerPanelTitle from '@/components/content/parts/streamers/StreamerPanelTitle';

import RocketParts from '@/components/content/rockets/user/rocket/RocketParts';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VFormListingDialog from '@thzero/library_client_vue3_vuetify3/components/form/VFormListingDialog';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'TrackersLookupDialog',
	components: {
		ChuteProtectorPanelTitle,
		DeploymentBagPanelTitle,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		ParachutePanelTitle,
		RocketParts,
		StreamerPanelTitle,
		VConfirmationDialog,
		VFormListingDialog,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	props: {
		...useRocketLookupDialogProps
	},
	emits: ['close', 'ok'],
	setup (props, context) {
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
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			serviceStore,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			dialogTrackersLookup,
			dialogResetManager,
			dialogResetMessage,
			manufacturersI,
			partTypes,
			results,
			manufacturers,
			buttonOkDisabledOverride,
			clickTrackersSearch,
			clickTrackersSearchClear,
			clickTrackersSelect,
			close,
			dialogResetOk,
			isPartType,
			manufacturer,
			partTypeName,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		} = useTrackersRocketLookupDialogComponent(props, context);

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
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			serviceStore,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			dialogTrackersLookup,
			dialogResetManager,
			dialogResetMessage,
			manufacturersI,
			partTypes,
			results,
			manufacturers,
			buttonOkDisabledOverride,
			clickTrackersSearch,
			clickTrackersSearchClear,
			clickTrackersSelect,
			close,
			dialogResetOk,
			isPartType,
			manufacturer,
			partTypeName,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketEditValidation(false), LibraryCommonUtility.cloneDeep(useTrackersRocketLookupDialogValidation)));
	}
};
</script>

<style scoped>
</style>
