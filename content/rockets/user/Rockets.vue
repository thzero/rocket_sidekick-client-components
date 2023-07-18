<template>
	<ContentHeader :value="title" />
	<VFormListing
		ref="dialogRocketsLookupRef"
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
						>
							<v-card>
								<v-card-title>
									<slot name="panelTitle" :item="item">
										{{ item.name }}
									</slot>
									<div class="float-right">{{ manufacturer(item) }}</div>
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
					class="mb-4"
					v-show="colsEditPanel"
					:cols="colsEditPanel"
				>
					<slot :detailItem="detailItem" :detailClose="detailClose" :detailError="detailError" :detailOk="detailOk" :debug="debug">
						<Rocket
							:model-value="detailItem"
							@cancel="detailClose"
							@close="detailClose"
							@error="detailError"
							@ok="detailOk"
							:debug="debug"
						>
						</Rocket>
					</slot>
				</v-col>
			</v-row>
		</template>
	</VFormListing>
	<RocketCopyDialog
		ref="dialogCopyRef"
		:params="dialogCopyParams"
		:signal="dialogCopyManager.signal"
		@close="dialogCopyCancel"
		@error="dialogCopyError"
		@ok="dialogCopyOk"
	/>
	<VConfirmationDialog
		ref="dialoDeleteRef"
		:message="dialogDeleteMessage"
		:messageRaw=true
		:signal="dialogDeleteManager.signal"
		@cancel="dialogDeleteCancel"
		@error="dialogDeleteError"
		@ok="dialogDeleteOk"
	/>
</template>

<script>
import useVuelidate from '@vuelidate/core';

import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useMasterDetailComponentProps } from '@/components/content/masterDetailComponentProps';
import { useRocketsBaseComponent } from '@/components/content/rockets/user/rocketsComponent';
import { useRocketsBaseComponentProps } from '@/components/content/rockets/user/rocketsComponentProps';
import { useRocketsFilterValidation } from '@/components/content/rockets/user/rocketsFilterValidation';

import Rocket from '@/components/content/rockets/user/rocket/Rocket';
import RocketCopyDialog from '@/components/content/rockets/user/dialogs/RocketCopyDialog';
import ContentHeader from '@/components/content/Header';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VFormListing from '@thzero/library_client_vue3_vuetify3/components/form/VFormListing';

export default {
	name: 'Rockets',
	components: {
		Rocket,
		RocketCopyDialog,
		ContentHeader,
		VConfirmationDialog,
		VFormListing
	},
	props: {
		...useMasterDetailComponentProps,
		...useRocketsBaseComponentProps
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
			dialogDeleteParams,
			fetch,
			handleAdd,
			handleEdit,
			handleView,
			initEdit,
			initNew,
			initView,
			isCopying,
			isDeleting,
			display,
			debug,
			detailItemDescription,
			detailItemDiameter,
			detailItemManufacturers,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemWeight,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			dialogRocketsLookupRef,
			manufacturers,
			title,
			buttonSearchResetDisabled,
			clickSearch,
			clickSearchClear,
			fetchManufacturers,
			manufacturer,
			measurementUnitTranslateWeight,
			resetAdditional
		} = useRocketsBaseComponent(props, context);

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
			dialogDeleteParams,
			fetch,
			handleAdd,
			handleEdit,
			handleView,
			initEdit,
			initNew,
			initView,
			isCopying,
			isDeleting,
			display,
			debug,
			detailItemDescription,
			detailItemDiameter,
			detailItemManufacturers,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemWeight,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			dialogRocketsLookupRef,
			manufacturers,
			title,
			buttonSearchResetDisabled,
			clickSearch,
			clickSearchClear,
			fetchManufacturers,
			manufacturer,
			measurementUnitTranslateWeight,
			resetAdditional,
			scope: 'RocketsFilterControl',
			validation: useVuelidate({ $scope: 'RocketsFilterControl' })
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketsFilterValidation), {
		});
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
