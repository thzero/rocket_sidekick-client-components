<template>
	<VFormListingDialog
		ref="dialogRecoveryLookup"
		:label="$t('titles.external.recoverySearch')"
		:signal="signal"
		:button-ok-disabled-override="buttonOkDisabledOverride"
		:pre-complete-ok="preCompleteOk"
		:reset-additional="resetAdditional"
		:reset-on-submit="false"
		:validation="validation"
		max-width="70vh"
		@close="close"
	>
		<template #default="{ buttonOkDisabled, isLoading }">
			<v-row dense>
				<v-col cols="12">
					<v-card>
						<v-card-text>
							<v-row dense>
								<v-col cols="12" class="text-center text-h7 pb-2">
									{{ $t('recoverySearch.guidance') }} <a target="_blank" :href="$t(searchUrl)">{{ $t(searchLocaleName) }}</a>{{ $t('recoverySearch.guidance3') }}
								</v-col>
							</v-row>
							<v-row dense>
								<v-col cols="12" sm="6">
									<VTextFieldWithValidation
										ref="n"nameRef
										v-model="name"
										vid="name"
										:validation="validation"
										:label="$t('forms.name')"
										:counter="30"
									/>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col cols="5" md="2">
									<VNumberFieldWithValidation
										ref="diameterRef"
										v-model="diameter"
										vid="diameterr"
										:validation="validation"
										:readonly="!isEditable"
										:label="$t('forms.content.rockets.diameter.name')"
									/>
								</v-col>
								<v-col cols="7" md="4">
									<table>
										<tr>
											<td class="measurementUnits">
												<MeasurementUnitsSelect
													ref="diameterMeasurementUnitsIdRef"
													v-model="diameterMeasurementUnitsId"
													vid="diameterMeasurementUnitsId"
													:validation="validation"
													:readonly="!isEditable"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnits">
												<MeasurementUnitSelect
													ref="diameterMeasurementUnitIdRef"
													v-model="diameterMeasurementUnitId"
													vid="diameterMeasurementUnitId"
													:measurementUnitsId="diameterMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:readonly="!isEditable"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td>
										</tr>
									</table>
								</v-col>
								<v-col cols="5" md="2">
									<VNumberFieldWithValidation
										ref="lengthRef"
										v-model="length"
										vid="length"
										:validation="validation"
										:readonly="!isEditable"
										:label="$t('forms.content.parts.length')"
									/>
								</v-col>
								<v-col cols="7" md="4">
									<table>
										<tr>
											<td class="measurementUnits">
												<MeasurementUnitsSelect
													ref="lengthMeasurementUnitsIdRef"
													v-model="lengthMeasurementUnitsId"
													vid="lengthMeasurementUnitsId"
													:validation="validation"
													:readonly="!isEditable"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnits">
												<MeasurementUnitSelect
													ref="lengthMeasurementUnitIdRef"
													v-model="lengthMeasurementUnitId"
													vid="lengthMeasurementUnitId"
													:measurementUnitsId="lengthMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:readonly="!isEditable"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td>
										</tr>
									</table>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col cols="12" sm="6">
									<v-checkbox
										v-model="singleUse"
										density="compact"
										:label="$t('forms.external.recoverySearch.singleUse')"
									/>
								</v-col>
								<v-col cols="12" sm="6">
									<v-checkbox
										v-model="sparky"
										density="compact"
										:label="$t('forms.external.recoverySearch.sparky')"
									/>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col col="12">
									<VSelectWithValidation
										ref="manufacturerRef"
										v-model="manufacturer"
										vid="manufacturer"
										multiple
										:max-values="2"
										:items="manufacturers"
										:validation="validation"
										:label="$t('forms.external.recoverySearch.manufacturer')"
										:hint="$t('forms.external.recoverySearch.manufacturer_hint')"
									/>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col col="12">
									<VTextFieldWithValidation
										ref="recoveryRef"
										v-model="recovery"
										vid="recovery"
										:validation="validation"
										:label="$t('forms.external.recoverySearch.recovery')"
										:hint="$t('forms.external.recoverySearch.recovery_hint')"
									/>
								</v-col>
							</v-row>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn
								variant="flat"
								color="primary"
								:loading="isLoading"
								@click="clickRecoverySearchClear"
							>{{ $t('buttons.clear') }}</v-btn>
							<v-btn
								variant="flat"
								color="green"
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
				<div
					class="col-12 q-mb-sm"
					v-for="item in results" :key="item.recoveryId"
				>
					<table style="width: 100%;">
						<tr>
							<td colspan="2" class="text-left text-h6 text-bold">{{ item.manufacturer }} {{ item.commonName }} {{ item.sparky ? '(' + $t('recoverySearch.sparky') +  ')' : '' }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold" style="width: 30%">{{ $t('recoverySearch.recovery_designation') }}</td><td>{{ item.designation }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold">{{ $t('recoverySearch.recovery_diameter') }}</td><td>{{ item.diameter }}{{ $t('recoverySearch.recovery_diameter_measurement') }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold">{{ $t('recoverySearch.recovery_caseInfo') }}</td><td>{{ recoveryCaseInfo(item) }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold">{{ $t('recoverySearch.recovery_thrust_average') }}</td><td>{{ item.avgThrustN }} {{ item.recovery_thrust_newtons_abbr }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold">{{ $t('recoverySearch.recovery_thrust_max') }}</td><td>{{ item.maxThrustN }} {{ item.recovery_thrust_newtons_abbr }}</td>
						</tr>
						<tr>
							<td colspan="2" class="text-left"><a :href="recoveryUrl(item)" target="_blank">{{ recoveryUrl(item) }}</a></td>
						</tr>
						<tr
							v-if="selectable"
						>
							<td colspan="2" class="text-right">
								<v-btn
									variant="flat"
									color="primary"
									density="compact"
									@click="clickRecoverySelect(item)"
								>{{ $t('buttons.select') }}</v-btn>
							</td>
						</tr>
					</table>
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
import { useRocketEditValidation } from '@/components/content/rockets/user/rocket/rocketEditValidation';
import { useRecoveryLookupDialogComponent } from '@/components/content/rockets/user/dialogs/recovery/recoveryLookupDialogComponent';
import { useRecoveryLookupDialogProps } from '@/components/content/rockets/user/dialogs/recovery/recoveryLookupDialogProps';

import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VFormListingDialog from '@thzero/library_client_vue3_vuetify3/components/form/VFormListingDialog';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'RecoveryLookupDialog',
	components: {
		VConfirmationDialog,
		VFormListingDialog,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	props: {
		...useRecoveryLookupDialogProps
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
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			serviceStore,
			dialogRecoveryLookup,
			dialogResetMessage,
			dialogResetManager,
			diameter,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			length,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			manufacturer,
			manufacturerStockId,
			manufacturers,
			name,
			results,
			thinNill,
			buttonOkDisabledOverride,
			clickRecoverySearch,
			clickRecoverySearchClear,
			clickRecoverySelect,
			close,
			dialogResetOk,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		} = useRecoveryLookupDialogComponent(props, context);

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
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			serviceStore,
			dialogRecoveryLookup,
			dialogResetMessage,
			dialogResetManager,
			diameter,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			length,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			manufacturer,
			manufacturerStockId,
			manufacturers,
			name,
			results,
			thinNill,
			buttonOkDisabledOverride,
			clickRecoverySearch,
			clickRecoverySearchClear,
			clickRecoverySelect,
			close,
			dialogResetOk,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		};
	},
	validations () {
		return LibraryCommonUtility.cloneDeep(useRocketEditValidation(false));
	}
};
</script>

<style scoped>
</style>
