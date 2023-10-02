<template>
	<div
		v-if="debug"
	>
		[[ invalid {{ invalid }} ]]
		[[ dirty {{ dirty }} ]]
		[[ isEditable {{ isEditable }} ]]
		[[ isNew {{ isNew }} ]]
		[[ canAddSecondary {{ canAddSecondary }} ]]
		[[ canDeleteSecondary {{ canDeleteSecondary }} ]]
		[[ canEditSecondary {{ canEditSecondary }} ]]
		<!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
		<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
		<!-- <div>[[ detailItemData {{ JSON.stringify(detailItemData) }} ]] </div> -->
	</div>
	<VFormControl
		ref="formControlRef"
		:validation="validation"
		:button-close="true"
		:button-clear="isEditable"
		button-clear-name="buttons.reset"
		:button-delete="false"
		:button-ok="isEditable"
		:dirty-callback="dirtyCallback"
		:invalid-callback="invalidCallback"
		:readonly="!isEditable "
		:reset-additional="resetAdditional"
		:pre-complete-ok="preCompleteOk"
		@cancel="handleCancel"
		@ok="handleOk"
		:debug="debug"
	>
		<v-row dense>
			<v-col cols="12" sm="8">
				<VTextFieldWithValidation
					ref="nameRef"
					v-model="detailItemName"
					vid="detailItemName"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.name')"
					:counter="30"
				/>
			</v-col>
			<v-col cols="12" sm="4">
				<VSelectWithValidation
					ref="detailItemOrganizationsRef"
					v-model="detailItemOrganizations"
					vid="detailItemOrganizations"
					multiple
					:max-values="3"
					:items="organizations"
					:validation="validation"
					:label="$t('forms.content.organizations.plural')"
					:hint="$t('forms.content.organizations.hint')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VTextAreaWithValidation
					ref="descriptionRef"
					v-model="detailItemDescription"
					vid="detailItemDescription"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.description')"
					:counter="30"
					:clearable="isEditable"
					:rows="detailItemTextRows"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VSelectWithValidation
					ref="detailItemRocketTypesRef"
					v-model="detailItemRocketTypes"
					vid="detailItemRocketTypes"
					multiple
					:max-values="3"
					:items="rocketTypes"
					:validation="validation"
					:label="$t('forms.content.rockets.level')"
					:hint="$t('forms.content.rockets.level')"
				/>
			</v-col>
			<v-col>
				<VSwitchWithValidation
					ref="detailItemExperimentalRef"
					v-model="detailItemExperimental"
					:validation="validation"
					:label="$t('forms.content.locations.experimental')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VTextFieldWithValidation
					ref="detailItemAddressCityRef"
					vid="detailItemAddressCity"
					v-model="detailItemAddressCity"
					:validation="validation"
					:label="$t('forms.address.city')"
				/>
			</v-col>
			<v-col>
				<VTextFieldWithValidation
					ref="detailItemAddressPostalCodeRef"
					vid="detailItemAddressPostalCode"
					v-model="detailItemAddressPostalCode"
					:validation="validation"
					:label="$t('forms.address.postalCode')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VSelectWithValidation
					ref="detailItemAddressCountryRef"
					v-model="detailItemAddressCountry"
					vid="detailItemAddressCountry"
					:items="countries"
					:validation="validation"
					:label="$t('forms.address.country.title')"
				/>
			</v-col>
			<v-col>
				<VSelectWithValidation
					ref="detailItemAddressStateProvinceRef"
					v-model="detailItemAddressStateProvince"
					vid="detailItemAddressStateProvince"
					:items="states"
					:validation="validation"
					:label="$t('forms.address.stateProvince.title')"
				/>
			</v-col>
		</v-row>
		<template v-slot:buttons_pre>
			<v-btn
				v-if="canAddSecondary"
				class="mr-2"
				color="primary"
				@click="handleAddSecondary"
			>
				{{ $t('buttons.add') }} {{ $t('forms.content.locations.iterations.name') }}
			</v-btn>
			<span
				v-if="canAddSecondary"
				class="mr-2"
			>|</span>
		</template>
		<template v-slot:buttons_post>
		</template>
		<template v-slot:after>	
		[[ {{ panels }} ]] 
		[[ {{ isNew }} ]] 
			<v-expansion-panels
				v-if="!isNew"
				v-model="panels"
				class="mt-4"
				multiple
				@update:modelValue="panelsUpdated"
			>
				<v-expansion-panel
					v-for="item in iterations" 
					:key="item.id"
					:value="item.id"
				>
					<v-expansion-panel-title
						color="secondary"
					>
						{{ numberOrYear(item) }}
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<v-row dense>
							<v-col
								v-if="item.number"
								cols="6"
							>
								<VTextField
									v-model="item.number"
									:readonly="true"
									:label="$t('forms.content.locations.number')"
								/>
								<!-- <v-row dense>
									<v-col cols="4" sm="2">
										{{ $t('forms.content.locations.number') }}
									</v-col>
									<v-col cols="8" sm="10">
										{{ item.number }}
									</v-col>
								</v-row> -->
							</v-col>
							<v-col
								v-if="item.year"
								cols="6"
							>
								<VTextField
									v-model="item.year"
									:readonly="true"
									:label="$t('forms.content.locations.year')"
								/>
								<!-- <v-row dense>
									<v-col cols="4" sm="2">
										{{ $t('forms.content.locations.year') }}
									</v-col>
									<v-col cols="8" sm="10">
										{{ item.year }}
									</v-col>
								</v-row> -->
							</v-col>
							<v-col
								v-if="item.experimental"
								cols="6"
							>
								<VSwitch
									v-model="item.experimental"
									:readonly="true"
									:label="$t('forms.content.locations.experimental')"
								/>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col
								v-if="item.rocketTypes"
								cols="6"
							>
								<VSelectWithValidation
									v-model="item.rocketTypes"
									:items="rocketTypes"
									:readonly="true"
									:label="$t('forms.content.rockets.level')"
								/>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col
								v-if="item.organizations"
								cols="6"
							>
								<VSelectWithValidation
									v-model="item.organizations"
									:items="organizations"
									:readonly="true"
									:label="$t('forms.content.organizations.plural')"
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
										class="pl-4 pr-4 pb-2"
									>
										<v-btn
											v-if="isEditable && !item.primary"
											:variant="buttonsForms.variant.delete"
											:color="buttonsForms.color.delete"
											class="mr-2"
											:disabled="isDeletingSecondary(item)"
											@click="dialogDeleteSecondaryOpen(item)"
										>
											{{ $t('buttons.delete') }}
										</v-btn>
										<v-btn
											v-if="isEditable"
											:variant="buttonsForms.variant.edit"
											:color="buttonsForms.color.edit"
											:disabled="isEditingSecondary(item)"
											@click="dialogEditSecondaryOpen(item)"
										>
											{{ $t('buttons.edit') }}
										</v-btn>
									</div>
								</div>
							</v-col>
						</v-row>
						<v-row
							v-if="item.address"
							dense
						>
							<v-col cols="6" sm="4">
								<VTextField
									v-model="item.address.city"
									:readonly="true"
									:label="$t('forms.address.city')"
								/>
							</v-col>
							<v-col cols="6" sm="4">
								<VSelect
									v-model="item.address.state"
									:items="states"
									:readonly="true"
									:label="$t('forms.address.stateProvince.title')"
								/>
							</v-col>
							<v-col cols="6" sm="4">
								<VSelect
									v-model="item.address.country"
									:items="countries"
									:readonly="true"
									:label="$t('forms.address.country.title')"
								/>
							</v-col>
							<v-col cols="6" sm="4">
								<VTextField
									v-model="item.address.postalCode"
									:readonly="true"
									:label="$t('forms.address.postalCode')"
								/>
							</v-col>
						</v-row>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</template>
	</VFormControl>
	<VConfirmationDialog
		ref="dialogDeleteSecondaryRef"
		:message="dialogDeleteSecondaryMessage"
		:messageRaw=true
		:signal="dialogDeleteSecondaryManager.signal"
		@cancel="dialogDeleteSecondaryCancel"
		@error="dialogDeleteSecondaryError"
		@ok="dialogDeleteSecondaryOk"
	/>
	<LocationEditDialog
		v-if="!readonly"
		ref="dialogEditSecondaryRef"
		:debug="debug"
		:pre-complete-ok="dialogEditSecondaryPreCompleteOk"
		:value="dialogEditSecondaryParams"
		:signal="dialogEditSecondaryManager.signal"
		@close="dialogEditSecondaryCancel"
		@ok="dialogEditSecondaryOk"
		width="90%"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useLocationAddressEditValidation } from '@/components/content/locations/location/locationAddressEditValidation';
import { useLocationEditValidation } from '@/components/content/locations/location/locationEditValidation';
import { useLocationComponent } from '@/components/content/locations/location/locationComponent';
import { useLocationComponentProps } from '@/components/content/locations/location/locationComponentProps';

import LocationEditDialog from '@/components/content/locations/dialogs/LocationEditDialog';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextField from '@thzero/library_client_vue3_vuetify3/components/form/VTextField';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'LocationControl',
	components: {
		LocationEditDialog,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		VConfirmationDialog,
		VFormControl,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextField,
		VTextFieldWithValidation
	},
	props: {
		...useDetailComponentProps,
		...useLocationComponentProps
	},
	emits: ['cancel', 'close', 'error', 'ok'],
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
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			serviceStore,
			formControlRef,
			dirty,
			detailItem,
			dialogDeleteManager,
			dialogDeleteMessage,
			dialogDeleteParams,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isDeleting,
			isEditable,
			isNew,
			isOwner,
			dialogDeleteCancel,
			dialogDeleteError,
			dialogDeleteOk,
			dialogDeleteOpen,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			preCompleteOk,
			resetAdditional,
			dialogDeleteSecondaryManager,
			dialogDeleteSecondaryMessage,
			dialogDeleteSecondaryParams,
			dialogEditSecondaryManager,
			dialogEditSecondaryParams,
			canAddSecondary,
			canDeleteSecondary,
			canEditSecondary,
			isDeletingSecondary,
			isEditingSecondary,
			dialogDeleteSecondaryCancel,
			dialogDeleteSecondaryError,
			dialogDeleteSecondaryOk,
			dialogDeleteSecondaryOpen,
			dialogEditSecondaryCancel,
			dialogEditSecondaryError,
			dialogEditSecondaryOk,
			dialogEditSecondaryOpen,
			dialogEditSecondaryPreCompleteOk,
			handleAddSecondary,
			rocketTypes,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			organizations,
			detailItemAddressCity,
			detailItemAddressCountry,
			detailItemAddressPostalCode,
			detailItemAddressStateProvince,
			detailItemDescription,
			detailItemExperimental,
			detailItemName,
			detailItemOrganizations,
			detailItemRocketTypes,
			countries,
			hasAdmin,
			iterations,
			states,
			panels,
			numberOrYear,
			panelsUpdated,
			updateIteration,
			scope,
			validation
		} = useLocationComponent(props, context, options);

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
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			serviceStore,
			formControlRef,
			dirty,
			detailItem,
			dialogDeleteManager,
			dialogDeleteMessage,
			dialogDeleteParams,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isDeleting,
			isEditable,
			isNew,
			isOwner,
			dialogDeleteCancel,
			dialogDeleteError,
			dialogDeleteOk,
			dialogDeleteOpen,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			preCompleteOk,
			resetAdditional,
			dialogDeleteSecondaryManager,
			dialogDeleteSecondaryMessage,
			dialogDeleteSecondaryParams,
			dialogEditSecondaryManager,
			dialogEditSecondaryParams,
			canAddSecondary,
			canDeleteSecondary,
			canEditSecondary,
			isDeletingSecondary,
			isEditingSecondary,
			dialogDeleteSecondaryCancel,
			dialogDeleteSecondaryError,
			dialogDeleteSecondaryOk,
			dialogDeleteSecondaryOpen,
			dialogEditSecondaryCancel,
			dialogEditSecondaryError,
			dialogEditSecondaryOk,
			dialogEditSecondaryOpen,
			dialogEditSecondaryPreCompleteOk,
			handleAddSecondary,
			rocketTypes,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			organizations,
			detailItemAddressCity,
			detailItemAddressCountry,
			detailItemAddressPostalCode,
			detailItemAddressStateProvince,
			detailItemDescription,
			detailItemExperimental,
			detailItemName,
			detailItemOrganizations,
			detailItemRocketTypes,
			countries,
			hasAdmin,
			iterations,
			states,
			panels,
			numberOrYear,
			panelsUpdated,
			updateIteration,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useLocationEditValidation(true)), LibraryCommonUtility.cloneDeep(useLocationAddressEditValidation));
	}
};
</script>

<style>
</style>