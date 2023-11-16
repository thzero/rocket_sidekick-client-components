<template>
	<VtFormDialog
		:label="$t('titles.edit') + ' ' + displayName"
		:signal="signal"
		:pre-complete-ok="preCompleteOk"
		:reset-additional="resetAdditional"
		:set-additional="setAdditional"
		:validation="validation"
		button-clear-name="buttons.reset"
		:debug="debug"
		width="80vh"
		max-width="90vh"
		@close="dialogClose"
		@error="dialogError"
		@ok="dialogOk"
	>
		<div
			v-if="debug"
			class="text-center"
		>
			isEditable: {{ isEditable }} readonly: {{ readonly }}
			<!-- {{  countries }}
			{{  states }} -->
			detailItemAddressStateProvince {{  detailItemAddressStateProvince }}
		</div>
		<v-row dense>
			<v-col cols="12" sm="6">
				<VtNumberFieldWithValidation
					ref="detailItemNumberRef"
					v-model="detailItemNumber"
					vid="detailItemNumber"
					:readonly="!isEditable"
					:validation="validation"
					:label="$t('forms.content.locations.number')"
				/>
			</v-col>
			<v-col cols="12" sm="6">
				<VtNumberFieldWithValidation
					ref="detailItemYearRef"
					v-model="detailItemYear"
					vid="detailItemYear"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.locations.year')"
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
					:label="$t('forms.content.locations.experimental')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<VtTextFieldWithValidation
					ref="detailItemAddressCityRef"
					v-model="detailItemAddressCity"
					vid="detailItemAddressCity"
					:validation="validation"
					:label="$t('forms.address.city')"
				/>
			</v-col>
			<v-col cols="12" sm="6">
				<VtTextFieldWithValidation
					ref="detailItemAddressPostalCodeRef"
					v-model="detailItemAddressPostalCode"
					vid="detailItemAddressPostalCode"
					:validation="validation"
					:label="$t('forms.address.postalCode')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
				<VtSelectWithValidation
					ref="detailItemAddressCountryRef"
					v-model="detailItemAddressCountry"
					vid="detailItemAddressCountry"
					:items="countries"
					:validation="validation"
					:label="$t('forms.address.country.title')"
				/>
			</v-col>
			<v-col cols="12" sm="6">
				<VtSelectWithValidation
					ref="detailItemAddressStateProvinceRef"
					v-model="detailItemAddressStateProvince"
					vid="detailItemAddressStateProvince"
					:items="states"
					:validation="validation"
					:label="$t('forms.address.stateProvince.title')"
				/>
			</v-col>
		</v-row>
	</VtFormDialog>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailFormDialogProps } from '@/components/content/detailFormDialogProps';
import { useLocationAddressEditValidation } from '@/components/content/locations/location/locationAddressEditValidation';
import { useLocationEditDialogComponent } from '@/components/content/locations/dialogs/locationEditDialogComponent';
import { useLocationEditDialogValidation } from '@/components/content/locations/dialogs/locationEditDialogValidation';
import { useLocationEditDialogComponentProps } from '@/components/content/locations/dialogs/locationEditDialogComponentProps';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'LocationDialog',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		VtFormDialog,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useDetailFormDialogProps,
		...useLocationEditDialogComponentProps
	},
	emits: ['close', 'error', 'ok'],
	setup (props, context) {
		const {
			detailItem,
			detailItemTextRows,
			dialogError,
			dialogClose,
			dialogOk,
			isEditable,
			rocketTypes,
			organizations,
			organizationName,
			organizationNames,
			detailItemAddressCity,
			detailItemAddressCountry,
			detailItemAddressPostalCode,
			detailItemAddressStateProvince,
			detailItemExperimental,
			detailItemNumber,
			detailItemOrganizations,
			detailItemRocketTypes,
			detailItemYear,
			resetEditData,
			setEditData,
			countries,
			displayName,
			numberOrYear,
			states,
			preCompleteOk,
			resetAdditional,
			setAdditional,
			scope,
			validation
		} = useLocationEditDialogComponent(props, context);

		return {
			detailItem,
			detailItemTextRows,
			dialogError,
			dialogClose,
			dialogOk,
			isEditable,
			rocketTypes,
			organizations,
			organizationName,
			organizationNames,
			detailItemAddressCity,
			detailItemAddressCountry,
			detailItemAddressPostalCode,
			detailItemAddressStateProvince,
			detailItemExperimental,
			detailItemNumber,
			detailItemOrganizations,
			detailItemRocketTypes,
			detailItemYear,
			resetEditData,
			setEditData,
			countries,
			displayName,
			numberOrYear,
			states,
			preCompleteOk,
			resetAdditional,
			setAdditional,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useLocationEditDialogValidation), LibraryCommonUtility.cloneDeep(useLocationAddressEditValidation));
	}
};
</script>

<style scoped>
</style>
