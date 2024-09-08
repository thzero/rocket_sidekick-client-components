<template>
	<VtFormListingDialog
		ref="dialogMotorLookup"
		:label="$t('titles.external.motorSearch')"
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
									{{ $t('forms.external.motorSearch.guidance') }} <a target="_blank" :href="$t(searchUrl)">{{ $t(searchLocaleName) }}</a>{{ $t('forms.external.motorSearch.guidance3') }}
								</v-col>
							</v-row>
							<v-row dense>
								<v-col cols="12" sm="6">
									<VtSelectWithValidation
										ref="filterItemImpulseClassRef"
										v-model="filterItemImpulseClass"
										vid="filterItemImpulseClass"
										:items="motorImpulseClassesNonBlank"
										multiple
										:validation="validation"
										:label="$t('forms.external.motorSearch.impulseClass')"
									/>
								</v-col>
								<v-col cols="12" sm="6">
									<VtSelectWithValidation
										ref="filterItemDiameterRef"
										v-model="filterItemDiameter"
										vid="filterItemDiameter"
										:items="motorMountDiameters"
										:validation="validation"
										:label="$t('forms.external.motorSearch.diameter')"
									/>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col cols="6">
									<v-checkbox
										ref="filterItemSingleUseRef"
										v-model="filterItemSingleUse"
										density="compact"
										:label="$t('forms.external.motorSearch.singleUse')"
									/>
								</v-col>
								<v-col cols="6">
									<v-checkbox
										ref="filterItemSparkyRef"
										v-model="filterItemSparky"
										density="compact"
										:label="$t('forms.external.motorSearch.sparky')"
									/>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col col="12">
									<VtSelectWithValidation
										ref="filterItemManufacturersRef"
										v-model="filterItemManufacturers"
										vid="filterItemManufacturers"
										multiple
										:max-values="2"
										:items="manufacturers"
										:validation="validation"
										:label="$t('forms.external.motorSearch.manufacturer')"
										:hint="$t('forms.external.motorSearch.manufacturer_hint')"
									/>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col col="12">
									<VtTextFieldWithValidation
										ref="filterItemMotorRef"
										v-model="filterItemMotor"
										vid="filterItemMotor"
										:validation="validation"
										:label="$t('forms.external.motorSearch.motor')"
										:hint="$t('forms.external.motorSearch.motor_hint')"
									/>
								</v-col>
							</v-row>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn
								:variant="buttonsForms.variant.clear"
								:color="buttonsForms.color.clear"
								:label="$t('buttons.reset')"
								:disabled="buttonMotorSearchResetDisabled"
								:loading="isLoading"
								@click="clickMotorSearchReset"
							>{{ $t('buttons.reset') }}</v-btn>
							<v-btn
								:variant="buttonsForms.variant.clear"
								:color="buttonsForms.color.clear"
								:loading="isLoading"
								@click="clickMotorSearchClear"
							>{{ $t('buttons.clear') }}</v-btn>
							<v-btn
								:variant="buttonsForms.variant.ok"
								:color="buttonsForms.color.ok"
								:disabled="buttonOkDisabled"
								:loading="isLoading"
								@click="clickMotorSearch"
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
				<v-card
					v-for="(item, index) in results" 
					:key="index"
					color="grey-darken-3"
					class="mb-4"
				>
					<v-card-title class="d-flex">
						<span class="text-left text-h6 text-bold">{{ item.manufacturer }} {{ item.commonName }} {{ item.sparky ? '(' + $t('forms.external.motorSearch.sparky') +  ')' : '' }}</span>
					</v-card-title>
					<v-card-text>
						<table style="width: 100%;">
							<tbody>
								<tr>
									<td class="text-h7 text-bold" style="width: 30%">{{ $t('forms.external.motorSearch.designation') }}</td><td>{{ item.designation }}</td>
								</tr>
								<tr>
									<td class="text-h7 text-bold">{{ $t('forms.external.motorSearch.diameter') }}</td><td>{{ item.diameter }}{{ $t('forms.external.motorSearch.diameter_measurement') }}</td>
								</tr>
								<tr>
									<td class="text-h7 text-bold">{{ $t('forms.external.motorSearch.motorCase') }}</td><td>{{ motorCaseInfo(item) }}</td>
								</tr>
								<tr>
									<td class="text-h7 text-bold">{{ $t('forms.external.motorSearch.thrust_average') }}</td><td>{{ item.avgThrustN }} {{ item.motor_thrust_newtons_abbr }}</td>
								</tr>
								<tr>
									<td class="text-h7 text-bold">{{ $t('forms.external.motorSearch.thrust_max') }}</td><td>{{ item.maxThrustN }} {{ item.motor_thrust_newtons_abbr }}</td>
								</tr>
								<tr>
									<td colspan="2" class="text-left"><a :href="motorUrl(item)" target="_blank">{{ motorUrl(item) }}</a></td>
								</tr>
							</tbody>
						</table>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							:color="buttonsForms.color.default"
							density="compact"
							@click="clickMotorSelect(item)"
						>
							{{ $t('buttons.select') }}
						</v-btn>
					</v-card-actions>
				</v-card>
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
import { useMotorLookupDialogComponent } from '@/components/external/motorLookupDialogComponent';
import { useMotorLookupDialogProps } from '@/components/external/motorLookupDialogProps';
import { useMotorLookupDialogValidation } from '@/components/external/motorLookupDialogValidation';

import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormListingDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormListingDialog';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'MotorLookupDialog',
	components: {
		VtConfirmationDialog,
		VtFormListingDialog,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useMotorLookupDialogProps
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
			buttonsDialog,
			buttonsForms,
			motorMountDiameters,
			motorImpulseClassesNonBlank,
			motorCaseInfo,
			motorUrl,
			serviceMotors,
			serviceStore,
			dialogMotorLookup,
			dialogResetMessage,
			dialogResetManager,
			filterItemDiameter,
			filterItemImpulseClass,
			filterItemManufacturers,
			filterItemMotor,
			filterItemSparky,
			filterItemSingleUse,
			manufacturers,
			results,
			buttonMotorSearchResetDisabled,
			searchLocaleName,
			searchUrl,
			buttonOkDisabledOverride,
			clickMotorSearch,
			clickMotorSearchClear,
			clickMotorSearchReset,
			clickMotorSelect,
			close,
			dialogResetOk,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		} = useMotorLookupDialogComponent(props, context);

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
			buttonsDialog,
			buttonsForms,
			motorMountDiameters,
			motorImpulseClassesNonBlank,
			motorCaseInfo,
			motorUrl,
			serviceMotors,
			serviceStore,
			dialogMotorLookup,
			dialogResetMessage,
			dialogResetManager,
			filterItemDiameter,
			filterItemImpulseClass,
			filterItemManufacturers,
			filterItemMotor,
			filterItemSparky,
			filterItemSingleUse,
			manufacturers,
			results,
			buttonMotorSearchResetDisabled,
			searchLocaleName,
			searchUrl,
			buttonOkDisabledOverride,
			clickMotorSearch,
			clickMotorSearchClear,
			clickMotorSearchReset,
			clickMotorSelect,
			close,
			dialogResetOk,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		};
	},
	validations () {
		return useMotorLookupDialogValidation(this);
	}
};
</script>

<style scoped>
</style>
