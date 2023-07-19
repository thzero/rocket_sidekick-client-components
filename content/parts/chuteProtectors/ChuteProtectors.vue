<template>
	<Parts
		title="chuteProtectors"
		:type="type"
		:fetch-params="fetchParams"
		:reset-additional-filter="resetAdditionalFilter"
		:validation="validation"
		:debug="debug"
	>
		<template #default="{ detailItem, detailClose, detailError, detailOk, debug }">
			<ChuteProtector
				:model-value="detailItem"
				@cancel="detailClose"
				@close="detailClose"
				@error="detailError"
				@ok="detailOk"
				:debug="debug"
			>
			</ChuteProtector>
		</template>
		<template #panelTitle="{ item }">
			<chuteProtectorPanelTitle
				:item="item"
				:manufacturers="manufacturers"
			>
			</ChuteProtectorPanelTitle>
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
				<v-col cols="12" sm="6">
					<VTextFieldWithValidation
						ref="detailItemManufacturerStockIdRef"
						v-model="detailItemManufacturerStockId"
						vid="detailItemManufacturerStockId"
						:label="$t('forms.content.parts.manufacturerId')"
						:validation="validation"
					/>
				</v-col>
			</v-row>
			<v-row dense>
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

import { useChuteProtectorPartsListingComponent } from '@/components/content/parts/chuteProtectors/chuteProtectorPartsListingComponent';
import { usePartsListingFilterValidation } from '@/components/content/parts/partsListingFilterValidation';
import { useChuteProtectorPartsListingFilterValidation } from '@/components/content/parts/chuteProtectors/chuteProtectorPartsListingFilterValidation';

import ChuteProtector from '@/components/content/parts/part/chuteProtector/ChuteProtector';
import ChuteProtectorPanelTitle from '@/components/content/parts/chuteProtectors/ChuteProtectorPanelTitle';
import Parts from '@/components/content/parts/Parts';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'PartsChuteProtector',
	components: {
		ChuteProtector,
		ChuteProtectorPanelTitle,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		Parts,
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
			detailItemDiameter,
			detailItemDimension
		} = useChuteProtectorPartsListingComponent(props, context, { 
			type: AppCommonConstants.Rocketry.PartTypes.chuteProtector
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
			detailItemDiameter,
			detailItemDimension,
			scope: 'ChuteProectorsFilterControl',
			validation: useVuelidate({ $scope: 'ChuteProectorsFilterControl' })
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(usePartsListingFilterValidation), 
		LibraryCommonUtility.cloneDeep(useChuteProtectorPartsListingFilterValidation));
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
