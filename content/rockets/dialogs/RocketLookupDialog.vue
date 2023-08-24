<template>
	<VFormListingDialog
		ref="dialogRocketLookup"
		:label="$t('titles.content.rockets.title')"
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
								<v-col cols="12" sm="6">
									<VTextFieldWithValidation
										ref="filterItemNameRef"
										v-model="filterItemName"
										vid="filterItemName"
										:validation="validation"
										:label="$t('forms.name')"
										:counter="30"
									/>
								</v-col>
								<v-col cols="12" sm="6">
									<VSelectWithValidation
										ref="filterItemRocketTypesRef"
										v-model="filterItemRocketTypes"
										vid="filterItemRocketTypes"
										multiple
										:max-values="3"
										:items="rocketTypes"
										:validation="validation"
										:label="$t('forms.content.rockets.level')"
										:hint="$t('forms.content.rockets.level')"
									/>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col cols="3">
									<VNumberFieldWithValidation
										ref="filterItemDiameterMinRef"
										v-model="filterItemDiameterMin"
										vid="filterItemDiameterMin"
										:validation="validation"
										:label="$t('forms.content.rockets.diameter.name') + ' ' + $t('forms.content.parts.min.abbr')"
									/>
								</v-col>
								<v-col cols="3">
									<VNumberFieldWithValidation
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
											<td class="measurementUnits">
												<MeasurementUnitsSelect
													ref="filterItemDiameterMeasurementUnitsIdRef"
													v-model="filterItemDiameterMeasurementUnitsId"
													vid="filterItemDiameterMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnit">
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
							<v-row dense>
								<v-col cols="8">
									<VSelectWithValidation
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
									<VTextFieldWithValidation
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
								:variant="buttonsForms.variant.clear"
								:color="buttonsForms.color.clear"
								:loading="isLoading"
								@click="clickRocketSearchClear"
							>{{ $t('buttons.clear') }}</v-btn>
							<v-btn
								:variant="buttonsForms.variant.ok"
								:color="buttonsForms.color.ok"
								:disabled="buttonOkDisabled"
								:loading="isLoading"
								@click="clickRocketSearch"
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
				<div
				v-for="item of results"
				:key="item.id"
				>
					<v-card>
						<v-card-title
							class="bg-primary"
						>
							{{ item.name }}
							<div class="float-right">{{ manufacturer(item) }}</div>
						</v-card-title>
						<v-card-text>
							<VMarkdown v-model="item.description" :use-github=false />
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								:variant="buttonsForms.variant.default"
								:color="buttonsForms.color.default"
								@click="clickRocketSelect(item)"
							>
								{{ $t('buttons.select') }}
							</v-btn>
						</v-card-actions>
					</v-card>
				</div>
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

import { useRocketRocketLookupDialogComponent } from '@/components/content/rockets/dialogs/rocketLookupDialogComponent';
import { useRocketLookupDialogComponentProps } from '@/components/content/rockets/dialogs/rocketLookupDialogComponentProps';
import { useRocketRocketLookupDialogValidation } from '@/components/content/rockets/dialogs/rocketLookupDialogValidation';
import { useRocketLookupDialogProps } from '@/components/content/rockets/dialogs/lookupDialogProps';

import ChuteProtectorPanelTitle from '@/components/content/parts/chuteProtectors/ChuteProtectorPanelTitle';
import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import ParachutePanelTitle from '@/components/content/parts/parachutes/ParachutePanelTitle';
import RocketParts from '@/components/content/rockets/parts/RocketParts';
import StreamerPanelTitle from '@/components/content/parts/streamers/StreamerPanelTitle';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VFormListingDialog from '@thzero/library_client_vue3_vuetify3/components/form/VFormListingDialog';
import VMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdown';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'RocketLookupDialog',
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
		VMarkdown,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	props: {
		...useRocketLookupDialogProps,
		...useRocketLookupDialogComponentProps
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
			rocketTypes,
			serviceStore,
			filterItemDiameterMax,
			filterItemDiameterMin,
			filterItemDiameterMeasurementUnitId,
			filterItemDiameterMeasurementUnitsId,
			filterItemManufacturers,
			filterItemManufacturerStockId,
			filterItemName,
			filterItemRocketTypes,
			dialogRocketLookup,
			dialogResetManager,
			dialogResetMessage,
			manufacturersI,
			results,
			manufacturers,
			buttonOkDisabledOverride,
			clickRocketSearch,
			clickRocketSearchClear,
			clickRocketSelect,
			close,
			dialogResetOk,
			manufacturer,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		} = useRocketRocketLookupDialogComponent(props, context);

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
			rocketTypes,
			serviceStore,
			filterItemDiameterMax,
			filterItemDiameterMin,
			filterItemDiameterMeasurementUnitId,
			filterItemDiameterMeasurementUnitsId,
			filterItemManufacturers,
			filterItemManufacturerStockId,
			filterItemName,
			filterItemRocketTypes,
			dialogRocketLookup,
			dialogResetManager,
			dialogResetMessage,
			manufacturersI,
			results,
			manufacturers,
			buttonOkDisabledOverride,
			clickRocketSearch,
			clickRocketSearchClear,
			clickRocketSelect,
			close,
			dialogResetOk,
			manufacturer,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(LibraryCommonUtility.cloneDeep(useRocketRocketLookupDialogValidation)));
	}
};
</script>

<style scoped>
</style>
