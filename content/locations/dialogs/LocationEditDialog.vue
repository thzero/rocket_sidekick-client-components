<template>
	<VFormDialog
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
		</div>
		<v-row dense>
			<v-col cols="12" sm="6">
				<VNumberFieldWithValidation
					ref="detailItemNumberRef"
					v-model="detailItemNumber"
					:readonly="!isEditable"
					:label="$t('forms.content.locations.number')"
				/>
			</v-col>
			<v-col cols="12" sm="6">
				<VNumberFieldWithValidation
					ref="detailItemYearRef"
					v-model="detailItemYear"
					:readonly="!isEditable"
					:label="$t('forms.content.locations.year')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="6">
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
			<v-col cols="12" sm="6">
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
				<VSwitch
					ref="detailItemExperimentalRef"
					v-model="detailItemExperimental"
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
	</VFormDialog>
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
import VFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VFormDialog';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'LocationDialog',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		VFormDialog,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
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
			displayName,
			numberOrYear,
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
			displayName,
			numberOrYear,
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
