<template>
	<Parts
		title="streamers"
		:type="type"
		:fetch-params="fetchParams"
		:reset-additional-filter="resetAdditionalFilter"
		:validation="validation"
		:debug="debug"
	>
		<template #default="{ detailItem, detailClose, detailDirtyCallback, detailError, detailOk, debug }">
			<Streamer
				:model-value="detailItem"
				@cancel="detailClose"
				@close="detailClose"
				@error="detailError"
				@ok="detailOk"
				@dirty="detailDirtyCallback"
				:debug="debug"
			>s
			</Streamer>
		</template>
		<template #panelTitle="{ item }">
			<StreamerPanelTitle
				:item="item"
			>
			</StreamerPanelTitle>
		</template> 
		<template #filters="{ filterDrawer }">
			<v-row dense>
				<v-col cols="12" :sm="filterDrawer ? 12 : 6">
					<VtTextFieldWithValidation
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
					<VtSelectWithValidation
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
					<VtTextFieldWithValidation
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
					<VtTextFieldWithValidation
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

import { useDeploymentBagPartsListingComponent } from '@/components/content/parts/deploymentBags/deploymentBagPartsListingComponent';
import { usePartsListingFilterValidation } from '@/components/content/parts/partsListingFilterValidation';
import { useStreamerPartsListingFilterValidation } from '@/components/content/parts/streamers/streamerPartsListingFilterValidation';

import Parts from '@/components/content/parts/Parts';
import PartsPublicComponent from '@/components/content/parts/PartsPublicComponent';
import Streamer from '@/components/content/parts/part/streamer/Streamer';
import StreamerPanelTitle from '@/components/content/parts/streamers/StreamerPanelTitle';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'PartsStreamer',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		Parts,
		PartsPublicComponent,
		Streamer,
		StreamerPanelTitle,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
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
			scope,
			validation
		} = useDeploymentBagPartsListingComponent(props, context, { 
			type: AppCommonConstants.Rocketry.PartTypes.streamer
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
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(usePartsListingFilterValidation), 
		LibraryCommonUtility.cloneDeep(useStreamerPartsListingFilterValidation));
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
