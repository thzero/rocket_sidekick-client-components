<template>
	<ContentHeader :value="title" />
	<VtFormListing
		ref="locationsListing"
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
					<v-row dense>
						<v-col cols="12" :sm="filterDrawer ? 12: 6">
							<VtTextFieldWithValidation
								ref="filterItemNameRef"
								v-model="filterItemName"
								vid="filterItemName"
								:label="$t('forms.name')"
								:validation="validation"
								:clear="true"
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
						<v-col cols="12" :sm="filterDrawer ? 12: 6">
							<VtSwitchWithValidation
								ref="filterItemSharedRef"
								v-model="filterItemShared"
								vid="filterItemShared"
								:label="$t('forms.content.public')"
								:validation="validation"
							/>
						</v-col>
					</v-row>
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
		<template v-slot:listing>
			<v-card>
				<v-card-text>
					<v-row dense>
						<v-col cols="12" md="4">
							<table
								border="0"
								cellspacing="0"
								cellpadding="0"
								style="width: 100%;"
							>
								<tbody>
									<tr>
										<td
											style="padding-right: 4px"
										>
											<VtSelect
												ref="sortColumn1Ref"
												v-model="sortColumn1"
												vid="sortColumn1"
												:items="sortColumnsNull"
												:flat="true"
												:hide-details="true"
												:solo-inverted="true"
												:label="$t('forms.sorting.nameShort')"
											/>
										</td>
										<td>
											<VtDirectionButton
												v-model="sortColumnDirection1"
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</v-col>
						<v-col cols="12" md="4">
							<table
								border="0"
								cellspacing="0"
								cellpadding="0"
								style="width: 100%;"
							>
								<tbody>
									<tr>
										<td
											style="padding-right: 4px"
										>
											<VtSelect
												ref="sortColumn2Ref"
												v-model="sortColumn2"
												vid="sortColumn2"
												:items="sortColumns"
												:flat="true"
												:hide-details="true"
												:solo-inverted="true"
												:label="$t('forms.sorting.nameShort')"
											/>
										</td>
										<td>
											<VtDirectionButton
												v-model="sortColumnDirection2"
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</v-col>
						<v-col cols="12" md="4">
							<table
								border="0"
								cellspacing="0"
								cellpadding="0"
								style="width: 100%;"
							>
								<tbody>
									<tr>
										<td
											style="padding-right: 4px"
										>
											<VtSelect
												ref="sortColumn3Ref"
												v-model="sortColumn3"
												vid="sortColumn3"
												:items="sortColumns"
												:flat="true"
												:hide-details="true"
												:solo-inverted="true"
												:label="$t('forms.sorting.nameShort')"
											/>
										</td>
										<td>
											<VtDirectionButton
												v-model="sortColumnDirection3"
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
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
					<v-row dense>
						<v-col
							cols="12"
							v-for="item in items"
							:key="item.id"
							:id="item.id"
						>
							<v-card>
								<v-card-title
									class="bg-primary"
								>
									{{ item.name }}
									<div class="float-right">
										{{ addressDisplay(item) }} {{ isPublicDisplay(item) }}
									</div>
								</v-card-title>
								<v-card-text>
									<LocationView
										:detail-item="item"
										:debug="debug"
									>
									</LocationView>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
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
				</v-col>
				<v-col
					class="mb-4"
					v-show="colsEditPanel"
					:cols="colsEditPanel"
				>
					<Location
						:model-value="detailItem"
						@cancel="detailClose"
						@close="detailClose"
						@error="detailError"
						@ok="detailOk"
						@dirty="detailDirtyCallback"
						:debug="debug"
					>
					</Location>
				</v-col>
			</v-row>
		</template>
	</VtFormListing>
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

import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useLocationsBaseComponent } from '@/components/content/locations/locationsComponent';
import { useLocationsBaseComponentProps } from '@/components/content/locations/locationsComponentProps';
import { useLocationsFilterValidation } from '@/components/content/locations/locationsFilterValidation';
import { useMasterDetailComponentProps } from '@/components/content/masterDetailComponentProps';

import ContentHeader from '@/components/content/Header';
import LocationView from '@/components/content/locations/location/LocationView';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import Location from '@/components/content/locations/location/Location';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtDirectionButton from '@thzero/library_client_vue3_vuetify3/components/VtDirectionButton';
import VtFormListing from '@thzero/library_client_vue3_vuetify3/components/form/VtFormListing';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'LocationsUserControl',
	components: {
		ContentHeader,
		LocationView,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		Location,
		VtConfirmationDialog,
		VtDirectionButton,
		VtFormListing,
		VtNumberFieldWithValidation,
		VtSelect,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useMasterDetailComponentProps,
		...useLocationsBaseComponentProps
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
			rocketTypes,
			organizations,
			debug,
			locationsListing,
			filterItemName,
			filterItemOrganizations,
			filterItemRocketTypes,
			filterItemShared,
			sortColumn1,
			sortColumn2,
			sortColumn3,
			sortColumnDirection1,
			sortColumnDirection2,
			sortColumnDirection3,
			title,
			buttonSearchResetDisabled,
			sortColumns,
			sortColumnsNull,
			addressDisplay,
			resetAdditional,
			scope,
			validation
		} = useLocationsBaseComponent(props, context);

		const {
			isAdmin,
			isOwner,
			isPublic,
			isPublicDisplay,
			isUser
		} = useContentSecurityComponent(props, context);

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
			rocketTypes,
			organizations,
			debug,
			locationsListing,
			filterItemName,
			filterItemOrganizations,
			filterItemRocketTypes,
			filterItemShared,
			sortColumn1,
			sortColumn2,
			sortColumn3,
			sortColumnDirection1,
			sortColumnDirection2,
			sortColumnDirection3,
			title,
			buttonSearchResetDisabled,
			sortColumns,
			sortColumnsNull,
			addressDisplay,
			resetAdditional,
			scope,
			validation,
			isPublic,
			isPublicDisplay
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useLocationsFilterValidation), {
		});
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
