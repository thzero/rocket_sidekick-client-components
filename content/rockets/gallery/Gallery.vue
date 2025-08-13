<template>
	<v-navigation-drawer
		v-model="displayDrawer"
		temporary
		:style="displayDrawer ? ($vuetify.display.xs ? 'width: 100%;' : 'min-width: 450px;') : ''"
	>
		<v-card>
			<v-card-text>
				<v-row dense>
					<v-col cols="12">
						<VtTextFieldWithValidation
							ref="filterItemRocketNameRef"
							v-model="filterItemRocketName"
							vid="filterItemRocketName"
							:validation="validation"
							:label="$t('forms.content.rockets.name') + ' ' + $t('forms.name')"
							:maxcount="30"
						/>
					</v-col>
					<v-col cols="12">
						<VtSelectWithValidation
							ref="filterItemRocketTypesRef"
							v-model="filterItemRocketTypes"
							vid="filterItemRocketTypes"
							multiple
							:max-values="2"
							:items="rocketTypes"
							:validation="validation"
							:label="$t('forms.content.rockets.name') + ' ' + $t('forms.content.rockets.level')"
							:hint="$t('forms.content.rockets.level')"
						/>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					:variant="buttonsForms.variant.clear"
					:color="buttonsForms.color.clear"
					@click="clickSearchClear()"
				>{{ $t('buttons.clear') }}</v-btn>
				<v-btn
					:variant="buttonsForms.variant.ok"
					:color="buttonsForms.color.ok"
					:disabled="buttonOkDisabled"
					@click="clickSearch()"
				>{{ $t('buttons.search') }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-navigation-drawer>
	<ContentHeader :value="title" />
	<!-- <pre>{{ JSON.stringify(rockets, null, '  ') }}</pre> -->
	<v-row
		v-if="!rocketId"
		dense
		class="mt-2"
	>
		<v-col 
			cols="2" md="1"
		>
			<v-btn
				v-if="$vuetify.display.lgAndUp"
				:variant="buttonsForms.variant.default"
				:color="buttonsForms.color.default"
				@click="toggleDrawer"
				:disabled="displayDrawer"
			>
				{{ $t('buttons.search') }}
			</v-btn>
		</v-col>
		<v-col 
			cols="8" md="10"
		>
			<v-card>
				<v-card-text>
					<v-row dense>
						<v-col cols="6" v-if="searchCriteria.name">
							<b>{{ $t('forms.name')}}:</b>
							{{ searchCriteria.name }}
						</v-col>
						<v-col cols="6" v-if="searchCriteria.rocketTypes">
							<b>{{ $t('forms.content.rockets.level')}}:</b>
							<v-chip
								v-for="item in searchCriteria.rocketTypes"
								:key="item"
							>{{ rocketTypeName(item) }}</v-chip>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col 
			cols="2" md="1"
			class="text-right"
		>
			<v-btn
				:variant="buttonsForms.variant.default"
				:color="buttonsForms.color.default"
				@click="toggleDrawer"
				:disabled="displayDrawer"
			>
				{{ $t('buttons.search') }}
			</v-btn>
		</v-col>
	</v-row>
	<v-row 
		v-if="!rocketId"
		dense
	>
		<v-col 
			cols="12" md="6"
			v-for="item in rockets"
			:key="item.name"
			style="padding-bottom: 18px;"
		>
			<RocketPanel
				:item="item"
				:manufacturers="manufacturers"
				:type="type"
				:displayExtras="true"
				clickType="click"
				@display="handleRocket"
			/>
		</v-col>
	</v-row>
	<div
		v-if="rocketId"
	>
		<RocketInfo
			ref="rocketInfo"
			backType="close"
			:manufacturers="manufacturers"
			:type="type"
			:id="rocketId"
			@close="handleRocketClose"
		/>
	</div>
</template>

<script>
import { ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useRocketsGalleryBaseComponent } from '@/components/content/rockets/gallery/rocketsGalleryBase';
import { useRocketsGalleryBaseProps } from '@/components/content/rockets/gallery/rocketsGalleryBaseProps';
import { useRocketsGalleryFilterValidation } from '@/components/content/rockets/gallery/rocketsGalleryFilterValidation';

import RocketInfo from '@/components/content/rockets/gallery/rocket/RocketInfo';
import RocketPanel from '@/components/content/rockets/gallery/RocketPanel';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

import ContentHeader from '@/components/content/Header';

export default {
	name: 'RocketsGallery',
	components: {
		ContentHeader,
		RocketInfo,
		RocketPanel,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useRocketsGalleryBaseProps
	},
	setup(props, context) {
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
			serviceStore,
			sortByOrder,
			target,
			rocketTypes,
			hasCoverUrl,
			rocketCg,
			rocketCgHighest,
			rocketCp,
			rocketCpHighest,
			rocketDiameter,
			rocketDiameterHighest,
			rocketLength,
			rocketLengthHighest,
			rocketLengthOverall,
			rocketManufacturer,
			rocketManufacturerName,
			rocketManufacturerRocketName,
			rocketManufacturerStockId,
			rocketManufacturerUrl,
			rocketMotorMountName,
			rocketMotorMountNames,
			rocketMotorNames,
			rocketMotorNamesByStage,
			rocketMotors,
			rocketStagePrimary,
			rocketStages,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			rocketTypeName,
			rocketTypeNames,
			rocketWeight,
			rocketWeightHighest,
			buttonsDialog,
			buttonsForms,
			displayDrawer,
			filterItemRocketName,
			filterItemRocketTypes,
			invalid,
			isSearching,
			manufacturers,
			rockets,
			searchCriteria,
			title,
			type,
			validation,
			buttonOkDisabled,
			clickSearchClear,
			clickSearch,
			fetch,
			reset,
			rocketUrl,
			submit,
			toggleDrawer
		} = useRocketsGalleryBaseComponent(props, context, {
			type: AppCommonConstants.Rocketry.DisplayTypes.Site,
			parent: 'gallery'
		});

		const rocketId = ref(null);
		
		const handleRocket = (id) => {
			rocketId.value = id;
		};
		const handleRocketClose = () => {
			rocketId.value = null;
		};

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
			serviceStore,
			sortByOrder,
			target,
			rocketTypes,
			hasCoverUrl,
			rocketCg,
			rocketCgHighest,
			rocketCp,
			rocketCpHighest,
			rocketDiameter,
			rocketDiameterHighest,
			rocketLength,
			rocketLengthHighest,
			rocketLengthOverall,
			rocketManufacturer,
			rocketManufacturerName,
			rocketManufacturerRocketName,
			rocketManufacturerStockId,
			rocketManufacturerUrl,
			rocketMotorMountName,
			rocketMotorMountNames,
			rocketMotorNames,
			rocketMotorNamesByStage,
			rocketMotors,
			rocketStagePrimary,
			rocketStages,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			rocketTypeName,
			rocketTypeNames,
			rocketWeight,
			rocketWeightHighest,
			buttonsDialog,
			buttonsForms,
			displayDrawer,
			filterItemRocketName,
			filterItemRocketTypes,
			invalid,
			isSearching,
			manufacturers,
			rockets,
			searchCriteria,
			title,
			type,
			validation,
			buttonOkDisabled,
			clickSearchClear,
			clickSearch,
			fetch,
			reset,
			rocketUrl,
			submit,
			toggleDrawer,
			rocketId,
			handleRocket,
			handleRocketClose
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketsGalleryFilterValidation), {
		});
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
