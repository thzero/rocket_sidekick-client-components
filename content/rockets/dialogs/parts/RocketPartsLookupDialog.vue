<template>
	<VtFormListingDialog
		ref="dialogRocketPartsLookup"
		:label="$t(partTypeName)"
		:signal="signal"
		:button-ok-disabled-override="buttonOkDisabledOverride"
		:pre-complete-ok="preCompleteOk"
		:reset-additional="resetAdditional"
		:reset-on-submit="false"
		:validation="validation"
		width="80vh"
		max-width="90vh"
		@close="close"
		:debug="true"
	>
		<template #default="{ buttonOkDisabled, isLoading }">
			<v-row dense>
				<v-col cols="12">
					<v-card>
						<v-card-text>
							<v-row dense>
								<v-col cols="8">
									<VtTextFieldWithValidation
										ref="filterItemNameRef"
										v-model="filterItemName"
										vid="filterItemName"
										:validation="validation"
										:label="$t('forms.name')"
										:counter="30"
									/>
								</v-col>
								<v-col
									v-if="isParachutes() || isStreamers()"
									cols="4"
								>
									<v-checkbox
										v-model="filterItemRocketTypes"
										density="compact"
										:label="$t('forms.content.parts.parachute.thinMill')"
									/>
								</v-col>
							</v-row>
							<v-row 
								dense
							>
								<v-col
									v-if="isMotors()"
									cols="12" sm="6"
								>
									<VtSelectWithValidation
										ref="filterItemMotorImpulseClassRef"
										v-model="filterItemMotorImpulseClass"
										vid="filterItemMotorImpulseClass"
										:items="motorImpulseClasses"
										:validation="validation"
										:label="$t('forms.external.motorSearch.impulseClass')"
									/>
								</v-col>
								<v-col
									v-if="isMotors() || isMotorCases()"
									cols="12" sm="6"
								>
									<VtSelectWithValidation
										ref="filterItemMotorDiameterRef"
										v-model="filterItemMotorDiameter"
										vid="filterItemMotorDiameter"
										:items="motorMountDiameters"
										:validation="validation"
										:label="$t('forms.external.motorSearch.diameter')"
									/>
								</v-col>
							</v-row>
							<v-row 
								v-if="isChuteProtectors() || isDeploymentBags() || isParachutes()"
								dense
							>
								<v-col cols="3">
									<VtNumberFieldWithValidation
										ref="filterItemDiameterMinRef"
										v-model="filterItemDiameterMin"
										vid="filterItemDiameterMin"
										:validation="validation"
										:label="$t('forms.content.rockets.diameter.name') + ' ' + $t('forms.content.parts.min.abbr')"
									/>
								</v-col>
								<v-col cols="3">
									<VtNumberFieldWithValidation
										ref="filterItemDiameterMaxRef"
										v-model="filterItemDiameterMax"
										vid="filterItemDiameterMax"
										:validation="validation"
										:label="$t('forms.content.rockets.diameter.name') + ' ' + $t('forms.content.parts.max.abbr')"
									/>
								</v-col>
								<v-col cols="6">
									<table>
										<tr>
											<td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="filterItemDiameterMeasurementUnitsIdRef"
													v-model="filterItemDiameterMeasurementUnitsId"
													vid="filterItemDiameterMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect
													ref="filterItemDiameterMeasurementUnitIdRef"
													v-model="filterItemDiameterMeasurementUnitId"
													vid="filterItemDiameterMeasurementUnitId"
													:measurementUnitsId="filterItemDiameterMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td>
										</tr>
									</table>
								</v-col>
							</v-row>
							<v-row 
								v-if="isDeploymentBags() || isStreamers()"
								dense
							>
								<v-col cols="3">
									<VtNumberFieldWithValidation
										ref="filterItemLengthMinRef"
										v-model="filterItemLengthMin"
										vid="filterItemLengthMin"
										:validation="validation"
										:label="$t('forms.content.parts.length') + ' ' + $t('forms.content.parts.min.abbr')"
									/>
								</v-col>
								<v-col cols="3">
									<VtNumberFieldWithValidation
										ref="filterItemLengthMaxRef"
										v-model="filterItemLengthMax"
										vid="filterItemLengthMax"
										:validation="validation"
										:label="$t('forms.content.parts.length') + ' ' + $t('forms.content.parts.max.abbr')"
									/>
								</v-col>
								<v-col cols="6">
									<table>
										<tr>
											<td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="filterItemLengthMeasurementUnitsIdRef"
													v-model="filterItemLengthMeasurementUnitsId"
													vid="filterItemLengthMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect
													ref="filterItemLengthMeasurementUnitIdRef"
													v-model="filterItemLengthMeasurementUnitId"
													vid="filterItemLengthMeasurementUnitId"
													:measurementUnitsId="filterItemLengthMeasurementUnitsId"
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
									<VtSelectWithValidation
										ref="filterItemManufacturersRef"
										v-model="filterItemManufacturers"
										vid="filterItemManufacturers"
										multiple
										:max-values="2"
										:items="manufacturers"
										:validation="validation"
										:label="$t('forms.content.manufacturer.name')"
									/>
								</v-col>
								<v-col col="4">
									<VtTextFieldWithValidation
										ref="filterItemManufacturerStockIdRef"
										v-model="filterItemManufacturerStockId"
										vid="filterItemManufacturerStockId"
										:validation="validation"
										:label="$t('forms.content.parts.manufacturerId')"
									/>
								</v-col>
							</v-row>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn
								v-if="multiple"
								:variant="buttonsForms.variant.clear"
								:color="buttonsForms.color.clear"
								:loading="isLoading"
								:disabled="selected && selected.length === 0"
								@click="clickRocketPartsSearchClearSelection"
							>{{ $t('buttons.cleaSelections') }}</v-btn>
							<v-btn
								:variant="buttonsForms.variant.clear"
								:color="buttonsForms.color.clear"
								:loading="isLoading"
								@click="clickRocketPartsSearchClear"
							>{{ $t('buttons.clear') }}</v-btn>
							<v-btn
								:variant="buttonsForms.variant.ok"
								:color="buttonsForms.color.ok"
								:disabled="buttonOkDisabled"
								:loading="isLoading"
								@click="clickRocketPartsSearch"
							>{{ $t('buttons.search') }}</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</template>
		<template #preActions="{ buttonOkDisabled, isLoading }">
			<v-btn
				v-if="multiple"
				:variant="buttonsForms.variant.cancel"
				:color="buttonsForms.color.cancel"
				:loading="isLoading"
				:disabled="selected && selected.length === 0"
				@click="clickRocketPartsSearchSelect"
				class="mr-2"
			>{{ $t('buttons.select') }}</v-btn>
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
						:multiple="true"
						:selectable="true"
						:selected="selected"
						:manufacturers="manufacturers"
						:search="true"
						panel-type-id="rocket-search"
						@select="clickRocketPartSelect"
					>
					</RocketParts>
				</v-expansion-panels>
			</div>
		</template>
	</VtFormListingDialog>
	<VtConfirmationDialog
		:message="dialogResetMessage"
		:messageRaw=true
		:signal="dialogResetManager.signal"
		@cancel="dialogResetManager.cancel()"
		@ok="dialogResetOk"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useRocketPartsLookupDialogComponent } from '@/components/content/rockets/dialogs/parts/rocketPartsLookupDialogComponent';
import { useRocketPartsLookupDialogComponentProps } from '@/components/content/rockets/dialogs/parts/rocketPartsLookupDialogComponentProps';
import { useRocketPartsLookupDialogValidation } from '@/components/content/rockets/dialogs/parts/rocketPartsLookupDialogValidation';
import { useLookupDialogProps } from '@/components/content/dialogs/lookupDialogProps';

import RocketParts from '@/components/content/rockets/parts/RocketParts';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormListingDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormListingDialog';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'RocketPartsLookupDialog',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		RocketParts,
		VtConfirmationDialog,
		VtFormListingDialog,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useLookupDialogProps,
		...useRocketPartsLookupDialogComponentProps
	},
	emits: ['close', 'ok', 'select'],
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
			motorMountDiameters,
			motorImpulseClasses,
			motorCaseInfo,
			motorUrl,
			serviceStore,
			filterItemDiameterMax,
			filterItemDiameterMin,
			filterItemDiameterMeasurementUnitId,
			filterItemDiameterMeasurementUnitsId,
			filterItemLengthMax,
			filterItemLengthMin,
			filterItemLengthMeasurementUnitId,
			filterItemLengthMeasurementUnitsId,
			filterItemManufacturers,
			filterItemManufacturerStockId,
			filterItemMotorDiameter,
			filterItemMotorImpulseClass,
			filterItemName,
			filterItemRocketTypes,
			dialogRocketPartsLookup,
			dialogResetManager,
			dialogResetMessage,
			results,
			selected,
			manufacturers,
			partTypeName,
			buttonOkDisabledOverride,
			clickRocketPartsSearch,
			clickRocketPartsSearchClear,
			clickRocketPartsSearchClearSelection,
			clickRocketPartsSearchSelect,
			clickRocketPartSelect,
			close,
			dialogResetOk,
			isAltimeters,
			isChuteProtectors,
			isChuteReleases,
			isDeploymentBags,
			isMotors,
			isMotorCases,
			isParachutes,
			isStreamers,
			isTrackers,
			manufacturer,
			preCompleteOk,
			resetAdditional,
			validationIsMotors,
			validationIsMotorCases,
			scope,
			validation
		} = useRocketPartsLookupDialogComponent(props, context);

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
			motorMountDiameters,
			motorImpulseClasses,
			motorCaseInfo,
			motorUrl,
			serviceStore,
			filterItemDiameterMax,
			filterItemDiameterMin,
			filterItemDiameterMeasurementUnitId,
			filterItemDiameterMeasurementUnitsId,
			filterItemLengthMax,
			filterItemLengthMin,
			filterItemLengthMeasurementUnitId,
			filterItemLengthMeasurementUnitsId,
			filterItemManufacturers,
			filterItemManufacturerStockId,
			filterItemMotorDiameter,
			filterItemMotorImpulseClass,
			filterItemName,
			filterItemRocketTypes,
			dialogRocketPartsLookup,
			dialogResetManager,
			dialogResetMessage,
			results,
			selected,
			manufacturers,
			partTypeName,
			buttonOkDisabledOverride,
			clickRocketPartsSearch,
			clickRocketPartsSearchClear,
			clickRocketPartsSearchClearSelection,
			clickRocketPartsSearchSelect,
			clickRocketPartSelect,
			close,
			dialogResetOk,
			isAltimeters,
			isChuteProtectors,
			isChuteReleases,
			isDeploymentBags,
			isMotors,
			isMotorCases,
			isParachutes,
			isStreamers,
			isTrackers,
			manufacturer,
			preCompleteOk,
			resetAdditional,
			validationIsMotors,
			validationIsMotorCases,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketPartsLookupDialogValidation(this), {}));
	}
};
</script>

<style scoped>
</style>
