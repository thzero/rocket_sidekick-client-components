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
		[[ hasAdminDelete {{ hasAdminDelete }} ]]
		[[ hasAdminEdit {{ hasAdminEdit }} ]]
		[[ hasAdminRoles {{ hasAdminRoles }} ]]
		[[ isLoggedIn {{ isLoggedIn }} ]]
		<!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
		<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
		<!-- <div>[[ detailItemData {{ JSON.stringify(detailItemData) }} ]] </div> -->
	</div>
	<VtFormControl
		ref="formControlRef"
		:validation="validation"
		:button-cancel="isEditable"
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
				<VtTextFieldWithValidation
					ref="nameRef"
					v-model="detailItemName"
					vid="detailItemName"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.name')"
					:maxcount="30"
				/>
			</v-col>
			<v-col cols="12" sm="4">
				<VtSwitchWithValidation
					ref="isPublicRef"
					v-model="detailItemIsPublic"
					vid="detailItemIsPublic"
					:validation="validation"
					:readonly="!isEditable || !hasAdminEdit"
					:label="$t('forms.content.parts.public')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<VtTextAreaWithValidation
					ref="descriptionRef"
					v-model="detailItemDescription"
					vid="detailItemDescription"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.description')"
					:clearable="isEditable"
					:maxcount="1000"
					:rows="detailItemTextRows"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<VtTextFieldWithValidation
					ref="detailItemLinkRef"
					v-model="detailItemLink"
					vid="detailItemLink"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.locations.link')"
					:maxcount="100"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<VtSelectWithValidation
					ref="detailItemOrganizationsRef"
					v-model="detailItemOrganizations"
					vid="detailItemOrganizations"
					multiple
					:max-values="3"
					:items="organizations"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.organizations.plural')"
					:hint="$t('forms.content.organizations.hint')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="8">
				<VtSelectWithValidation
					class="mr-2"
					ref="detailItemRocketTypesRef"
					v-model="detailItemRocketTypes"
					vid="detailItemRocketTypes"
					multiple
					:items="rocketTypes"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.level')"
					:hint="$t('forms.content.rockets.level')"
				/>
			</v-col>
			<v-col cols="12" sm="4">
				<VtSwitchWithValidation
					ref="detailItemExperimentalRef"
					v-model="detailItemExperimental"
					vid="detailItemExperimental"
					:validation="validation"
					:readonly="!isEditable || !hasAdminEdit"
					:label="$t('forms.content.locations.experimental')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<VtTextFieldWithValidation
					v-if="isEditable || (!isEditable && detailItemAddressCity)"
					ref="detailItemAddressCityRef"
					v-model="detailItemAddressCity"
					vid="detailItemAddressCity"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.address.city')"
				/>
			</v-col>
			<v-col cols="12" sm="6">
				<VtTextFieldWithValidation
					v-if="isEditable || (!isEditable && detailItemAddressPostalCode)"
					ref="detailItemAddressPostalCodeRef"
					v-model="detailItemAddressPostalCode"
					vid="detailItemAddressPostalCode"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.address.postalCode')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<VtSelectWithValidation
					v-if="isEditable || (!isEditable && detailItemAddressCountry)"
					ref="detailItemAddressCountryRef"
					v-model="detailItemAddressCountry"
					vid="detailItemAddressCountry"
					:items="countries"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.address.country.title')"
				/>
			</v-col>
			<v-col cols="12" sm="6">
				<VtSelectWithValidation
					v-if="isEditable || (!isEditable && detailItemAddressStateProvince)"
					ref="detailItemAddressStateProvinceRef"
					v-model="detailItemAddressStateProvince"
					vid="detailItemAddressStateProvince"
					:items="stateProvinces"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.address.stateProvince.title')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="6" sm="3">
				<VtNumberFieldWithValidation
					ref="detailItemCoordsLatRef"
					v-model="detailItemCoordsLat"
					vid="detailItemCoordsLat"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.locations.name') + ' ' + $t('forms.content.launches.results.coords.lat')"
				/>
			</v-col>
			<v-col cols="6" sm="3">
				<VtNumberFieldWithValidation
					ref="detailItemCoordsLongRef"
					v-model="detailItemCoordsLong"
					vid="detailItemCoordsLong"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.locations.name') + ' ' + $t('forms.content.launches.results.coords.long')"
				/>
			</v-col>
		</v-row>
		<template v-slot:buttons_pre
			v-if="$vuetify.display.smAndUp"
		>
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
		<template v-slot:buttons_post
			v-if="$vuetify.display.xs"
		>
			<br>
			<v-btn
				v-if="canAddSecondary"
				class="mt-2"
				color="primary"
				@click="handleAddSecondary"
			>
				{{ $t('buttons.add') }} {{ $t('forms.content.locations.iterations.name') }}
			</v-btn>
		</template>
		<template v-slot:after>	
		<!-- [[ {{ panels }} ]] 
		[[ {{ isNew }} ]]  -->
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
						color="primary"
					>
						<div style="width: 100%;">
							<span class="v-card-title pb-0 pl-0 pr-0 pt-0">{{ numberAndYear(item) }}</span>
							<span class="float-right">{{ datesToString(item.dates) }}</span>
						</div>
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<v-row dense>
							<!-- <v-col
								v-if="item.number"
								cols="3" md="4"
							>
								<VtTextField
									v-model="item.number"
									:readonly="true"
									:label="$t('forms.content.locations.number')"
								/>
							</v-col>
							<v-col
								v-if="item.year"
								cols="3" md="4"
							>
								<VtTextField
									v-model="item.year"
									:readonly="true"
									:label="$t('forms.content.locations.year')"
								/>
							</v-col> -->
							<!-- <v-col
								v-if="item.dates"
								cols="6"
							>
								<VtTextField
									v-model="item.datesDisplay"
									:readonly="true"
									:label="$t('forms.content.locations.dates')"
								/>
							</v-col> -->
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
								<VtSelectWithValidation
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
								<VtSelectWithValidation
									v-model="item.organizations"
									:items="organizations"
									:readonly="true"
									:label="$t('forms.content.organizations.plural')"
								/>
							</v-col>
						</v-row>
						<v-row
							v-if="item.address"
							dense
						>
							<v-col cols="6" sm="4">
								<VtTextField
									v-if="item.address.city"
									v-model="item.address.city"
									:readonly="true"
									:label="$t('forms.address.city')"
								/>
							</v-col>
							<v-col cols="6" sm="4">
								<VtSelect
									v-if="item.address.stateProvince"
									v-model="item.address.stateProvince"
									:items="stateProvincesByCountry(item.address.country)"
									:readonly="true"
									:label="$t('forms.address.stateProvince.title')"
								/>
							</v-col>
							<v-col cols="6" sm="4">
								<VtSelect
									v-if="item.address.country"
									v-model="item.address.country"
									:items="countries"
									:readonly="true"
									:label="$t('forms.address.country.title')"
								/>
							</v-col>
							<v-col cols="6" sm="4">
								<VtTextField
									v-if="item.address.postalCode"
									v-model="item.address.postalCode"
									:readonly="true"
									:label="$t('forms.address.postalCode')"
								/>
							</v-col>
						</v-row>
						<v-row
							v-if="item.coordsLat || item.coordsLong"
							dense
						>
							<v-col cols="6" sm="4">
								<VtTextField
									v-if="item.coordsLat"
									v-model="item.coordsLat"
									:readonly="true"
									:label="$t('forms.content.locations.name') + ' ' + $t('forms.content.launches.results.coords.lat')"
								/>
							</v-col>
							<v-col cols="6" sm="4">
								<VtTextField
									v-if="item.coordsLong"
									v-model="item.coordsLong"
									:readonly="true"
									:label="$t('forms.content.locations.name') + ' ' + $t('forms.content.launches.results.coords.long')"
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
							v-if="item.coordsLat !== null && item.coordsLat !== undefined && item.coordsLong !== null && item.coordsLong !== undefined"
							dense
						>
							<v-col>
								<LocationMap
									:id="item.id"
									type="recovery"
									:coords="[ Number(item.coordsLat),  Number(item.coordsLong) ]"
								></LocationMap>
							</v-col>
						</v-row>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</template>
	</VtFormControl>
	<VtConfirmationDialog
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
		:countriesAndStateProvinces="countriesAndStateProvinces"
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
import LocationMap from '@/components/content/locations/location/LocationMap';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'LocationControl',
	components: {
		LocationEditDialog,
		LocationMap,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		VtConfirmationDialog,
		VtFormControl,
		VtNumberFieldWithValidation,
		VtSelect,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextField,
		VtTextFieldWithValidation
	},
	props: {
		...useDetailComponentProps,
		...useLocationComponentProps
	},
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
			organizations,
			hasAdminDelete,
			hasAdminEdit,
			hasAdminRoles,
			isLoggedIn,
			detailItemAddressCity,
			detailItemAddressCountry,
			detailItemAddressPostalCode,
			detailItemAddressStateProvince,
			detailItemCoordsLat,
			detailItemCoordsLong,
			detailItemDescription,
			detailItemExperimental,
			detailItemIsPublic,
			detailItemLink,
			detailItemName,
			detailItemOrganizations,
			detailItemRocketTypes,
			countries,
			countriesAndStateProvinces,
			hasAdmin,
			iterations,
			stateProvinces,
			panels,
			datesToString,
			numberAndYear,
			numberOrYearOrName,
			panelsUpdated,
			stateProvincesByCountry,
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
			organizations,
			hasAdminDelete,
			hasAdminEdit,
			hasAdminRoles,
			isLoggedIn,
			detailItemAddressCity,
			detailItemAddressCountry,
			detailItemAddressPostalCode,
			detailItemAddressStateProvince,
			detailItemCoordsLat,
			detailItemCoordsLong,
			detailItemDescription,
			detailItemExperimental,
			detailItemIsPublic,
			detailItemLink,
			detailItemName,
			detailItemOrganizations,
			detailItemRocketTypes,
			countries,
			countriesAndStateProvinces,
			hasAdmin,
			iterations,
			stateProvinces,
			panels,
			datesToString,
			numberAndYear,
			numberOrYearOrName,
			panelsUpdated,
			stateProvincesByCountry,
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