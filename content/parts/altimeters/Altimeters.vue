<template>
	<Parts
		title="altimeters"
		:type="type"
		:fetch-params="fetchParams"
		:reset-additional-filter="resetAdditionalFilter"
		:validation="validation"
		:debug="debug"
	>
		<template #default="{ detailItem, detailClose, detailError, detailOk, debug }">
			<Altimeter
				:model-value="detailItem"
				@cancel="detailClose"
				@close="detailClose"
				@error="detailError"
				@ok="detailOk"
				:debug="debug"
			>s
			</Altimeter>
		</template>
		<template #panelTitle="{ item }">
			<AltimeterPanelTitle
				:item="item"
				:manufacturers="manufacturers"
			>
			</AltimeterPanelTitle>
		</template> 
		<template #filters>
			<v-row dense>
				<v-col cols="12" sm="6">
					<VTextFieldWithValidation
						ref="detailItemNameRef"
						v-model="detailItemName"
						vid="detailItemName"
						:label="$t('forms.name')"
						:validation="validation"
					/>
				</v-col>
				<v-col cols="6" sm="6">
					<v-radio-group
						v-model="detailItemIsPublic"
						inline
					>
						<v-radio
						:label="$t('forms.content.parts.all')"
							value=""
						></v-radio>
						<v-radio
						:label="$t('forms.content.parts.yours')"
							:value="false"
						></v-radio>
						<v-radio
							:label="$t('forms.content.parts.public')"
							:value="true"
						></v-radio>
					</v-radio-group>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12" sm="6">
					<VSelectWithValidation
						ref="detailItemManufacturersRef"
						v-model="detailItemManufacturers"
						vid="detailItemManufacturers"
						multiple
						:max-values="2"
						:items="manufacturers"
						:validation="validation"
						:label="$t('forms.content.manufacturer.plural')"
						:hint="$t('forms.content.manufacturer.plural_hint')"
					/>
				</v-col>
				<!-- <v-col cols="12" sm="6">
					<VTextFieldWithValidation
						ref="detailItemDiameterRef"
						v-model="detailItemDiameter"
						vid="detailItemDiameter"
						:label="$t('forms.content.parts.diameter')"
						:validation="validation"
					/>
				</v-col> -->
			</v-row>
		</template> 
	</Parts>
</template>

<script>
import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDeploymentBagPartsListingComponent } from '@/components/content/parts/deploymentBags/deploymentBagPartsListingComponent';
import { usePartsListingFilterValidation } from '@/components/content/parts/partsListingFilterValidation';
import { useAltimeterPartsListingFilterValidation } from '@/components/content/parts/altimeters/altimeterPartsListingFilterValidation';

import Altimeter from '@/components/content/parts/part/altimeter/Altimeter';
import AltimeterPanelTitle from '@/components/content/parts/altimeters/AltimeterPanelTitle';
import Parts from '@/components/content/parts/Parts';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'PartsAltimeter',
	components: {
		Altimeter,
		AltimeterPanelTitle,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		Parts,
		VFormControl,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
	},
	setup(props, context, options) {
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
			contentLoadSignal,
			serviceStore,
			sort,
			target,
			debug,
			detailItemDescription,
			detailItemIsPublic,
			detailItemManufacturers,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemWeight,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			manufacturers,
			type,
			fetchParams,
			resetAdditionalFilter,
		} = useDeploymentBagPartsListingComponent(props, context, { 
			type: AppCommonConstants.Rocketry.PartTypes.altimeter
		});

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
			contentLoadSignal,
			serviceStore,
			sort,
			target,
			debug,
			detailItemDescription,
			detailItemIsPublic,
			detailItemManufacturers,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemWeight,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			manufacturers,
			type,
			fetchParams,
			resetAdditionalFilter,
			scope: 'AltimetersFilterControl',
			validation: useVuelidate({ $scope: 'AltimetersFilterControl' })
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(usePartsListingFilterValidation), 
		LibraryCommonUtility.cloneDeep(useAltimeterPartsListingFilterValidation));
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
