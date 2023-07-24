<template>
	<ContentHeader :value="title" />
	<VFormListing
		ref="dialogChecklistsLookupRef"
		:reset-additional="resetAdditional"
		:validation="validation"
		:debug="debug"
		:visible="!showDetailItem || showList"
	>
		<template #default="{ buttonOkDisabled, isLoading }">
			<v-row dense>
				<v-col cols="12">
					<v-card>
						<v-card-text>
							<slot name="filters">
								<v-row dense>
									<v-col cols="12" md="6">
										<VTextFieldWithValidation
											ref="filterItemNameRef"
											v-model="filterItemName"
											vid="filterItemName"
											:label="$t('forms.name')"
											:validation="validation"
										/>
									</v-col>
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
							</slot>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn
								v-if="!showDetailItem"
								color="blue"
								variant="flat"
								@click="handleAdd(item)"
							>
								{{ $t('buttons.add') }}
							</v-btn>
							<v-btn
								variant="flat"
								color="primary"
								:loading="isLoading"
								@click="clickSearchClear"
							>{{ $t('buttons.clear') }}</v-btn>
							<v-btn
								variant="flat"
								color="green"
								:disabled="buttonOkDisabled"
								:loading="isLoading"
								@click="clickSearch"
							>{{ $t('buttons.search') }}</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
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
										color="blue"
										variant="flat"
										:disabled="isCopying(item)"
										@click="dialogCopyOpen(item)"
									>
										{{ $t('buttons.copy') }}
									</v-btn>
									<v-btn
										v-if="canDelete(item)"
										color="red"
										variant="flat"
										:disabled="isDeleting(item)"
										@click="dialogDeleteOpen(item)"
									>
										{{ $t('buttons.delete') }}
									</v-btn>
									<v-btn
										v-if="canEdit(item)"
										color="blue"
										variant="flat"
										@click="handleEdit(item)"
									>
										{{ $t('buttons.edit') }}
									</v-btn>
									<v-btn
										v-if="canStart(item)"
										color="green"
										variant="flat"
										:disabled="isStarting(item)"
										@click="dialogStartOpen(item)"
									>
										{{ $t('buttons.start') }}
									</v-btn>
									<v-btn
										v-if="canView(item)"
										color="green"
										variant="flat"
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
			detailClose,
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
			debug,
			dialogChecklistsLookupRef,
			dialogStartManager,
			dialogStartMessage,
			title,
			canStart,
			checklistTypeIcon,
			checklistTypeIconDetermine,
			dialogStartCancel,
			clickSearch,
			clickSearchClear,
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
			detailClose,
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
			debug,
			dialogChecklistsLookupRef,
			dialogStartManager,
			dialogStartMessage,
			title,
			canStart,
			checklistTypeIcon,
			checklistTypeIconDetermine,
			dialogStartCancel,
			clickSearch,
			clickSearchClear,
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
			validation:
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
