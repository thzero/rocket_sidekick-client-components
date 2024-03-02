<template>
	<VtFormListingDialog
		ref="dialogRocketSetupLookup"
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
							<span
								v-if="item.name"
							>
								{{ item.name }}
							</span>
							<span
								v-if="!item.name"
							>
								{{ rocketMotorNamesByStage(item, 0) }}
							</span>
						</v-card-title>
						<v-card-text>
							<VtMarkdown v-model="item.description" :use-github=false />
							<v-sheet
								class="pt-2 pb-2 mt-2"
							>
								<h3>{{ $t('strings.content.rockets.motors') }}</h3>
								<v-divider></v-divider>
							</v-sheet>
							{{ rocketMotorNames(item) }}
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
		ref="dialogSelectRocketConfirmRef"
		:message="dialogSelectMessage"
		:messageRaw=true
		:signal="dialogSelectManager.signal"
		@cancel="dialogSelectCancel"
		@error="dialogSelectError"
		@ok="dialogSelectOk"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useRocketSetupLookupDialogComponent } from '@/components/content/rockets/dialogs/rocketSetupLookupDialogComponent';
import { useRocketSetupLookupDialogComponentProps } from '@/components/content/rockets/dialogs/rocketSetupLookupDialogComponentProps';
import { useRocketSetupLookupDialogValidation } from '@/components/content/rockets/dialogs/rocketSetupLookupDialogValidation';
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
	name: 'RocketSetupLookupDialog',
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
		...useRocketSetupLookupDialogComponentProps
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
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			rocketTypes,
			rocketMotorNames,
			rocketMotorNamesByStage,
			dialogSelectManager,
			dialogSelectMessage,
			dialogSelectParams,
			filterItemName,
			dialogResetManager,
			dialogResetMessage,
			dialogRocketSetupLookup,
			results,
			buttonOkDisabledOverride,
			clickSearch,
			clickSearchClear,
			clickSelect,
			close,
			dialogResetOk,
			dialogSelectCancel,
			dialogSelectError,
			dialogSelectOk,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		} = useRocketSetupLookupDialogComponent(props, context);

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
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			rocketTypes,
			rocketMotorNames,
			rocketMotorNamesByStage,
			dialogSelectManager,
			dialogSelectMessage,
			dialogSelectParams,
			filterItemName,
			dialogResetManager,
			dialogResetMessage,
			dialogRocketSetupLookup,
			results,
			buttonOkDisabledOverride,
			clickSearch,
			clickSearchClear,
			clickSelect,
			close,
			dialogResetOk,
			dialogSelectCancel,
			dialogSelectError,
			dialogSelectOk,
			preCompleteOk,
			resetAdditional,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(LibraryCommonUtility.cloneDeep(useRocketSetupLookupDialogValidation)));
	}
};
</script>

<style scoped>
</style>
