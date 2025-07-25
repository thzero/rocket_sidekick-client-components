<template>
	<ContentHeader :value="title" />
	<VtFormListing
		ref="rocketSetupsRef"
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
									<slot name="panelTitle" :item="item">
										&nbsp;
										<!-- <a class="text-contrast" :href="'/user/rockets/' + item.rocket.id">{{ item.rocket.name }}</a> -->
										<router-link
											:to="'/user/rockets/' + item.rocket.id"
											class="text-contrast router-link"
										>
											{{ item.rocket.name }}
										</router-link>
									</slot>
									<!-- <div class="float-right">{{ manufacturer(item) }}</div> -->
									<div class="float-right">
										{{ rocketDiameterHighest(item.rocket.stages) }}
										<!-- {{ rocketMotors(item.rocket) }} -->
									</div>
									<img :src="rocketTypeIcon(item.rocket)" style="height: 48px; float: left;" />
								</v-card-title>
								<v-card-text>
										<!-- v-if="item.description" -->
										<slot name="panelText" :item="item">
											<RocketSetupView
												:detailItem="item"
												:manufacturers="manufacturers"
											/>
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
				</v-col>
				<v-col
					class="mb-4"
					v-show="colsEditPanel"
					:cols="colsEditPanel"
				>
					<slot :detailItem="detailItem" :detailClose="detailClose" :detailError="detailError" :detailOk="detailOk" :debug="debug">
						<RocketSetup
							:model-value="detailItem"
							:manufacturers="manufacturers"
							@cancel="detailClose"
							@close="detailClose"
							@error="detailError"
							@ok="detailOk"
							@dirty="detailDirtyCallback"
							:debug="debug"
						>
						</RocketSetup>
					</slot>
				</v-col>
			</v-row>
		</template>
	</VtFormListing>
	<RocketSetupCopyDialog
		ref="dialogCopyRef"
		:params="dialogCopyParams"
		:signal="dialogCopyManager.signal"
		@close="dialogCopyCancel"
		@error="dialogCopyError"
		@ok="dialogCopyOk"
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
import { useRocketSetupsBaseComponent } from '@/components/content/rockets/setups/rocketSetupsComponent';
import { useRocketSetupsBaseComponentProps } from '@/components/content/rockets/setups/rocketSetupsComponentProps';
import { useRocketSetupsFilterValidation } from '@/components/content/rockets/setups/rocketSetupsFilterValidation';

import RocketLookupDialog from '@/components/content/rockets/dialogs/RocketLookupDialog';
import RocketSetup from '@/components/content/rockets/setups/setup/RocketSetup';
import RocketSetupCopyDialog from '@/components/content/rockets/setups/dialogs/RocketSetupCopyDialog';
import ContentHeader from '@/components/content/Header';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormListing from '@thzero/library_client_vue3_vuetify3/components/form/VtFormListing';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketSetupView from '@/components/content/rockets/setups/setup/RocketSetupView';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'RocketsSetupsUserControl',
	components: {
		ContentHeader,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		RocketLookupDialog,
		RocketSetup,
		RocketSetupCopyDialog,
		RocketSetupView,
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
		...useRocketSetupsBaseComponentProps
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
			rocketDiameterHighest,
			rocketMotors,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			debug,
			rocketSetupsRef,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			dialogRocketLookupManager,
			filterItemDiameter,
			filterItemManufacturers,
			filterItemManufacturerStockId,
			filterItemName,
			filterItemRocketId,
			filterItemRocketName,
			filterItemRocketTypes,
			manufacturers,
			title,
			buttonSearchResetDisabled,
			clickSearchRockets,
			fetchManufacturers,
			manufacturer,
			resetAdditional,
			selectRocket,
			scope,
			validation
		} = useRocketSetupsBaseComponent(props, context);

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
			rocketDiameterHighest,
			rocketMotors,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			debug,
			rocketSetupsRef,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			dialogRocketLookupManager,
			filterItemDiameter,
			filterItemManufacturers,
			filterItemManufacturerStockId,
			filterItemName,
			filterItemRocketId,
			filterItemRocketName,
			filterItemRocketTypes,
			manufacturers,
			title,
			buttonSearchResetDisabled,
			clickSearchRockets,
			fetchManufacturers,
			manufacturer,
			resetAdditional,
			selectRocket,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketSetupsFilterValidation), {
		});
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
