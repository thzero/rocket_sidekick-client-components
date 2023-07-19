<template>
	<Parts
		title="trackers"
		:type="type"
		:fetch-params="fetchParams"
		:reset-additional-filter="resetAdditionalFilter"
		:validation="validation"
		:debug="debug"
	>
		<template #default="{ detailItem, detailClose, detailError, detailOk, debug }">
			<Tracker
				:model-value="detailItem"
				@cancel="detailClose"
				@close="detailClose"
				@error="detailError"
				@ok="detailOk"
				:debug="debug"
			>
			</Tracker>
		</template>
		<template #panelTitle="{ item }">
			<TrackerPanelTitle
				:item="item"
				:manufacturers="manufacturers"
			>
			</TrackerPanelTitle>
		</template> 
		<template #filters>
			<v-row dense>
				<v-col cols="12" sm="6">
					<VTextFieldWithValidation
						ref="filterItemNameRef"
						v-model="filterItemName"
						vid="filterItemName"
						:label="$t('forms.name')"
						:validation="validation"
					/>
				</v-col>
				<v-col cols="6" sm="6">
					<PartsPublicComponent
						v-model="filterItemIsPublic"
					>
					</PartsPublicComponent>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12" sm="6">
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
				<v-col cols="12" sm="6">
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
				<!-- <v-col cols="12" sm="6">
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
// import { between, decimal } from '@vuelidate/validators';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDeploymentBagPartsListingComponent } from '@/components/content/parts/deploymentBags/deploymentBagPartsListingComponent';
import { usePartsListingFilterValidation } from '@/components/content/parts/partsListingFilterValidation';
import { useTrackerPartsListingFilterValidation } from '@/components/content/parts/trackers/trackerPartsListingFilterValidation';

import Parts from '@/components/content/parts/Parts';
import PartsPublicComponent from '@/components/content/parts/PartsPublicComponent';
import Tracker from '@/components/content/parts/part/tracker/Tracker';
import TrackerPanelTitle from '@/components/content/parts/trackers/TrackerPanelTitle';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'PartsTracker',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		Parts,
		PartsPublicComponent,
		Tracker,
		TrackerPanelTitle,
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
		} = useDeploymentBagPartsListingComponent(props, context, { 
			type: AppCommonConstants.Rocketry.PartTypes.tracker
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
			scope: 'TrackersFilterControl',
			validation: useVuelidate({ $scope: 'TrackersFilterControl' })
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(usePartsListingFilterValidation), 
		LibraryCommonUtility.cloneDeep(useTrackerPartsListingFilterValidation));
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
