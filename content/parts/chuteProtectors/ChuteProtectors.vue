<template>
	<Parts
		title="chuteProtectors"
		:type="type"
		:fetch-params="fetchParams"
		:reset-additional-filter="resetAdditionalFilter"
		:validation="validation"
		:debug="debug"
	>
		<template #default="{ detailItem, detailClose, detailDirtyCallback, detailError, detailOk, debug }">
			<ChuteProtector
				:model-value="detailItem"
				@cancel="detailClose"
				@close="detailClose"
				@error="detailError"
				@ok="detailOk"
				@dirty="detailDirtyCallback"
				:debug="debug"
			>
			</ChuteProtector>
		</template>
		<template #panelTitle="{ item }">
			<chuteProtectorPanelTitle
				:item="item"
			>
			</ChuteProtectorPanelTitle>
		</template> 
		<template #filters="{ filterDrawer }">
			<v-row dense>
				<v-col cols="12" :sm="filterDrawer ? 12 : 6">
					<VTextFieldWithValidation
						ref="filterItemNameRef"
						v-model="filterItemName"
						vid="filterItemName"
						:label="$t('forms.name')"
						:validation="validation"
					/>
				</v-col>
				<v-col cols="12" :sm="filterDrawer ? 12 : 6">
					<PartsPublicComponent
						v-model="filterItemIsPublic"
					>
					</PartsPublicComponent>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12" :sm="filterDrawer ? 12 : 6">
					<VSelectWithValidation
						ref="filterItemManufacturersRef"
						v-model="filterItemManufacturers"
						vid="filterItemManufacturers"
						multiple
						:max-values="2"
						:items="manufacturers"
						:validation="validation"
						:label="$t('forms.content.manufacturer.plural')"
						:hint="$t('forms.content.manufacturer.plural_hint')"
					/>
				</v-col>
				<v-col cols="12" :sm="filterDrawer ? 12 : 6">
					<VTextFieldWithValidation
						ref="filterItemManufacturerStockIdRef"
						v-model="filterItemManufacturerStockId"
						vid="filterItemManufacturerStockId"
						:label="$t('forms.content.parts.manufacturerId')"
						:validation="validation"
					/>
				</v-col>
			</v-row>
			<v-row dense>
				<!-- 
				<v-col cols="12" :sm="filterDrawer ? 12 : 6">
					<VTextFieldWithValidation
						ref="filterItemDiameterRef"
						v-model="filterItemDiameter"
						vid="filterItemDiameter"
						:label="$t('forms.content.parts.diameter')"
						:validation="validation"
					/>
				</v-col> -->
			</v-row>
		</template> 
	</Parts>
</template>

<script>
import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useChuteProtectorPartsListingComponent } from '@/components/content/parts/chuteProtectors/chuteProtectorPartsListingComponent';
import { usePartsListingFilterValidation } from '@/components/content/parts/partsListingFilterValidation';
import { useChuteProtectorPartsListingFilterValidation } from '@/components/content/parts/chuteProtectors/chuteProtectorPartsListingFilterValidation';

import ChuteProtector from '@/components/content/parts/part/chuteProtector/ChuteProtector';
import ChuteProtectorPanelTitle from '@/components/content/parts/chuteProtectors/ChuteProtectorPanelTitle';
import Parts from '@/components/content/parts/Parts';
import PartsPublicComponent from '@/components/content/parts/PartsPublicComponent';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
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
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		Parts,
		PartsPublicComponent,
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
			filterItemIsPublic,
			filterItemManufacturers,
			filterItemManufacturerStockId,
			filterItemName,
			filterItemWeight,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			manufacturers,
			type,
			fetchParams,
			resetAdditionalFilter,
			filterItemDiameter,
			filterItemDimension,
			scope,
			validation
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
			filterItemIsPublic,
			filterItemManufacturers,
			filterItemManufacturerStockId,
			filterItemName,
			filterItemWeight,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			manufacturers,
			type,
			fetchParams,
			resetAdditionalFilter,
			filterItemDiameter,
			filterItemDimension,
			scope,
			validation
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
