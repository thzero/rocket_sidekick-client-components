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
							ref="filterItemLaunchNameRef"
							v-model="filterItemLaunchName"
							vid="filterItemLaunchName"
							:validation="validation"
							:label="$t('forms.content.launches.name') + ' ' + $t('forms.name')"
							:maxcount="30"
						/>
					</v-col>
					<v-col cols="12">
						<VtSelectWithValidation
							ref="filterItemLocationsRef"
							v-model="filterItemLocations"
							vid="filterItemLocations"
							multiple
							:max-values="2"
							:items="locations"
							:validation="validation"
							:label="$t('forms.content.locations.plural')"
						/>
					</v-col>
					<!-- <v-col cols="12">
						<VtTextFieldWithValidation
							ref="filterItemLocationNameRef"
							v-model="filterItemLocationName"
							vid="filterItemLocationName"
							:validation="validation"
							:label="$t('forms.content.locations.name') + ' ' + $t('forms.name')"
							:maxcount="30"
						/>
					</v-col> -->
					<v-col cols="12">
						<VtTextFieldWithValidation
							ref="filterItemRocketNameRef"
							v-model="filterItemRocketName"
							vid="filterItemRocketName"
							:validation="validation"
							:label="$t('forms.content.rockets.name') + ' ' + $t('forms.name')"
							:maxcount="30"
							class="mt-4"
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
	<v-row
		v-if="!launchId"
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
						<v-col cols="6" md="3" v-if="searchCriteria.launchName">
							<b>{{ $t('forms.content.launches.name') + ' ' + $t('forms.name')}}:</b>
							{{ searchCriteria.launchName }}
						</v-col>
						<v-col cols="6" md="3" v-if="searchCriteria.locationName">
							<b>{{ $t('forms.content.locations.name') + ' ' + $t('forms.name')}}:</b>
							{{ searchCriteria.locationName }}
						</v-col>
						<v-col cols="6" md="6" v-if="searchCriteria.locations">
							<b>{{ $t('forms.content.locations.plural')}}:</b>
							<v-chip
								v-for="item in searchCriteria.locations"
								:key="item"
							>{{ locationName(item) }}</v-chip>
						</v-col>
					</v-row>
					<v-row dense>
						<v-col cols="6" md="4" v-if="searchCriteria.rocketName">
							<b>{{ $t('forms.content.rockets.name') + ' ' + $t('forms.name')}}:</b>
							{{ searchCriteria.rocketName }}
						</v-col>
						<v-col cols="6" md="8" v-if="searchCriteria.rocketTypes">
							<b>{{ $t('forms.content.rockets.name') + ' ' + $t('forms.content.rockets.level')}}:</b>
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
		v-if="!launchId"
		dense
		style="margin-top: 24px;"
	>
		<v-col 
			cols="12" md="6"
			v-for="item in launches"
			:key="item.name"
			style="padding-bottom: 18px;"
		>
			<LaunchPanel
				:item="item"
				clickType="click"
				:displayExtras="true"
				:type="type"
				:requestedTag="requestedTag"
				@display="handleLaunch"
			/>
		</v-col>
	</v-row>
	<div
		v-if="launchId"
	>
		<LaunchInfo
			ref="launchInfo"
			backType="close"
			clickType="click"
			:type="type"
			:id="launchId"
			:showUserName="false"
			@close="handleLaunchClose"
		/>
	</div>
</template>

<script>
import { useLaunchPanelBaseProps } from '@/components/content/gallery/launches/launchPanelBaseProps';
import { useLaunchesUserGalleryComponent } from '@/components/content/gallery/launches/launchesGalleryComponent';

import LaunchInfo from '@/components/content/gallery/launches/LaunchInfo';
import LaunchPanel from '@/components/content/gallery/launches/LaunchPanel';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'UserGalleryLaunches',
	components: {
		LaunchInfo,
		LaunchPanel,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useLaunchPanelBaseProps
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
			requestedTag,
			user,
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
			type,
			displayDrawer,
			filterItemLaunchName,
			filterItemLocationName,
			filterItemLocations,
			filterItemRocketName,
			filterItemRocketTypes,
			invalid,
			isSearching,
			launches,
			launchId,
			launchInfo,
			locations,
			searchCriteria,
			validation,
			title,
			buttonOkDisabled,
			clickSearchClear,
			clickSearch,
			filter,
			fetch,
			fetchLaunches,
			fetchLaunchesFilter,
			handleLaunch,
			handleLaunchClose,
			launchUrl,
			locationName,
			reset,
			saveSettings,
			submit,
			toggleDrawer
		} = useLaunchesUserGalleryComponent(props, context);

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
			requestedTag,
			user,
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
			type,
			displayDrawer,
			filterItemLaunchName,
			filterItemLocationName,
			filterItemLocations,
			filterItemRocketName,
			filterItemRocketTypes,
			invalid,
			isSearching,
			launches,
			launchId,
			launchInfo,
			locations,
			searchCriteria,
			validation,
			title,
			buttonOkDisabled,
			clickSearchClear,
			clickSearch,
			filter,
			fetch,
			fetchLaunches,
			fetchLaunchesFilter,
			handleLaunch,
			handleLaunchClose,
			launchUrl,
			locationName,
			reset,
			saveSettings,
			submit,
			toggleDrawer
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
