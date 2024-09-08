<template>
	<VtFormListingDialog
		ref="dialogRocketLookup"
		:label="$t('titles.content.rockets.title')"
		:signal="signal"
		:button-ok-disabled-override="buttonOkDisabledOverride"
		:pre-complete-ok="preCompleteOk"
		:reset-additional="resetAdditional"
		:reset-on-submit="false"
		:validation="validation"
		width="70vh"
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
									<VtTextFieldWithValidation
										ref="filterItemNameRef"
										v-model="filterItemName"
										vid="filterItemName"
										:validation="validation"
										:label="$t('forms.name')"
										:counter="30"
									/>
								</v-col>
								<v-col cols="12" sm="6">
									<VtSelectWithValidation
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
								<!-- <v-col cols="3">
									<VtNumberFieldWithValidation
										ref="filterItemDiameterMinRef"
										v-model="filterItemDiameterMin"
										vid="filterItemDiameterMin"
										:validation="validation"
										:label="$t('forms.content.rockets.diameter.name') + ' ' + $t('forms.content.parts.min.abbr')"
									/>
								</v-col> -->
								<!-- <v-col cols="3">
									<VtNumberFieldWithValidation
										ref="filterItemDiameterMaxRef"
										v-model="filterItemDiameterMax"
										vid="filterItemDiameterMax"
										:validation="validation"
										:label="$t('forms.content.rockets.diameter.name') + ' ' + $t('forms.content.parts.max.abbr')"
									/>
								</v-col> -->
								<v-col cols="12" sm="6">
									<table style="width:100%;">
										<tbody>
											<tr>
												<td>
													<VtNumberFieldWithValidation
														ref="filterItemDiameterMinRef"
														v-model="filterItemDiameterMin"
														vid="filterItemDiameterMin"
														:validation="validation"
														:label="$t('forms.content.rockets.diameter.name') + ' ' + $t('forms.content.parts.min.abbr')"
													/>
												</td>
												<td>
													<VtNumberFieldWithValidation
														ref="filterItemDiameterMaxRef"
														v-model="filterItemDiameterMax"
														vid="filterItemDiameterMax"
														:validation="validation"
														:label="$t('forms.content.rockets.diameter.name') + ' ' + $t('forms.content.parts.max.abbr')"
													/>
												</td>
												<!-- <td class="measurementUnitsMedium">
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
												</td> -->
												<td class="measurementUnitMedium">
													<MeasurementUnitSelect2
														ref="filterItemDiameterMeasurementUnitIdRef"
														v-model="filterItemDiameterMeasurementUnitId"
														vid="filterItemDiameterMeasurementUnitId"
														:measurementUnitsType="measurementUnitsLengthType"
														:validation="validation"
														:label="$t('forms.settings.measurementUnits.length')"
													/>
												</td> 
											</tr>
										</tbody>
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
								:variant="buttonsForms.variant.clear"
								:color="buttonsForms.color.clear"
								:loading="isLoading"
								@click="clickSearchClear"
							>{{ $t('buttons.clear') }}</v-btn>
							<v-btn
								:variant="buttonsForms.variant.ok"
								:color="buttonsForms.color.ok"
								:disabled="buttonOkDisabled"
								:loading="isLoading"
								@click="clickSearch"
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
							<VtMarkdown v-model="item.description" :use-github=false />
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								:variant="buttonsForms.variant.default"
								:color="buttonsForms.color.default"
								@click="clickSelect(item)"
							>
								{{ $t('buttons.select') }}
							</v-btn>
						</v-card-actions>
					</v-card>
				</div>
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
	<VtConfirmationDialog
		ref="dialogSelectConfirmRef"
		:message="dialogSelectConfirmMessage"
		:messageRaw=true
		:signal="dialogSelectConfirmManager.signal"
		@cancel="dialogSelectConfirmCancel"
		@error="dialogSelectConfirmError"
		@ok="dialogSelectConfirmOk"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useRocketLookupDialogComponent } from '@/components/content/rockets/dialogs/rocketLookupDialogComponent';
import { useRocketLookupDialogComponentProps } from '@/components/content/rockets/dialogs/rocketLookupDialogComponentProps';
import { useRocketLookupDialogValidation } from '@/components/content/rockets/dialogs/rocketLookupDialogValidation';
import { useLookupDialogProps } from '@/components/content/dialogs/lookupDialogProps';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormListingDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormListingDialog';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'RocketLookupDialog',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		VtConfirmationDialog,
		VtFormListingDialog,
		VtMarkdown,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useLookupDialogProps,
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
			measurementUnitsFromUnitId,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			rocketTypes,
			dialogSelectConfirmManager,
			dialogSelectConfirmMessage,
			dialogSelectConfirmParams,
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
			results,
			manufacturers,
			buttonOkDisabledOverride,
			clickSearch,
			clickSearchClear,
			clickSelect,
			close,
			dialogResetOk,
			dialogSelectConfirmCancel,
			dialogSelectConfirmError,
			dialogSelectConfirmOk,
			manufacturer,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		} = useRocketLookupDialogComponent(props, context);

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
			measurementUnitsFromUnitId,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			rocketTypes,
			dialogSelectConfirmManager,
			dialogSelectConfirmMessage,
			dialogSelectConfirmParams,
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
			results,
			manufacturers,
			buttonOkDisabledOverride,
			clickSearch,
			clickSearchClear,
			clickSelect,
			close,
			dialogResetOk,
			dialogSelectConfirmCancel,
			dialogSelectConfirmError,
			dialogSelectConfirmOk,
			manufacturer,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(LibraryCommonUtility.cloneDeep(useRocketLookupDialogValidation)));
	}
};
</script>

<style scoped>
</style>
