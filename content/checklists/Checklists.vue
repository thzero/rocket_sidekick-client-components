<template>
	<ContentHeader :value="title" />
	<v-row dense>
		<v-col cols="12">
			<v-card
				v-if="!showDetailItem || showList"
				class="mb-4"
			>
				<v-card-text>
					filters go here
					{{ dialogDeleteMessage }}
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						v-if="!showDetailItem"
						color="blue"
						variant="flat"
						@click="handleAdd(item)"
					>
						{{ $t('buttons.add') }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
		<v-col cols="12">
			<v-snackbar
				ref="notifyRef"
				v-model="notifySignal"
				:color="notifyColor"
				:timeout="notifyTimeout"
			>
				{{ notifyMessage }}
			</v-snackbar>
			[[ colsSearchResults {{ colsSearchResults }}]]
			[[ colsEditPanel {{ colsEditPanel }}]]
			[[ showList {{ showList }}]]
			[[ showDetailItem {{ showDetailItem }}]]
			<!-- [[ detailitem {{ JSON.stringify(detailItem) }}]] -->
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
						<v-card-title>
							{{ item.name }}
							<!-- <v-chip
								v-if="isDefault"
								style="float: right;"
							>
								{{  $t('strings.content.checklists.isDefault') }}
							</v-chip> -->
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
		<v-col
			v-show="colsEditPanel"
			:cols="colsEditPanel"
		>
			<Checklist
				:model-value="detailItem"
				@cancel="detailClose"
				@close="detailClose"
				@ok="detailOk"
			>
			</Checklist>
		</v-col>
	</v-row>
	<ChecklistCopyDialog
		ref="dialogCopyRef"
		:params="dialogCopyParams"
		:signal="dialogCopyManager.signal"
		@close="dialogCopyCancel"
		@ok="dialogCopyOk"
	/>
	<VConfirmationDialog
		ref="dialoDeleteRef"
		:message="dialogDeleteMessage"
		:messageRaw=true
		:signal="dialogDeleteManager.signal"
		@cancel="dialogDeleteCancel"
		@ok="dialogDeleteOk"
	/>
	<VConfirmationDialog
		ref="dialoStartRef"
		:message="dialogStartMessage"
		:messageRaw=true
		:signal="dialogStartManager.signal"
		@cancel="dialogStartCancel"
		@ok="dialogStartOk"
	/>
</template>

<script>
import { useChecklistsBaseComponent } from '@/components/content/checklists/checklistsComponent';
import { useChecklistsBaseProps } from '@/components/content/checklists/checklistsComponentProps';

import Checklist from '@/components/content/checklists/checklist/Checklist';
import ChecklistCopyDialog from '@/components/content/checklists/dialogs/ChecklistCopyDialog';
import ContentHeader from '@/components/content/Header';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';

export default {
	name: 'Checklists',
	components: {
		Checklist,
		ChecklistCopyDialog,
		ContentHeader,
		VConfirmationDialog
	},
	props: {
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
			dialogCopyParams,
			dialogCopyOk,
			dialogCopyOpen,
			dialogDeleteCancel,
			dialogDeleteParams,
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
			display,
			dialogStartManager,
			dialogStartMessage,
			title,
			canStart,
			checklistTypeIcon,
			checklistTypeIconDetermine,
			dialogStartCancel,
			dialogStartParams,
			dialogStartOk,
			dialogStartOpen,
			params,
			isCompleted,
			isDefault,
			isInProgress,
			isShared,
			isStarting
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
			dialogCopyParams,
			dialogCopyOk,
			dialogCopyOpen,
			dialogDeleteCancel,
			dialogDeleteParams,
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
			display,
			dialogStartManager,
			dialogStartMessage,
			title,
			canStart,
			checklistTypeIcon,
			checklistTypeIconDetermine,
			dialogStartCancel,
			dialogStartParams,
			dialogStartOk,
			dialogStartOpen,
			params,
			isCompleted,
			isDefault,
			isInProgress,
			isShared,
			isStarting
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
