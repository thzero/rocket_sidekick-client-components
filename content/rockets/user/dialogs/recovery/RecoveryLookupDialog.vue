<template>
	<VFormListingDialog
		ref="dialogRecoveryLookup"
		:label="$t('titles.content.parts.recovery.search')"
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
								<v-col cols="8">
									<VTextFieldWithValidation
										ref="detailItemNameRef"
										v-model="detailItemName"
										vid="detailItemName"
										:validation="validation"
										:label="$t('forms.name')"
										:counter="30"
									/>
								</v-col>
								<v-col cols="4">
									<v-checkbox
										v-model="detailItemThinMill"
										density="compact"
										:label="$t('forms.content.parts.parachute.thinMill')"
									/>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col cols="3">
									<VNumberFieldWithValidation
										ref="detailItemDiameterMinRef"
										v-model="detailItemDiameterMin"
										vid="detailItemDiameterMin"
										:validation="validation"
										:label="$t('forms.content.rockets.diameter.name') + ' ' + $t('forms.content.parts.min.abbr')"
									/>
								</v-col>
								<v-col cols="3">
									<VNumberFieldWithValidation
										ref="detailItemDiameterMaxRef"
										v-model="detailItemDiameterMax"
										vid="detailItemDiameterMax"
										:validation="validation"
										:label="$t('forms.content.rockets.diameter.name') + ' ' + $t('forms.content.parts.max.abbr')"
									/>
								</v-col>
								<v-col cols="6">
									<table>
										<tr>
											<td class="measurementUnits">
												<MeasurementUnitsSelect
													ref="detailItemDiameterMeasurementUnitsIdRef"
													v-model="detailItemDiameterMeasurementUnitsId"
													vid="detailItemDiameterMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnit">
												<MeasurementUnitSelect
													ref="detailItemDiameterMeasurementUnitIdRef"
													v-model="detailItemDiameterMeasurementUnitId"
													vid="detailItemDiameterMeasurementUnitId"
													:measurementUnitsId="detailItemDiameterMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td>
										</tr>
									</table>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col cols="3">
									<VNumberFieldWithValidation
										ref="detailItemLengthMinRef"
										v-model="detailItemLengthMin"
										vid="detailItemLengthMin"
										:validation="validation"
										:label="$t('forms.content.parts.length') + ' ' + $t('forms.content.parts.min.abbr')"
									/>
								</v-col>
								<v-col cols="3">
									<VNumberFieldWithValidation
										ref="detailItemLengthMaxRef"
										v-model="detailItemLengthMax"
										vid="detailItemLengthMax"
										:validation="validation"
										:label="$t('forms.content.parts.length') + ' ' + $t('forms.content.parts.max.abbr')"
									/>
								</v-col>
								<v-col cols="6">
									<table>
										<tr>
											<td class="measurementUnits">
												<MeasurementUnitsSelect
													ref="detailItemLengthMeasurementUnitsIdRef"
													v-model="detailItemLengthMeasurementUnitsId"
													vid="detailItemLengthMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnit">
												<MeasurementUnitSelect
													ref="detailItemLengthMeasurementUnitIdRef"
													v-model="detailItemLengthMeasurementUnitId"
													vid="detailItemLengthMeasurementUnitId"
													:measurementUnitsId="detailItemLengthMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td>
										</tr>
									</table>
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
								@click="clickRecoverySearchClear"
							>{{ $t('buttons.clear') }}</v-btn>
							<v-btn
								:variant="buttonsForms.variant.ok"
								:color="buttonsForms.color.ok"
								:disabled="buttonOkDisabled"
								:loading="isLoading"
								@click="clickRecoverySearch"
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
						panel-type-id="recovery-search"
						@select="clickRecoverySelect"
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
import { useRecoveryRocketLookupDialogComponent } from '@/components/content/rockets/user/dialogs/recovery/recoveryLookupDialogComponent';
import { useRecoveryRocketLookupDialogValidation } from '@/components/content/rockets/user/dialogs/recovery/recoveryLookupDialogValidation';
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
	name: 'RecoveryLookupDialog',
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
			detailItemDiameterMax,
			detailItemDiameterMin,
			detailItemDiameterMeasurementUnitId,
			detailItemDiameterMeasurementUnitsId,
			detailItemLengthMax,
			detailItemLengthMin,
			detailItemLengthMeasurementUnitId,
			detailItemLengthMeasurementUnitsId,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemThinMill,
			dialogRecoveryLookup,
			dialogResetManager,
			dialogResetMessage,
			manufacturersI,
			partTypes,
			results,
			manufacturers,
			buttonOkDisabledOverride,
			clickRecoverySearch,
			clickRecoverySearchClear,
			clickRecoverySelect,
			close,
			dialogResetOk,
			isPartType,
			manufacturer,
			partTypeName,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		} = useRecoveryRocketLookupDialogComponent(props, context);

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
			detailItemDiameterMax,
			detailItemDiameterMin,
			detailItemDiameterMeasurementUnitId,
			detailItemDiameterMeasurementUnitsId,
			detailItemLengthMax,
			detailItemLengthMin,
			detailItemLengthMeasurementUnitId,
			detailItemLengthMeasurementUnitsId,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemThinMill,
			dialogRecoveryLookup,
			dialogResetManager,
			dialogResetMessage,
			manufacturersI,
			partTypes,
			results,
			manufacturers,
			buttonOkDisabledOverride,
			clickRecoverySearch,
			clickRecoverySearchClear,
			clickRecoverySelect,
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
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketEditValidation(false), LibraryCommonUtility.cloneDeep(useRecoveryRocketLookupDialogValidation)));
	}
};
</script>

<style scoped>
</style>
