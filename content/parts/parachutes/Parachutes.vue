<template>
	<Parts
		title="parachutes"
		:type="type"
		:fetchParams="fetchParams"
		:reset-additional-filter="resetAdditionalFilter"
		:validation="validation"
		:debug="debug"
	>
		<template #default="{ detailItem, detailClose, detailError, detailOk, debug }">
			<Parachute
				:model-value="detailItem"
				@cancel="detailClose"
				@close="detailClose"
				@error="detailError"
				@ok="detailOk"
				:debug="debug"
			>
			</Parachute>
		</template>
		<template #panelTitle="{ item }">
			<ParachutePanelTitle
				:item="item"
				:manufacturers="manufacturers"
			>
			</ParachutePanelTitle>
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
				<v-col cols="6" sm="3">
					 <v-checkbox
						v-model="detailItemThinMill"
						density="compact"
						:label="$t('forms.content.parts.parachute.thinMill')"
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
import { between, decimal } from '@vuelidate/validators';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useParachutesPartsListingComponent } from '@/components/content/parts/parachutes/parachutePartsListingComponent';
import { usePartsListingFilterValidation } from '@/components/content/parts/partsListingFilterValidation';

import Parachute from '@/components/content/parts/part/parachute/Parachute';
import ParachutePanelTitle from '@/components/content/parts/parachutes/ParachutePanelTitle';
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
	name: 'PartsParachute',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		Parachute,
		ParachutePanelTitle,
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
			detailItemDiameter,
			detailItemThinMill,
			fetchParams,
			resetAdditionalFilter
		} = useParachutesPartsListingComponent(props, context, { 
			type: AppCommonConstants.Rocketry.PartTypes.parachute
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
			detailItemDiameter,
			detailItemThinMill,
			fetchParams,
			resetAdditionalFilter,
			scope: 'ParchutesFilterControl',
			validation: useVuelidate({ $scope: 'ParchutesFilterControl' })
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(usePartsListingFilterValidation), {
			detailItemCd: { decimal, between: between(0, 9), $autoDirty: true },
			detailItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
			detailItemLoadMax: { decimal, between: between(0, 2004), $autoDirty: true },
			detailItemLoadMin: { decimal, between: between(0, 2004), $autoDirty: true },
			detailItemThinMill: { $autoDirty: true },
			diameterMeasurementUnitId: { $autoDirty: true },
			diameterMeasurementUnitsId: { $autoDirty: true }
		});
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
