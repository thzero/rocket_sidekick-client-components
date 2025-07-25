<template>
	<ContentHeader :value="title" />
	<VtFormListing
		ref="launchesRef"
		:pre-complete-ok="search"
		:reset-additional="resetAdditional"
		:validation="validation"
		:debug="debug"
		:visible="!showDetailItem || showList"
		:filter-drawer="true"
		:filter-disabled="detailDirty"
	>
		<template #default="{ buttonOkDisabled, filterDrawer, isLoading, reset, submit }">
			<v-card>
				<v-card-text>
					<slot name="filters">
						<v-row dense>
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
						</v-row>
						<v-row dense>
							<v-col cols="12">
								<div class="d-flex">
									<VtTextField
										ref="filterItemRocketNameRef"
										v-model="filterItemRocketName"
										vid="filterItemRocketName"
										:label="$t('forms.content.rockets.name')"
										:readonly="true"
									/>
									<v-btn
										class="ml-4 text-right"
										:variant="buttonsForms.variant.add"
										:color="buttonsForms.color.add"
										@click="clickSearchRockets(item)"
									>
										{{ $t('buttons.select') }}
									</v-btn>
								</div>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12">
								<div class="d-flex">
									<VtTextField
										ref="filterItemLocationNameRef"
										v-model="filterItemLocationName"
										vid="filterItemLocationName"
										:label="$t('forms.content.locations.name')"
										:readonly="true"
									/>
									<v-btn
										class="ml-4 text-right"
										:variant="buttonsForms.variant.add"
										:color="buttonsForms.color.add"
										@click="clickSearchLocations(item)"
									>
										{{ $t('buttons.select') }}
									</v-btn>
								</div>
							</v-col>
						</v-row>
					</slot>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn
						v-if="!showDetailItem && !filterDrawer"
						:variant="buttonsForms.variant.add"
						:color="buttonsForms.color.add"
						:disabled="isDetailOpen || isLoading"
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
					</v-btn>
				</v-card-actions>
			</v-card>
		</template>
		<template #preActions=" { filterDrawer, isLoading }">
			<v-btn
				v-if="!showDetailItem && filterDrawer"
				:variant="buttonsForms.variant.add"
				:color="buttonsForms.color.add"
				:disabled="isDetailOpen || isLoading"
				@click="handleAdd(item)"
			>
				{{ $t('buttons.add') }}
			</v-btn>
		</template>
		<template #postActions=" { filterDrawer, isLoading }">
			<v-btn
				v-if="!showDetailItem && filterDrawer && !mobileOnly"
				:variant="buttonsForms.variant.default"
				:color="buttonsForms.color.default"
				:disabled="isLoading"
				class="ml-2"
				@click="handleViewType"
				:icon="viewTypeIcon"
			>
			</v-btn>
			<v-btn
				v-if="!showDetailItem && filterDrawer && viewTypeListing && !mobileOnly"
				:variant="buttonsForms.variant.default"
				:color="buttonsForms.color.default"
				:disabled="isLoading"
				class="ml-2"
				@click="handleViewTypeListingDownload"
			>
				{{ $t('buttons.export') }}
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
						[[ colsSearchResults {{ colsSearchResults }}]]
						[[ colsEditPanel {{ colsEditPanel }}]]
						[[ showList {{ showList }}]]
						[[ showDetailItem {{ showDetailItem }}]]
						<!-- [[ detailitem {{ JSON.stringify(detailItem) }}]] -->
					</div>
				</v-col>
				<v-col
					v-show="colsSearchResults"
					:cols="colsSearchResults"
				>
					<v-row 
						v-if="viewTypeTable"
						dense
					>
						<v-col
							cols="12"
							v-for="item in items"
							:key="item.id"
						>
							<v-card>
								<v-card-title
									:class="launchStatusColor(item)"
								>
									<!-- <v-icon
										v-if="launchStatusIcon(item)"
									>
										{{ launchStatusIcon(item) }}
									</v-icon> -->
									<table style="float: left;">
										<tbody>
											<tr>
												<td>
													<v-icon
														v-if="launchStatusIcon(item)"
														class="mr-2"
													>
														{{ launchStatusIcon(item) }}
													</v-icon>
												</td>
												<td>
													<img
														v-if="item.rocketSetup && item.rocketSetup && item.rocketSetup.rocket" 
														:src="rocketTypeIcon(item.rocketSetup.rocket)" style="height: 48px;" 
													/>
												</td>
											</tr>
										</tbody>
									</table>
									&nbsp;
									<!-- <a class="text-contrast" :href="'/user/rockets/' + rocketId(item)">{{ launchTitle(item) }}</a> -->
									<!-- <router-link
										:to="'/user/rockets/' + rocketId(item)"
										class="text-contrast router-link"
									>
										{{ launchTitle(item) }}
									</router-link> -->
									<span>
										<!-- @&nbsp; -->
										<!-- <a class="text-contrast" :href="'/user/locations/' + locationId(item)">{{ launchTitleLocation(item) }}</a> -->
										<router-link
											:to="'/user/locations/' + locationId(item)"
											class="text-contrast router-link"
										>
											{{ launchTitleLocation(item) }}
										</router-link>
									</span>
									<div class="float-right">{{ launchDate(item) }}</div>
								</v-card-title>
								<v-card-text>
									<VtMarkdown v-model="item.description" :use-github=false />
									<div
										v-if="debug"
									>
										canCopy [[ {{ canCopy(item) }}]]
										canDelete [[ {{ canDelete(item) }}]]
										canEdit [[ {{ canEdit(item) }}]]
										canView [[ {{ canView(item) }}]]
									</div>
									<LaunchView
										:detail-item="item"
										:debug="debug"
										:isTable="viewTypeTable"
									>
									</LaunchView>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn
										v-if="canCopy(item)"
										:variant="buttonsForms.variant.copy"
										:color="buttonsForms.color.copy"
										:disabled="isDetailOpen || isCopying(item)"
										@click="dialogCopyOpen(item)"
									>
										{{ $t('buttons.copy') }}
									</v-btn>
									<v-btn
										v-if="canDelete(item)"
										:variant="buttonsForms.variant.delete"
										:color="buttonsForms.color.delete"
										:disabled="isDetailOpen || isDeleting(item)"
										@click="dialogDeleteOpen(item)"
									>
										{{ $t('buttons.delete') }}
									</v-btn>
									<v-btn
										v-if="canEdit(item)"
										:variant="buttonsForms.variant.edit"
										:color="buttonsForms.color.edit"
										:disabled="isDetailOpen"
										@click="handleEdit(item)"
									>
										{{ $t('buttons.edit') }}
									</v-btn>
									<v-btn
										v-if="canView(item)"
										:variant="buttonsForms.variant.ok"
										:color="buttonsForms.color.ok"
										:disabled="isDetailOpen"
										@click="handleView(item)"
									>
										{{ $t('buttons.view') }}
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-col>
					</v-row>
					<v-table
						ref="viewTypeListingRef"
						v-if="viewTypeListing"
						density="compact"
					>
						<thead>
							<LaunchViewListing
								:debug="debug"
								:isHeaders="viewTypeListing"
							>
							</LaunchViewListing>
						</thead>
						<tbody>
							<LaunchViewListing
								v-for="item in items"
								:key="item.id"
								:detail-item="item"
								:debug="debug"
							>
							</LaunchViewListing>
						</tbody>
					</v-table>
				</v-col>
				<v-col
					class="mb-4"
					v-show="colsEditPanel"
					:cols="colsEditPanel"
				>
					<LaunchEdit
						:model-value="detailItem"
						@cancel="detailClose"
						@close="detailClose"
						@error="detailError"
						@ok="detailOk"
						:debug="debug"
						@dirty="detailDirtyCallback"
					>
					</LaunchEdit>
				</v-col>
			</v-row>
		</template>
	</VtFormListing>
	<LocationLookupDialog
		ref="dialogLocationLookupManagerRef"
		:signal="dialogLocationLookupManager.signal"
		@close="dialogLocationLookupManager.cancel()"
		@select="selectLocation"
	/>
	<RocketLookupDialog
		ref="dialogRocketLookupManagerRef"
		:signal="dialogRocketLookupManager.signal"
		@close="dialogRocketLookupManager.cancel()"
		@select="selectRocket"
	/>
	<VtConfirmationDialog
		ref="dialogDeleteRef"
		:message="dialogDeleteMessage"
		:messageRaw=true
		:signal="dialogDeleteManager.signal"
		@cancel="dialogDeleteCancel"
		@error="dialogDeleteError"
		@ok="dialogDeleteOk"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useMasterDetailComponentProps } from '@/components/content/masterDetailComponentProps';
import { useLaunchesBaseComponent } from '@/components/content/launches/launchesComponent';
import { useLaunchesBaseComponentProps } from '@/components/content/launches/launchesComponentProps';
import { useLaunchesFilterValidation } from '@/components/content/launches/launchesFilterValidation';

import ContentHeader from '@/components/content/Header';
import LaunchEdit from '@/components/content/launches/launch/LaunchEdit';
import LaunchView from '@/components/content/launches/launch/LaunchView';
import LaunchViewListing from '@/components/content/launches/launch/LaunchViewListing';
import LocationLookupDialog from '@/components/content/locations/dialogs/LocationLookupDialog';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketLookupDialog from '@/components/content/rockets/dialogs/RocketLookupDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormListing from '@thzero/library_client_vue3_vuetify3/components/form/VtFormListing';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'LaunchesUserControl',
	components: {
		ContentHeader,
		LaunchEdit,
		LaunchView,
		LaunchViewListing,
		LocationLookupDialog,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		RocketLookupDialog,
		VtConfirmationDialog,
		VtFormListing,
		VtMarkdown,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextField,
		VtTextFieldWithValidation
	},
	props: {
		...useMasterDetailComponentProps,
		...useLaunchesBaseComponentProps
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
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			dialogCopyManager,
			dialogCopyRef,
			dialogDeleteManager,
			dialogDeleteMessage,
			dialogDeleteParams,
			detailItem,
			items,
			requestedItemId,
			colsEditPanel,
			colsSearchResults,
			displayEditPanel,
			displaySearchResults,
			isDetailOpen,
			showDetailItem,
			showList,
			canCopy,
			canDelete,
			canEdit,
			canView,
			clickSearch,
			clickSearchClear,
			detailClose,
			detailDirty,
			detailDirtyCallback,
			detailError,
			detailOk,
			dialogCopyCancel,
			dialogCopyError,
			dialogCopyOk,
			dialogCopyOpen,
			dialogCopyParams,
			dialogDeleteCancel,
			dialogDeleteError,
			dialogDeleteOk,
			dialogDeleteOpen,
			fetch,
			handleAdd,
			handleEdit,
			handleView,
			initEdit,
			initNew,
			initView,
			isCopying,
			isDeleting,
			search,
			display,
			buttonsDialog,
			buttonsForms,
			organizations,
			rocketTypeIcon,
			rocketTypes,
			debug,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			dialogLocationLookupManager,
			dialogRocketLookupManager,
			LaunchesRef,
			filterItemDiameter,
			filterItemLocationId,
			filterItemLocationName,
			filterItemName,
			filterItemOrganizations,
			filterItemRocketId,
			filterItemRocketName,
			filterItemRocketTypes,
			mobileOnly,
			title,
			viewType,
			viewTypeListingRef,
			buttonSearchResetDisabled,
			viewTypeIcon,
			viewTypeListing,
			viewTypeTable,
			clickSearchLocations,
			clickSearchRockets,
			handleViewType,
			handleViewTypeListingDownload,
			launchDate,
			launchStatusColor,
			launchStatusIcon,
			launchTitle,
			launchTitleLocation,
			locationId,
			resetAdditional,
			rocketId,
			selectLocation,
			selectRocket,
			scope,
			validation
		} = useLaunchesBaseComponent(props, context);

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
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			dialogCopyManager,
			dialogCopyRef,
			dialogDeleteManager,
			dialogDeleteMessage,
			dialogDeleteParams,
			detailItem,
			items,
			requestedItemId,
			colsEditPanel,
			colsSearchResults,
			displayEditPanel,
			displaySearchResults,
			isDetailOpen,
			showDetailItem,
			showList,
			canCopy,
			canDelete,
			canEdit,
			canView,
			clickSearch,
			clickSearchClear,
			detailClose,
			detailDirty,
			detailDirtyCallback,
			detailError,
			detailOk,
			dialogCopyCancel,
			dialogCopyError,
			dialogCopyOk,
			dialogCopyOpen,
			dialogCopyParams,
			dialogDeleteCancel,
			dialogDeleteError,
			dialogDeleteOk,
			dialogDeleteOpen,
			fetch,
			handleAdd,
			handleEdit,
			handleView,
			initEdit,
			initNew,
			initView,
			isCopying,
			isDeleting,
			search,
			display,
			buttonsDialog,
			buttonsForms,
			organizations,
			rocketTypeIcon,
			rocketTypes,
			debug,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			dialogLocationLookupManager,
			dialogRocketLookupManager,
			LaunchesRef,
			filterItemDiameter,
			filterItemLocationId,
			filterItemLocationName,
			filterItemName,
			filterItemOrganizations,
			filterItemRocketId,
			filterItemRocketName,
			filterItemRocketTypes,
			mobileOnly,
			title,
			viewType,
			viewTypeListingRef,
			buttonSearchResetDisabled,
			viewTypeIcon,
			viewTypeListing,
			viewTypeTable,
			clickSearchLocations,
			clickSearchRockets,
			handleViewType,
			handleViewTypeListingDownload,
			launchDate,
			launchStatusColor,
			launchStatusIcon,
			launchTitle,
			launchTitleLocation,
			locationId,
			resetAdditional,
			rocketId,
			selectLocation,
			selectRocket,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useLaunchesFilterValidation), {
		});
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
