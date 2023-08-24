<template>
	<ContentHeader :value="title" />
	<VFormListing
		ref="dialogRocketSetupsRef"
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
									<v-col cols="12" sm="6">
										<VTextFieldWithValidation
											ref="filterItemNameRef"
											v-model="filterItemName"
											vid="filterItemName"
											:label="$t('forms.name')"
											:validation="validation"
										/>
									</v-col>
									<v-col cols="12" sm="6">
										<VSelectWithValidation
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
									<v-col cols="6">
										<div class="d-flex">
											<VTextField
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
												{{ $t('buttons.select') + ' ' + $t('forms.content.rockets.name') }}
											</v-btn>
										</div>
									</v-col>
								</v-row>
								<v-row dense>
									<v-col cols="12" sm="6">
										<VSelectWithValidation
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
									<v-col cols="12" sm="6">
										<VTextFieldWithValidation
											ref="filterItemManufacturerStockIdRef"
											v-model="filterItemManufacturerStockId"
											vid="filterItemManufacturerStockId"
											:label="$t('forms.content.parts.manufacturerId')"
											:validation="validation"
										/>
									</v-col>
									<!-- <v-col cols="12" sm="6">
										<VTextFieldWithValidation
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
								v-if="!showDetailItem"
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
								@click="clickSearchClear"
							>
								{{ $t('buttons.clear') }}
							</v-btn>
							<v-btn
								:variant="buttonsForms.variant.ok"
								:color="buttonsForms.color.ok"
								:disabled="buttonOkDisabled"
								:loading="isLoading"
								@click="clickSearch"
							>
								{{ $t('buttons.search') }}
							</v-btn>
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
	<RocketLookupDialog
		ref="dialogRocketLookupManagerRef"
		:signal="dialogRocketLookupManager.signal"
		@close="dialogRocketLookupManager.cancel()"
		@select="selectRocket"
	/>
	<VConfirmationDialog
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

import Rocket from '@/components/content/rockets/library/rocket/Rocket';
import RocketCopyDialog from '@/components/content/rockets/library/dialogs/RocketCopyDialog';
import RocketLookupDialog from '@/components/content/rockets/dialogs/RocketLookupDialog';
import ContentHeader from '@/components/content/Header';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VFormListing from '@thzero/library_client_vue3_vuetify3/components/form/VFormListing';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextField from '@thzero/library_client_vue3_vuetify3/components/form/VTextField';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'RocketsUserControl',
	components: {
		ContentHeader,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		Rocket,
		RocketCopyDialog,
		RocketLookupDialog,
		VConfirmationDialog,
		VFormListing,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextField,
		VTextFieldWithValidation
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
			rocketTypes,
			debug,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			dialogRocketLookupManager,
			dialogRocketSetupsRef,
			filterItemDiameter,
			filterItemManufacturers,
			filterItemManufacturerStockId,
			filterItemName,
			filterItemRocketId,
			filterItemRocketName,
			filterItemRocketTypes,
			manufacturers,
			title,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			buttonSearchResetDisabled,
			clickSearch,
			clickSearchClear,
			clickSearchRockets,
			fetchManufacturers,
			manufacturer,
			measurementUnitTranslateWeight,
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
			rocketTypes,
			debug,
			diameterMeasurementUnitId,
			diameterMeasurementUnitsId,
			dialogRocketLookupManager,
			dialogRocketSetupsRef,
			filterItemDiameter,
			filterItemManufacturers,
			filterItemManufacturerStockId,
			filterItemName,
			filterItemRocketId,
			filterItemRocketName,
			filterItemRocketTypes,
			manufacturers,
			title,
			weightMeasurementUnitId,
			weightMeasurementUnitsId,
			buttonSearchResetDisabled,
			clickSearch,
			clickSearchClear,
			clickSearchRockets,
			fetchManufacturers,
			manufacturer,
			measurementUnitTranslateWeight,
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