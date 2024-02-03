<template>
	<ContentHeader :value="title" />
	<VtFormListing
		ref="partsRef"
		:pre-complete-ok="search"
		:reset-additional="resetAdditional"
		:validation="validation"
		:debug="debug"
		:visible="!showDetailItem || showList"
		:filter-drawer="true"
		:filter-disabled="detailDirty"
	>
		<template #default="{ buttonOkDisabled, filterDrawer, isLoading, reset, submit }">
			<v-row >
				<v-col cols="12">
					<v-card>
						<v-card-text>
							<slot name="filters" :filterDrawer="filterDrawer"></slot>
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
				</v-col>
			</v-row>
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
				<v-col cols="12">
					asdsadfsd
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
						>
							<v-card>
								<v-card-title
									class="bg-primary"
								>
									<slot name="panelTitle" :item="item">
										{{ item.name }}
									</slot>
									<span
										v-if="item.weight"
									>
										({{item.weight}} {{ measurementUnitTranslateWeight(item.weightMeasurementUnitsId, item.weightMeasurementUnitId) }})
									</span>
									<div class="float-right">{{ manufacturer(item) }} {{ isPublicDisplay(item) }}</div>
								</v-card-title>
								<v-card-text
									>
										<!-- v-if="item.description" -->
										<slot name="panelText" :item="item">
											{{ item.description }}
										</slot>
										<div
											v-if="debug"
										>
											canCopy [[ {{ canCopy(item) }}]]
											canDelete [[ {{ canDelete(item) }}]]
											canEdit [[ {{ canEdit(item) }}]]
											canView [[ {{ canView(item) }}]]
										</div>
								</v-card-text>
								<v-card-actions>
									<v-chip
										v-if="isPublic(item)"
									>
										{{  $t('strings.content.parts.isPublic') }}
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
				<v-col
					class="mb-4"
					v-show="colsEditPanel"
					:cols="colsEditPanel"
				>
					<slot :detailItem="detailItem" :detailClose="detailClose" :detailDirtyCallback="detailDirtyCallback" :detailError="detailError" :detailOk="detailOk" :debug="debug" />
				</v-col>
			</v-row>
		</template>
	</VtFormListing>
	<PartCopyDialog
		ref="dialogCopyRef"
		:params="dialogCopyParams"
		:signal="dialogCopyManager.signal"
		@close="dialogCopyCancel"
		@error="dialogCopyError"
		@ok="dialogCopyOk"
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
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useMasterDetailComponentProps } from '@/components/content/masterDetailComponentProps';
import { usePartsBaseComponent } from '@/components/content/parts/partsComponent';
import { usePartsBaseComponentProps } from '@/components/content/parts/partsComponentProps';

import PartCopyDialog from '@/components/content/parts/dialogs/PartCopyDialog';
import ContentHeader from '@/components/content/Header';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormListing from '@thzero/library_client_vue3_vuetify3/components/form/VtFormListing';

export default {
	name: 'Parts',
	components: {
		PartCopyDialog,
		ContentHeader,
		VtConfirmationDialog,
		VtFormListing
	},
	props: {
		...useMasterDetailComponentProps,
		...usePartsBaseComponentProps
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
			partsRef,
			manufacturers,
			params,
			title,
			buttonSearchResetDisabled,
			manufacturer,
			measurementUnitTranslateWeight,
			resetAdditional
		} = usePartsBaseComponent(props, context);

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
			partsRef,
			manufacturers,
			params,
			title,
			buttonSearchResetDisabled,
			manufacturer,
			measurementUnitTranslateWeight,
			resetAdditional,
			isPublic,
			isPublicDisplay
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
