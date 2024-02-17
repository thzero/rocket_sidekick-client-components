<template>
	<ContentHeader :value="title" />
	<VtFormListing
		ref="inventoryListingRef"
		:pre-complete-ok="search"
		:reset-additional="resetAdditional"
		:validation="validation"
		:debug="debug"
		:filter-drawer="true"
	>
		<template #default="{ buttonOkDisabled, filterDrawer, isLoading, reset, submit }">
			<v-card>
				<v-card-text>
					<!-- <v-row dense>
						<v-col cols="12" :sm="filterDrawer ? 12: 6">
							<VtTextFieldWithValidation
								ref="filterItemNameRef"
								v-model="filterItemName"
								vid="filterItemName"
								:label="$t('forms.name')"
								:validation="validation"
							/>
						</v-col>
					</v-row>
					<v-row dense>
						<v-col cols="12" :sm="filterDrawer ? 12: 6">
							<VtSelectWithValidation
								ref="filterItemRocketTypesRef"
								v-model="filterItemRocketTypes"
								vid="filterItemRocketTypes"
								multiple
								:max-values="2"
								:items="rocketTypes"
								:validation="validation"
								:label="$t('forms.content.rockets.level')"
								:hint="$t('forms.content.rockets.level')"
							/>
						</v-col>
						<v-col cols="12" :sm="filterDrawer ? 12: 6">
							<VtSelectWithValidation
								ref="filterItemOrganizationsRef"
								v-model="filterItemOrganizations"
								vid="filterItemOrganizations"
								multiple
								:max-values="5"
								:items="organizations"
								:validation="validation"
								:label="$t('forms.content.organizations.plural')"
							/>
						</v-col>
					</v-row> -->
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<!-- <v-btn
						v-if="!showDetailItem && !filterDrawer"
						:variant="buttonsForms.variant.add"
						:color="buttonsForms.color.add"
						@click="handleAdd(item)"
					>
						{{ $t('buttons.add') }}
					</v-btn>
					<v-btn
						:variant="buttonsForms.variant.clear"
						:color="buttonsForms.color.clear"
						:loading="isLoading"
						@click="clickSearchClear(reset, submit)"
					>
						{{ $t('buttons.clear') }}
					</v-btn>
					<v-btn
						:variant="buttonsForms.variant.ok"
						:color="buttonsForms.color.ok"
						:disabled="buttonOkDisabled"
						:loading="isLoading"
						@click="clickSearch(submit)"
					>
						{{ $t('buttons.search') }}
					</v-btn> -->
				</v-card-actions>
			</v-card>
		</template>
		<template #preActions=" { filterDrawer, isLoading }">
			<v-btn
				class="mr-2"
				color="primary"
			>
				{{ $t('buttons.add') }}
				<v-menu 
					activator="parent"
					location="top"
				>
					<v-list>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="purple"
								block
								@click="clickAltimetersSearch()"
							>
								{{ $t('forms.content.parts.altimeter.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickChuteProtectorsSearch()"
							>
								{{ $t('forms.content.parts.chuteProtector.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickChuteReleasesSearch()"
							>
								{{ $t('forms.content.parts.chuteRelease.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickDeploymentBagsSearch()"
							>
								{{ $t('forms.content.parts.deploymentBag.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickDeploymentBagsSearch()"
							>
								{{ $t('forms.content.parts.motor.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickDeploymentBagsSearch()"
							>
								{{ $t('forms.content.parts.motorCase.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickParachutesSearch()"
							>
								{{ $t('forms.content.parts.parachute.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="orange"
								block
								@click="clickStreamersSearch()"
							>
								{{ $t('forms.content.parts.streamer.name') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								:variant="buttonsForms.variant.default"
								color="blue"
								block
								@click="clickTrackersSearch()"
							>
								{{ $t('forms.content.parts.tracker.name') }}
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-btn>
		</template>
		<template v-slot:listing>
			<v-row dense>
				<v-col cols="12">
					<v-snackbar
						ref="notifyRef"
						v-model="notifySignal"
						:color="notifyColor"
						:timeout="notifyTimeout"
					>
						{{ notifyMessage }}
					</v-snackbar>
					<div
						v-if="debug"
					>
					</div>
				</v-col>
				<v-col
				>
					<div>
						inventory {{ inventory }}
					</div>
					<div>
						inventoryListing {{ inventoryListing }}
					</div>
					 <v-row dense>
						<v-col
							cols="12"
							v-for="(item, index) in inventoryListing"
							:key="index"
						>
							<v-card>
								<v-card-title
									class="bg-primary"
								>
										{{ item.manufacturer }}
									<div class="float-right">
										{{ item.item.name }}
									</div>
								</v-card-title>
								<v-card-text>
									<div class="float-right">
									<!-- <Locat\ionView
										:detail-item="item"
										:debug="debug"
									>
									</LocationView> -->
										<VtNumberFieldWithValidation
											style="min-width: 200px;"
											ref="detailItemTemperatureRef"
											v-model="item.quantity"
											vid="detailItemTemperature"
											type="decimal"
											:validation="validation"
											:label="$t('forms.content.launches.weather.temperature')"
										/>
									</div>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</template>
	</VtFormListing>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchAltimetersRef"
		:signal="dialogPartsSearchAltimetersManager.signal"
		:part-types="manufacturerTypeAltimeter"
		@close="dialogPartsSearchAltimetersManager.cancel()"
		@select="selectAltimeter"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchChuteProtectorsRef"
		:signal="dialogPartsSearchChuteProtectorsManager.signal"
		:part-types="manufacturerTypeChuteProtector"
		@close="dialogPartsSearchChuteProtectorsManager.cancel()"
		@select="selectChuteProtector"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchChuteReleasesRef"
		:signal="dialogPartsSearchChuteReleasesManager.signal"
		:part-types="manufacturerTypeChuteRelease"
		@close="dialogPartsSearchChuteReleasesManager.cancel()"
		@select="selectChuteRelease"
	/>
	<RocketPartsLookupDialog
		ref="dialoSearchgDeploymentBagsRef"
		:signal="dialogPartsSearchDeploymentBagsManager.signal"
		:part-types="manufacturerTypeDeploymentBag"
		@close="dialogPartsSearchDeploymentBagsManager.cancel()"
		@select="selectDeploymentBag"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchParachutesRef"
		:signal="dialogPartsSearchParachutesManager.signal"
		:part-types="manufacturerTypeParachute"
		@close="dialogPartsSearchParachutesManager.cancel()"
		@select="selectParachute"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchStreamersRef"
		:signal="dialogPartsSearchStreamersManager.signal"
		:part-types="manufacturerTypeStreamer"
		@close="dialogPartsSearchStreamersManager.cancel()"
		@select="selectStreamer"
	/>
	<RocketPartsLookupDialog
		ref="dialogPartsSearchTrackersRef"
		:signal="dialogPartsSearchTrackersManager.signal"
		:part-types="manufacturerTypeTracker"
		@close="dialogPartsSearchTrackersManager.cancel()"
		@select="selectTracker"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useInventoryBaseComponent } from '@/components/content/inventory/inventoryComponent';
import { useInventoryBaseComponentProps } from '@/components/content/inventory/inventoryComponentProps';
import { useInventoryFilterValidation } from '@/components/content/inventory/inventoryFilterValidation';

import ContentHeader from '@/components/content/Header';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketPartsLookupDialog from '@/components/content/rockets/dialogs/parts/RocketPartsLookupDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormListing from '@thzero/library_client_vue3_vuetify3/components/form/VtFormListing';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'InventoryUserControl',
	components: {
		ContentHeader,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		RocketPartsLookupDialog,
		VtConfirmationDialog,
		VtFormListing,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useInventoryBaseComponentProps
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
			sort,
			target,
			buttonsDialog,
			buttonsForms,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			debug,
			inventory,
			inventoryListing,
			inventoryListingRef,
			// filterItemName,
			// filterItemOrganizations,
			// filterItemRocketTypes,
			title,
			dialogPartsSearchAltimetersManager,
			dialogPartsSearchChuteProtectorsManager,
			dialogPartsSearchChuteReleasesManager,
			dialogPartsSearchDeploymentBagsManager,
			dialogPartsSearchParachutesManager,
			dialogPartsSearchStreamersManager,
			dialogPartsSearchTrackersManager,
			manufacturerTypeAltimeter,
			manufacturerTypeChuteProtector,
			manufacturerTypeChuteRelease,
			manufacturerTypeDeploymentBag,
			manufacturerTypeParachute,
			manufacturerTypeStreamer,
			manufacturerTypeTracker,
			manufacturers,
			altimeters,
			chuteProtectors,
			chuteReleases,
			deploymentBags,
			hasAltimeters,
			hasChuteProtectors,
			hasChuteReleases,
			hasDeploymentBags,
			hasParachutes,
			hasStreamers,
			hasTrackers,
			parachutes,
			streamers,
			trackers,
			clickAltimetersSearch,
			clickChuteProtectorsSearch,
			clickChuteReleasesSearch,
			clickDeploymentBagsSearch,
			clickParachutesSearch,
			clickStreamersSearch,
			clickTrackersSearch,
			resetAdditional,
			search,
			selectAltimeter,
			selectChuteProtector,
			selectChuteRelease,
			selectDeploymentBag,
			selectParachute,
			selectStreamer,
			selectTracker,
			scope,
			validation
		} = useInventoryBaseComponent(props, context);

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
			sort,
			target,
			buttonsDialog,
			buttonsForms,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			debug,
			inventory,
			inventoryListing,
			inventoryListingRef,
			// filterItemName,
			// filterItemOrganizations,
			// filterItemRocketTypes,
			title,
			dialogPartsSearchAltimetersManager,
			dialogPartsSearchChuteProtectorsManager,
			dialogPartsSearchChuteReleasesManager,
			dialogPartsSearchDeploymentBagsManager,
			dialogPartsSearchParachutesManager,
			dialogPartsSearchStreamersManager,
			dialogPartsSearchTrackersManager,
			manufacturerTypeAltimeter,
			manufacturerTypeChuteProtector,
			manufacturerTypeChuteRelease,
			manufacturerTypeDeploymentBag,
			manufacturerTypeParachute,
			manufacturerTypeStreamer,
			manufacturerTypeTracker,
			manufacturers,
			altimeters,
			chuteProtectors,
			chuteReleases,
			deploymentBags,
			hasAltimeters,
			hasChuteProtectors,
			hasChuteReleases,
			hasDeploymentBags,
			hasParachutes,
			hasStreamers,
			hasTrackers,
			parachutes,
			streamers,
			trackers,
			clickAltimetersSearch,
			clickChuteProtectorsSearch,
			clickChuteReleasesSearch,
			clickDeploymentBagsSearch,
			clickParachutesSearch,
			clickStreamersSearch,
			clickTrackersSearch,
			resetAdditional,
			search,
			selectAltimeter,
			selectChuteProtector,
			selectChuteRelease,
			selectDeploymentBag,
			selectParachute,
			selectStreamer,
			selectTracker,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useInventoryFilterValidation), {
		});
	}
};
</script>

<style scoped>
</style>
