<template>
	<ContentHeader :value="title" />
	<VFormListing
		ref="dialogChecklistsLookupRef"
		:pre-complete-ok="fetch"
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
								<VTextFieldWithValidation
									ref="filterItemNameRef"
									v-model="filterItemName"
									vid="filterItemName"
									:label="$t('forms.name')"
									:validation="validation"
								/>
							</v-col>
							<v-col cols="12" :sm="filterDrawer ? 12: 6">
								<v-row dense>
									<v-col cols="4" md="2">
										<v-checkbox
											v-model="filterItemYours"
											density="compact"
											:label="$t('forms.content.checklists.yours')"
										/>
									</v-col>
									<v-col cols="4" md="2">
										<v-checkbox
											v-model="filterItemIsDefault"
											density="compact"
											:label="$t('forms.content.checklists.default')"
										/>
									</v-col>
									<v-col cols="4" md="2">
										<v-checkbox
											v-model="filterItemShared"
											density="compact"
											:label="$t('forms.content.checklists.shared')"
										/>
									</v-col>
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
				:disabled="isLoading"
				@click="handleAdd(item)"
			>
				{{ $t('buttons.add') }}
			</v-btn>
		</template>
		<template v-slot:listing>
			<v-row dense>
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
								<v-card-title>
									{{ item.name }}
								</v-card-title>
								<v-card-text>
									{{ item.description }}
								</v-card-text>
								<v-card-actions>
									<v-chip
										v-if="isDefault(item)"
									>
										{{  $t('strings.content.checklists.isDefault') }}
									</v-chip>
									<v-spacer></v-spacer>
									<v-btn
										v-if="canCopy(item)"
										:variant="buttonsForms.variant.copy"
										:color="buttonsForms.color.copy"
										:disabled="isCopying(item)"
										@click="dialogCopyOpen(item)"
									>
										{{ $t('buttons.copy') }}
									</v-btn>
									<v-btn
										v-if="canDelete(item)"
										:variant="buttonsForms.variant.delete"
										:color="buttonsForms.color.delete"
										:disabled="isDeleting(item)"
										@click="dialogDeleteOpen(item)"
									>
										{{ $t('buttons.delete') }}
									</v-btn>
									<v-btn
										v-if="canEdit(item)"
										:variant="buttonsForms.variant.edit"
										:color="buttonsForms.color.edit"
										@click="handleEdit(item)"
									>
										{{ $t('buttons.edit') }}
									</v-btn>
									<v-btn
										v-if="canStart(item)"
										:variant="buttonsForms.variant.ok"
										:color="buttonsForms.color.ok"
										:disabled="isStarting(item)"
										@click="dialogStartOpen(item)"
									>
										{{ $t('buttons.start') }}
									</v-btn>
									<v-btn
										v-if="canView(item)"
										:variant="buttonsForms.variant.ok"
										:color="buttonsForms.color.ok"
										@click="handleView(item)"
									>
										{{ $t('buttons.view') }}
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</template>
	</VFormListing>
	<ChecklistCopyDialog
		ref="dialogCopyRef"
		:params="dialogCopyParams"
		:signal="dialogCopyManager.signal"
		@close="dialogCopyCancel"
		@ok="dialogCopyOk"
	/>
	<VConfirmationDialog
		ref="dialogDeleteRef"
		:message="dialogDeleteMessage"
		:messageRaw=true
		:signal="dialogDeleteManager.signal"
		@cancel="dialogDeleteCancel"
		@ok="dialogDeleteOk"
	/>
	<VConfirmationDialog
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
import ContentHeader from '@/components/content/Header';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VFormListing from '@thzero/library_client_vue3_vuetify3/components/form/VFormListing';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'Checklists',
	components: {
		Checklist,
		ChecklistCopyDialog,
		ContentHeader,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		VConfirmationDialog,
		VFormListing,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
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
			contentLoadSignal,
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
			colsEditPanel,
			colsSearchResults,
			displayEditPanel,
			displaySearchResults,
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
			isOwner,
			display,
			buttonsDialog,
			buttonsForms,
			debug,
			dialogChecklistsLookupRef,
			dialogStartManager,
			dialogStartMessage,
			title,
			canStart,
			checklistTypeIcon,
			checklistTypeIconDetermine,
			dialogStartCancel,
			dialogStartParams,
			filterItemName,
			filterItemIsDefault,
			filterItemShared,
			filterItemYours,
			dialogStartOk,
			dialogStartOpen,
			isCompleted,
			isDefault,
			isInProgress,
			isShared,
			isStarting,
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
			contentLoadSignal,
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
			colsEditPanel,
			colsSearchResults,
			displayEditPanel,
			displaySearchResults,
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
			isOwner,
			display,
			buttonsDialog,
			buttonsForms,
			debug,
			dialogChecklistsLookupRef,
			dialogStartManager,
			dialogStartMessage,
			title,
			canStart,
			checklistTypeIcon,
			checklistTypeIconDetermine,
			dialogStartCancel,
			dialogStartParams,
			filterItemName,
			filterItemIsDefault,
			filterItemShared,
			filterItemYours,
			dialogStartOk,
			dialogStartOpen,
			isCompleted,
			isDefault,
			isInProgress,
			isShared,
			isStarting,
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
