<template>
	<ContentHeader :value="title" />
	<VtFormListing
		ref="dialogChecklistsLookupRef"
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
							<v-col cols="12" :sm="filterDrawer ? 12: 6">
								<v-row dense>
									<v-col cols="4">
										<v-checkbox
											v-model="filterItemIsCompleted"
											density="compact"
											:label="$t('forms.content.checklists.completed')"
										/>
									</v-col>
									<v-col cols="4">
										<v-checkbox
											v-model="filterItemIsDraft"
											density="compact"
											:label="$t('forms.content.checklists.draft')"
										/>
									</v-col>
									<v-col cols="4">
										<v-checkbox
											v-model="filterItemIsInProgress"
											density="compact"
											:label="$t('forms.content.checklists.inProgress')"
										/>
									</v-col>
									<!-- <v-col cols="4">
										<v-checkbox
											v-model="filterItemYours"
											density="compact"
											:label="$t('forms.content.checklists.yours')"
										/>
									</v-col> -->
									<v-col cols="6">
										<v-checkbox
											v-model="filterItemIsTemplate"
											density="compact"
											:label="$t('forms.content.checklists.template')"
										/>
									</v-col>
									<v-col cols="6">
										<v-checkbox
											v-model="filterItemIsDefault"
											density="compact"
											:label="$t('forms.content.checklists.default')"
										/>
									</v-col>
									<!-- <v-col cols="4">
										<v-checkbox
											v-model="filterItemShared"
											density="compact"
											:label="$t('forms.content.checklists.shared')"
										/>
									</v-col> -->
								</v-row>
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
					>{{ $t('buttons.clear') }}</v-btn>
					<v-btn
						:variant="buttonsForms.variant.ok"
						:color="buttonsForms.color.ok"
						:disabled="buttonOkDisabled"
						:loading="isLoading"
						@click="clickSearch(submit)"
					>{{ $t('buttons.search') }}</v-btn>
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
							:key="item.name"
						>
							<v-card>
								<v-card-title
									:class="checklistStatusColor(item)"
								>
									&nbsp;{{ item.name }}
									<!-- <div
										v-if="item.rocketSetup && item.rocketSetup.rocket" 
										class="float-right"
									>
										<router-link
											:to="'/user/rockets/' + item.rocketSetup.rocket.id"
											class="text-contrast router-link"
										>
											{{ item.rocketSetup.rocket.name }}
										</router-link>
									</div> -->
									<!--
									<div class="float-right">
										{{ rocketDiameter(item.stages) }},
										{{ rocketMotorMountNames(item) }}
									</div> -->
									<!-- <v-icon
										style="float: left;" 
									>
										mdi-rocket-launch
									</v-icon> -->
									<!-- <img
										v-if="item.rocketSetup && item.rocketSetup && item.rocketSetup.rocket" 
										:src="rocketTypeIcon(item.rocketSetup.rocket)" style="height: 48px; float: left;" 
									/> -->
									<table style="float: left;">
										<tbody>
											<tr>
												<td>
													<v-icon
														v-if="isCompleted(item) || isLaunched(item)"
														class="mr-2"
													>
														{{  isCompleted(item) ? 'mdi-check' : '' }}
														{{  isLaunched(item) ? 'mdi-rocket' : '' }}
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
									<div class="float-right">{{ checklistDate(item) }}</div>
								</v-card-title>
								<v-card-text>
									<!-- <v-row dense>
										<v-col
											v-if="item.description"
											cols="12"
										>
											{{ item.description }}
										</v-col>
										<v-col
											cols="10"
										>
										</v-col>
										<v-col
											cols="2"
											style="text-align: right;"
										>
											{{ checklistDate(item) }}
											<VtTextField
												v-model="checklistDate(item)"
												:label="$t('forms.content.rockets.name')"
												:readonly="true"
											/>
										</v-col>
									</v-row> -->
									<ChecklistView
										:detailItem="item"
									/>
								</v-card-text>
								<v-card-actions>
									<v-chip
										v-if="isDefault(item)"
										class="mr-2"
									>
										{{  $t('strings.content.checklists.isDefault') }}
									</v-chip>
									<v-chip
										v-if="isTemplate(item)"
									>
										{{  $t('strings.content.checklists.isTemplate') }}
									</v-chip>
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
										v-if="canStart(item)"
										:variant="buttonsForms.variant.ok"
										:color="buttonsForms.color.ok"
										:disabled="isDetailOpen || isStarting(item)"
										@click="dialogStartOpen(item)"
									>
										{{ $t('buttons.start') }}
									</v-btn>
									<v-btn
										v-if="isInProgress(item)"
										:variant="buttonsForms.variant.ok"
										color="purple"
										:disabled="isDetailOpen || isStarting(item)"
										@click="handleInProgress(item)"
									>
										{{ $t('buttons.inProgress') }}
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
					<Checklist
						:model-value="detailItem"
						@cancel="detailClose"
						@close="detailClose"
						@error="detailError"
						@ok="detailOk"
						@dirty="detailDirtyCallback"
						:debug="debug"
					>
					</Checklist>
				</v-col>
			</v-row>
		</template>
	</VtFormListing>
	<ChecklistCopyDialog
		ref="dialogCopyRef"
		:params="dialogCopyParams"
		:signal="dialogCopyManager.signal"
		@close="dialogCopyCancel"
		@ok="dialogCopyOk"
	/>
	<VtConfirmationDialog
		ref="dialogDeleteRef"
		:message="dialogDeleteMessage"
		:messageRaw=true
		:signal="dialogDeleteManager.signal"
		@cancel="dialogDeleteCancel"
		@ok="dialogDeleteOk"
	/>
	<VtConfirmationDialog
		ref="dialogStartRef"
		:message="dialogStartMessage"
		:messageRaw=true
		:signal="dialogStartManager.signal"
		@cancel="dialogStartCancel"
		@ok="dialogStartOk"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useMasterDetailComponentProps } from '@/components/content/masterDetailComponentProps';
import { useChecklistsBaseComponent } from '@/components/content/checklists/checklistsComponent';
import { useChecklistsBaseProps } from '@/components/content/checklists/checklistsComponentProps';
import { useChecklistsFilterValidation } from '@/components/content/checklists/checklistsFilterValidation';

import Checklist from '@/components/content/checklists/checklist/Checklist';
import ChecklistCopyDialog from '@/components/content/checklists/dialogs/ChecklistCopyDialog';
import ChecklistView from '@/components/content/checklists/checklist/ChecklistView';
import ContentHeader from '@/components/content/Header';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormListing from '@thzero/library_client_vue3_vuetify3/components/form/VtFormListing';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'Checklists',
	components: {
		Checklist,
		ChecklistCopyDialog,
		ChecklistView,
		ContentHeader,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		VtConfirmationDialog,
		VtFormListing,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextField,
		VtTextFieldWithValidation
	},
	props: {
		...useMasterDetailComponentProps,
		...useChecklistsBaseProps
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
			rocketTypeIcon,
			debug,
			dialogChecklistsLookupRef,
			dialogStartManager,
			dialogStartMessage,
			title,
			canStart,
			checklistDate,
			checklistStatusColor,
			checklistStatusIcon,
			dialogStartCancel,
			dialogStartParams,
			filterItemName,
			filterItemIsCompleted,
			filterItemIsDefault,
			filterItemIsDraft,
			filterItemIsInProgress,
			filterItemIsTemplate,
			filterItemShared,
			filterItemYours,
			dialogStartOk,
			dialogStartOpen,
			handleInProgress,
			isCompleted,
			isDefault,
			isLaunched,
			isInProgress,
			isStarting,
			isTemplate,
			resetAdditional,
			scope,
			validation
		} = useChecklistsBaseComponent(props, context);

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
			rocketTypeIcon,
			debug,
			dialogChecklistsLookupRef,
			dialogStartManager,
			dialogStartMessage,
			title,
			canStart,
			checklistDate,
			checklistStatusColor,
			checklistStatusIcon,
			dialogStartCancel,
			dialogStartParams,
			filterItemName,
			filterItemIsCompleted,
			filterItemIsDefault,
			filterItemIsDraft,
			filterItemIsInProgress,
			filterItemIsTemplate,
			filterItemShared,
			filterItemYours,
			dialogStartOk,
			dialogStartOpen,
			handleInProgress,
			isCompleted,
			isDefault,
			isLaunched,
			isInProgress,
			isStarting,
			isTemplate,
			resetAdditional,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useChecklistsFilterValidation), {
		});
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
