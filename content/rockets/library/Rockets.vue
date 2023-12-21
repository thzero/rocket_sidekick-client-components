<template>
	<ContentHeader :value="title" />
	<VtFormListing
		ref="rocketsref"
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
								<VtSelectWithValidation
									ref="filterItemRocketTypesRef"
									v-model="filterItemRocketTypes"
									vid="filterItemRocketTypes"
									multiple
									:max-values="3"
									:items="rocketTypes"
									:validation="validation"
									:label="$t('forms.content.rockets.level')"
									:hint="$t('forms.content.rockets.level')"
								/>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12" :sm="filterDrawer ? 12: 6">
								<VtSelectWithValidation
									ref="filterItemManufacturersRef"
									v-model="filterItemManufacturers"
									vid="filterItemManufacturers"
									multiple
									:max-values="3"
									:items="manufacturers"
									:validation="validation"
									:label="$t('forms.content.manufacturer.plural')"
									:hint="$t('forms.content.manufacturer.plural_hint')"
								/>
							</v-col>
							<v-col cols="12" :sm="filterDrawer ? 12: 6">
								<VtTextFieldWithValidation
									ref="filterItemManufacturerStockIdRef"
									v-model="filterItemManufacturerStockId"
									vid="filterItemManufacturerStockId"
									:label="$t('forms.content.parts.manufacturerId')"
									:validation="validation"
								/>
							</v-col>
							<!-- 
							<v-col cols="12" :sm="filterDrawer ? 12: 6">
								<VtTextFieldWithValidation
									ref="filterItemDiameterRef"
									v-model="filterItemDiameter"
									vid="filterItemDiameter"
									:label="$t('forms.content.parts.diameter')"
									:validation="validation"
								/>
							</v-col> -->
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
				:disabled="isLoading"
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
							:key="item.id"
						>
							<v-card>
								<v-card-title
									class="bg-primary"
								>
									&nbsp;{{ item.name }}
									<!-- <div class="float-right">{{ manufacturer(item) }}</div> -->
									<div class="float-right">
										{{ rocketDiameter(item.stages) }},
										{{ rocketMotorMountNames(item) }}
									</div>
									<img :src="rocketTypeIcon(item)" style="height: 48px; float: left;" />
								</v-card-title>
								<v-card-text>
									<RocketView
										:detailItem="item"
										:manufacturers="manufacturers"
									/>
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
					<Rocket
						:model-value="detailItem"
						:manufacturers="manufacturers"
						@cancel="detailClose"
						@close="detailClose"
						@error="detailError"
						@ok="detailOk"
						@dirty="detailDirtyCallback"
						:debug="debug"
					>
					</Rocket>
				</v-col>
			</v-row>
		</template>
	</VtFormListing>
	<RocketCopyDialog
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
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useMasterDetailComponentProps } from '@/components/content/masterDetailComponentProps';
import { useRocketsBaseComponent } from '@/components/content/rockets/library/rocketsComponent';
import { useRocketsBaseComponentProps } from '@/components/content/rockets/library/rocketsComponentProps';
import { useRocketsFilterValidation } from '@/components/content/rockets/library/rocketsFilterValidation';

import ContentHeader from '@/components/content/Header';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import Rocket from '@/components/content/rockets/library/rocket/Rocket';
import RocketCopyDialog from '@/components/content/rockets/library/dialogs/RocketCopyDialog';
import RocketView from '@/components/content/rockets/library/rocket/RocketView';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormListing from '@thzero/library_client_vue3_vuetify3/components/form/VtFormListing';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'RocketsUserControl',
	components: {
		ContentHeader,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		Rocket,
		RocketCopyDialog,
		RocketView,
		VtConfirmationDialog,
		VtFormListing,
		VtMarkdown,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
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
			search,
			display,
			buttonsDialog,
			buttonsForms,
			rocketTypes,
			rocketDiameter,
			rocketLength,
			rocketMotorMountNames,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			debug,
			rocketsref,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			filterItemDiameter,
			filterItemManufacturers,
			filterItemManufacturerStockId,
			filterItemName,
			filterItemRocketTypes,
			filterItemWeight,
			manufacturers,
			title,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			buttonSearchResetDisabled,
			fetchManufacturers,
			manufacturer,
			measurementUnitTranslateWeight,
			resetAdditional,
			scope,
			validation
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
			search,
			display,
			buttonsDialog,
			buttonsForms,
			rocketTypes,
			rocketDiameter,
			rocketLength,
			rocketMotorMountNames,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			debug,
			rocketsref,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			filterItemDiameter,
			filterItemManufacturers,
			filterItemManufacturerStockId,
			filterItemName,
			filterItemRocketTypes,
			filterItemWeight,
			manufacturers,
			title,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			buttonSearchResetDisabled,
			fetchManufacturers,
			manufacturer,
			measurementUnitTranslateWeight,
			resetAdditional,
			scope,
			validation
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
