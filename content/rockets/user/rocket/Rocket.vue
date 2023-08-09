<template>
	<div
		v-if="debug"
	>
		[[ invalid {{ invalid }} ]]
		[[ dirty {{ dirty }} ]]
		[[ isEditable {{ isEditable }} ]]
		[[ isNew {{ isNew }} ]]
		[[ canAddSecondary {{ canAddSecondary }} ]]
		[[ canDeleteSecondary {{ canDeleteSecondary }} ]]
		[[ canEditSecondary {{ canEditSecondary }} ]]
		<!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
		<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
		<!-- <div>[[ detailItemData {{ JSON.stringify(detailItemData) }} ]] </div> -->
	</div>
	<VFormControl
		ref="formControlRef"
		:validation="validation"
		:button-close="true"
		:button-clear="isEditable"
		button-clear-name="buttons.reset"
		:button-delete="false"
		:button-ok="isEditable"
		:dirty-callback="dirtyCallback"
		:invalid-callback="invalidCallback"
		:readonly="!isEditable "
		:reset-additional="resetAdditional"
		:pre-complete-ok="preCompleteOk"
		@cancel="handleCancel"
		@ok="handleOk"
		:debug="debug"
	>
		<v-row dense>
			<v-col cols="12" md="8">
				<VTextFieldWithValidation
					ref="nameRef"
					v-model="detailItemName"
					vid="detailItemName"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.name')"
					:counter="30"
				/>
			</v-col>
			<v-col cols="12" md="4">
				<VSelectWithValidation
					ref="detailItemRocketTypeRef"
					v-model="detailItemRocketType"
					vid="detailItemRocketType"
					:items="rocketTypes"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.type')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VTextAreaWithValidation
					ref="descriptionRef"
					v-model="detailItemDescription"
					vid="detailItemDescription"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.description')"
					:counter="30"
					:clearable="isEditable"
					:rows="detailItemTextRows"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="8">
				<VSelectWithValidation
					ref="manufacturerRef"
					v-model="detailItemManufacturer"
					vid="detailItemManufacturer"
					:items="manufacturers"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.manufacturer.name')"
				/>
			</v-col>
			<v-col cols="4">
				<VTextFieldWithValidation
					ref="detailItemManufacturerStockIdRef"
					v-model="detailItemManufacturerStockId"
					vid="detailItemManufacturerStockId"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.manufacturerId')"
					:counter="30"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemDiameterMajorRef"
					v-model="detailItemDiameterMajor"
					vid="detailItemDiameterMajor"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.diameter.major')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="detailItemDiameterMajorMeasurementUnitsIdRef"
								v-model="detailItemDiameterMajorMeasurementUnitsId"
								vid="detailItemDdiameterMajorMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="detailItemDiameterMajorMeasurementUnitIdRef"
								v-model="detailItemDiameterMajorMeasurementUnitId"
								vid="detailItemDiameterMajorMeasurementUnitId"
								:measurementUnitsId="detailItemDiameterMajorMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemLengthRef"
					v-model="detailItemLength"
					vid="detailItemLength"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.length')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="detailItemLengthMeasurementUnitsIdRef"
								v-model="detailItemLengthMeasurementUnitsId"
								vid="detailItemLengthMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="detailItemLengthMeasurementUnitIdRef"
								v-model="detailItemLengthMeasurementUnitId"
								vid="detailItemLengthMeasurementUnitId"
								:measurementUnitsId="detailItemLengthMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemWeightRef"
					v-model="detailItemWeight"
					vid="detailItemWeight"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.parts.weight')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="detailItemWeightMeasurementUnitsIdRef"
								v-model="detailItemWeightMeasurementUnitsId"
								vid="detailItemWeightMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="detailItemWeightMeasurementUnitIdRef"
								v-model="detailItemWeightMeasurementUnitId"
								vid="detailItemWeighttMeasurementUnitId"
								:measurementUnitsId="detailItemWeightMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsWeightType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.weight')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemCgRef"
					v-model="detailItemCg"
					vid="detailItemCg"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.cg')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="detailItemCgMeasurementUnitsIdRef"
								v-model="detailItemCgMeasurementUnitsId"
								vid="detailItemCgMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="detailItemCgMeasurementUnitIdRef"
								v-model="detailItemCgMeasurementUnitId"
								vid="detailItemCgMeasurementUnitId"
								:measurementUnitsId="detailItemCgMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col cols="5" md="2">
				<VNumberFieldWithValidation
					ref="detailItemCpRef"
					v-model="detailItemCp"
					vid="detailItemCp"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.cp')"
				/>
			</v-col>
			<v-col cols="7" md="4">
				<table>
					<tr>
						<td class="measurementUnits">
							<MeasurementUnitsSelect
								ref="detailItemCpMeasurementUnitsIdRef"
								v-model="detailItemCpMeasurementUnitsId"
								vid="detailItemCpMeasurementUnitsId"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.title')"
							/>
						</td>
						<td class="measurementUnits">
							<MeasurementUnitSelect
								ref="detailItemCpMeasurementUnitIdRef"
								v-model="detailItemCpMeasurementUnitId"
								vid="detailItemCpMeasurementUnitId"
								:measurementUnitsId="detailItemCpMeasurementUnitsId"
								:measurementUnitsType="measurementUnitsLengthType"
								:validation="validation"
								:readonly="!isEditable"
								:label="$t('forms.settings.measurementUnits.length')"
							/>
						</td>
					</tr>
				</table>
			</v-col>
		</v-row>
		<template v-slot:buttons_pre>
			<v-btn
				v-if="canAddSecondary"
				class="mr-2"
				color="primary"
			>
				{{ $t('buttons.add') }}
				<v-menu 
					activator="parent"
					location="top"
				>
					<v-list>
					<v-list-item>
						<v-btn
							variant="flat"
							color="purple"
							@click="clickAltimetersSearch"
						>
							{{ $t('forms.content.parts.altimeter.name') }}
						</v-btn>
					</v-list-item>
					<v-list-item>
						<v-btn
							variant="flat"
							color="orange"
							@click="clickRecoverySearch"
						>
							{{ $t('forms.content.parts.recovery') }}
						</v-btn>
					</v-list-item>
					<v-list-item>
						<v-btn
							variant="flat"
							color="blue"
							@click="clickTrackersSearch"
						>
							{{ $t('forms.content.parts.tracker.name') }}
						</v-btn>
					</v-list-item>
					<v-list-item
						v-if="canAddSecondary"
					>
						<v-btn
							:variant="buttonsForms.variant.ok"
							:color="buttonsForms.color.ok"
							@click="handleAddSecondary"
						>
							{{ $t('forms.content.rockets.stage.name') }}
						</v-btn>
					</v-list-item>
					</v-list>
				</v-menu>
			</v-btn>
			<span
				v-if="canAddSecondary"
				class="mr-2"
			>|</span>
		</template>
		<template v-slot:buttons_post>
			<!-- <div 
				v-if="$vuetify.display.xs"
				class="mt-2"
			>>
				<v-btn
					v-if="canAddSecondary"
					class="mr-2"
					variant="flat"
					color="primary"
				>
					{{ $t('buttons.add') }}
					<v-menu 
						activator="parent"
						location="top"
					>
						<v-list>
						<v-list-item>
							<v-btn
								variant="flat"
								color="purple"
							>
								{{ $t('buttons.rockets.tracers') }}
							</v-btn>
						</v-list-item>
						<v-list-item>
							<v-btn
								variant="flat"
								color="blue"
								@click="clickRecoverySearch"
							>
								{{ $t('buttons.rockets.recovery') }}
							</v-btn>
						</v-list-item>
						<v-list-item
							v-if="canAddSecondary"
						>
							<v-btn
								:variant="buttonsForms.variant.ok"
								:color="buttonsForms.color.ok"
								@click="handleAddSecondary"
							>
								{{ $t('buttons.rockets.stage') }}
							</v-btn>
						</v-list-item>
						</v-list>
					</v-menu>
				</v-btn>
			</div> -->
		</template>
		<template v-slot:after>	
			<v-expansion-panels
				v-model="panels"
				class="mt-4"
				multiple
				@update:modelValue="panelsUpdated"
			>
				<v-expansion-panel
					v-if="altimeters"
					:value="altimeters"
				>
					<v-expansion-panel-title
						color="primary"
					>
						{{ $t(`forms.content.parts.altimeter.plural`) }}
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<RocketParts
							class="mt-2"
							:items="altimeters"
							:typeId="altimeters"
							:deletable="isEditable"
						>
						</RocketParts>
						<!-- @delete="clickAltimeterDelete" -->
					</v-expansion-panel-text>
				</v-expansion-panel>
				<v-expansion-panel
					v-if="recovery"
					:value="recovery"
				>
					<v-expansion-panel-title
						color="primary"
					>
						{{ $t(`forms.content.parts.recovery`) }}
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<RocketParts
							class="mt-2"
							:id="rocketId"
							:items="recovery"
							:typeId="recovery"
							:deletable="isEditable"
						>
						</RocketParts>
						<!-- @delete="clickRecoveryDelete" -->
					</v-expansion-panel-text>
				</v-expansion-panel>
				<v-expansion-panel
					v-if="trackers"
					:value="trackers"
				>
					<v-expansion-panel-title
						color="primary"
					>
						{{ $t(`forms.content.parts.tracker.plural`) }}
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<RocketParts
							class="mt-2"
							:id="rocketId"
							:items="trackers"
							:typeId="trackers"
							:deletable="isEditable"
						>
						</RocketParts>
						<!-- @delete="clickRecoveryDelete" -->
					</v-expansion-panel-text>
				</v-expansion-panel>
				<v-expansion-panel
					v-if="stages"
					:value="stages"
				>
					<v-expansion-panel-title
						color="primary"
					>
						{{ $t(`forms.content.rockets.stage.name`) }}
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<v-row
							dense
							class="mt-2"
						>
							<v-col>
								<v-expansion-panels
									v-model="stagesPanels"
									multiple
									@update:modelValue="stagesPanelsUpdated"
								>
									<v-expansion-panel
										v-for="item in stages" 
										:key="item.id"
										:value="item.id"
									>
										<v-expansion-panel-title
											color="secondary"
										>
											{{ item.name}}
										</v-expansion-panel-title>
										<v-expansion-panel-text>
											<RocketStage
												:item="item"
												:isEditable="isEditable"
												:debug="debug"
											>
												<template 
													v-if="isEditable"
													v-slot:actionsEdit
												>	
													<div class="pl-4 pr-4 pb-2 pt-2">
														<v-btn
															v-if="isEditable"
															:variant="buttonsForms.variant.delete"
															:color="buttonsForms.color.delete"
															class="mr-2"
															:disabled="isDeletingSecondary(item)"
															@click="dialogDeleteSecondaryOpen(item)"
														>
															{{ $t('buttons.delete') }}
														</v-btn>
														<v-btn
															v-if="isEditable"
															:variant="buttonsForms.variant.edit"
															:color="buttonsForms.color.edit"
															:disabled="isEditingSecondary(item)"
															@click="dialogEditSecondaryOpen(item)"
														>
															{{ $t('buttons.edit') }}
														</v-btn>
													</div>
												</template>
											</RocketStage>
										</v-expansion-panel-text>
									</v-expansion-panel>
								</v-expansion-panels>
							</v-col>
						</v-row>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
			<!-- <div
				v-if="altimeters"
				class="mt-4"
			>
				<v-sheet
					color="blue"
					rounded
				>
					<div class="pl-6 pr-4 pb-4 pt-2">
						<h3>{{ $t(`forms.content.parts.altimeter.plural`) }}</h3>
					</div>
				</v-sheet>
				<RocketParts
					class="ml-4 mt-4"
					:items="altimeters"
					:typeId="altimeters"
					:deletable="isEditable"
				>
				</RocketParts>
			</div>
			<div
				v-if="recovery"
				class="mt-4"
			>
				<v-sheet
					color="blue"
					rounded
				>
					<div class="pl-6 pr-4 pb-4 pt-2">
						<h3>{{ $t(`forms.content.parts.recovery`) }}</h3>
					</div>
				</v-sheet>
				<RocketParts
					class="ml-4 mt-4"
					:id="rocketId"
					:items="recovery"
					:typeId="recovery"
					:deletable="isEditable"
				>
				</RocketParts>
			</div>
			<div
				v-if="trackers"
				class="mt-4"
			>
				<div class="pl-6 pr-4 pb-4 pt-2">
					<h3>{{ $t(`forms.content.parts.tracker.plural`) }}</h3>
				</div>
				<RocketParts
					class="ml-4 mt-4"
					:items="trackers"
					:typeId="trackers"
					:deletable="isEditable"
				>
				</RocketParts>
			</div>
			<div
				v-if="stages"
				class="mt-4"
			>
				<v-sheet
					color="blue"
					rounded
				>
					<div class="pl-6 pr-4 pb-4 pt-2">
						<h3>{{ $t(`forms.content.rockets.stage.plural`) }}</h3>
					</div>
				</v-sheet>
				<v-row
					dense
					class="ml-4 mt-4"
				>
					<v-col>
						<v-expansion-panels
							v-model="				{{ $t('buttons.add') }}
anels"
							multiple
							@update:modelValue="stagesPanelsUpdated"
						>
							<v-expansion-panel
								v-for="item in stages" 
								:key="item.id"
								:value="item.id"
							>
								<v-expansion-panel-title
									color="secondary"
								>
									{{ item.name}}
								</v-expansion-panel-title>
								<v-expansion-panel-text>
									<RocketStage
										:item="item"
										:isEditable="isEditable"
										:debug="debug"
									>
										<template 
											v-if="isEditable"
											v-slot:actionsEdit
										>	
											<div class="pl-4 pr-4 pb-2 pt-2">
												<v-btn
													v-if="isEditable"
													:variant="buttonsForms.variant.delete"
													:color="buttonsForms.color.delete"
													class="mr-2"
													:disabled="isDeletingSecondary(item)"
													@click="dialogDeleteSecondaryOpen(item)"
												>
													{{ $t('buttons.delete') }}
												</v-btn>
												<v-btn
													v-if="isEditable"
													:variant="buttonsForms.variant.edit"
													:color="buttonsForms.color.edit"
													:disabled="isEditingSecondary(item)"
													@click="dialogEditSecondaryOpen(item)"
												>
													{{ $t('buttons.edit') }}
												</v-btn>
											</div>
										</template>g
									</RocketStage>
								</v-expansion-panel-text>
							</v-expansion-panel>
						</v-expansion-panels>
					</v-col>
				</v-row>
			</div> -->
		</template>
	</VFormControl>
	<VConfirmationDialog
		ref="dialogDeleteSecondaryRef"
		:message="dialogDeleteSecondaryMessage"
		:messageRaw=true
		:signal="dialogDeleteSecondaryManager.signal"
		@cancel="dialogDeleteSecondaryCancel"
		@error="dialogDeleteSecondaryError"
		@ok="dialogDeleteSecondaryOk"
	/>
	<RocketStageEditDialog
		v-if="!readonly"
		ref="dialogEditSecondaryRef"
		:debug="debug"
		:pre-complete-ok="dialogEditSecondaryPreCompleteOk"
		:value="dialogEditSecondaryParams"
		:signal="dialogEditSecondaryManager.signal"
		@close="dialogEditSecondaryCancel"
		@ok="dialogEditSecondaryOk"
		width="90%"
	/>
	<RecoveryLookupDialog
		ref="dialogRecoverySearchRef"
		:signal="dialogRecoverySearchManager.signal"
		@close="dialogRecoverySearchManager.cancel()"
		@ok="selectRecovery"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useRocketValidation } from '@/components/content/rockets/user/rocket/rocketValidation';
import { useRocketEditValidation } from '@/components/content/rockets/user/rocket/rocketEditValidation';
import { useRocketComponent } from '@/components/content/rockets/user/rocket/rocketComponent';
import { useRocketComponentProps } from '@/components/content/rockets/user/rocket/rocketComponentProps';

import ChuteProtectorPanelTitle from '@/components/content/parts/chuteProtectors/ChuteProtectorPanelTitle';
import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';
import ParachutePanelTitle from '@/components/content/parts/parachutes/ParachutePanelTitle';
import StreamerPanelTitle from '@/components/content/parts/streamers/StreamerPanelTitle';

import RocketParts from '@/components/content/rockets/user/rocket/RocketParts';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketStage from '@/components/content/rockets/user/rocket/RocketStage';
import RocketStageEditDialog from '@/components/content/rockets/user/dialogs/RocketStageEditDialog';
import RecoveryLookupDialog from '@/components/content/rockets/user/dialogs/recovery/RecoveryLookupDialog';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'RocketControl',
	components: {
		ChuteProtectorPanelTitle,
		DeploymentBagPanelTitle,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		ParachutePanelTitle,
		RocketParts,
		RocketStage,
		RocketStageEditDialog,
		RecoveryLookupDialog,
		StreamerPanelTitle,
		VConfirmationDialog,
		VFormControl,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
	},
	props: {
		...useDetailComponentProps,
		...useRocketComponentProps
	},
	emits: ['cancel', 'close', 'error', 'ok'],
	setup (props, context, options) {
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
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			serviceStore,
			formControlRef,
			dirty,
			detailItem,
			dialogDeleteManager,
			dialogDeleteMessage,
			dialogDeleteParams,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isDeleting,
			isEditable,
			isNew,
			isOwner,
			dialogDeleteCancel,
			dialogDeleteError,
			dialogDeleteOk,
			dialogDeleteOpen,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			preCompleteOk,
			resetAdditional,
			dialogDeleteSecondaryManager,
			dialogDeleteSecondaryMessage,
			dialogDeleteSecondaryParams,
			dialogEditSecondaryManager,
			dialogEditSecondaryParams,
			canAddSecondary,
			canDeleteSecondary,
			canEditSecondary,
			isDeletingSecondary,
			isEditingSecondary,
			dialogDeleteSecondaryCancel,
			dialogDeleteSecondaryError,
			dialogDeleteSecondaryOk,
			dialogDeleteSecondaryOpen,
			dialogEditSecondaryCancel,
			dialogEditSecondaryError,
			dialogEditSecondaryOk,
			dialogEditSecondaryOpen,
			dialogEditSecondaryPreCompleteOk,
			handleAddSecondary,
			rocketTypes,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			altimeters,
			detailItemAltimeters,
			detailItemCg,
			detailItemCgFrom,
			detailItemCgMeasurementUnitId,
			detailItemCgMeasurementUnitsId,
			detailItemCp,
			detailItemCpFrom,
			detailItemCpMeasurementUnitId,
			detailItemCpMeasurementUnitsId,
			detailItemDescription,
			detailItemLength,
			detailItemLengthMeasurementUnitId,
			detailItemLengthMeasurementUnitsId,
			detailItemName,
			detailItemRecovery,
			detailItemTrackers,
			detailItemWeight,
			detailItemWeightMeasurementUnitId,
			detailItemWeightMeasurementUnitsId,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			recovery,
			trackers,
			dialogAltimtersSearchManager,
			dialogRecoverySearchManager,
			dialogTrackersSearchManager,
			clickAltimetersSearch,
			clickRecoverySearch,
			clickTrackersSearch,
			resetEditData,
			selectAltimter,
			selectRecovery,
			selectTracker,
			setEditData,
			detailItemDiameterMajor,
			detailItemDiameterMajorMeasurementUnitId,
			detailItemDiameterMajorMeasurementUnitsId,
			detailItemDiameterMinor,
			detailItemDiameterMinorMeasurementUnitId,
			detailItemDiameterMinorMeasurementUnitsId,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemRocketType,
			manufacturers,
			panels,
			panelsId,
			stagesPanels,
			hasAdmin,
			rocketId,
			stages,
			panelsUpdated,
			requestManufacturers,
			stagesPanelsUpdated,
			scope,
			validation
		} = useRocketComponent(props, context, options);

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
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			serviceStore,
			formControlRef,
			dirty,
			detailItem,
			dialogDeleteManager,
			dialogDeleteMessage,
			dialogDeleteParams,
			invalid,
			canDelete,
			detailItemData,
			detailItemTextRows,
			isDeleting,
			isEditable,
			isNew,
			isOwner,
			dialogDeleteCancel,
			dialogDeleteError,
			dialogDeleteOk,
			dialogDeleteOpen,
			dirtyCallback,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			preCompleteOk,
			resetAdditional,
			dialogDeleteSecondaryManager,
			dialogDeleteSecondaryMessage,
			dialogDeleteSecondaryParams,
			dialogEditSecondaryManager,
			dialogEditSecondaryParams,
			canAddSecondary,
			canDeleteSecondary,
			canEditSecondary,
			isDeletingSecondary,
			isEditingSecondary,
			dialogDeleteSecondaryCancel,
			dialogDeleteSecondaryError,
			dialogDeleteSecondaryOk,
			dialogDeleteSecondaryOpen,
			dialogEditSecondaryCancel,
			dialogEditSecondaryError,
			dialogEditSecondaryOk,
			dialogEditSecondaryOpen,
			dialogEditSecondaryPreCompleteOk,
			handleAddSecondary,
			rocketTypes,
			buttonsDialog,
			buttonsForms,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			altimeters,
			detailItemAltimeters,
			detailItemCg,
			detailItemCgFrom,
			detailItemCgMeasurementUnitId,
			detailItemCgMeasurementUnitsId,
			detailItemCp,
			detailItemCpFrom,
			detailItemCpMeasurementUnitId,
			detailItemCpMeasurementUnitsId,
			detailItemDescription,
			detailItemLength,
			detailItemLengthMeasurementUnitId,
			detailItemLengthMeasurementUnitsId,
			detailItemName,
			detailItemRecovery,
			detailItemTrackers,
			detailItemWeight,
			detailItemWeightMeasurementUnitId,
			detailItemWeightMeasurementUnitsId,
			measurementUnitsLengthDefaultId,
			measurementUnitsLengthType,
			measurementUnitsWeightDefaultId,
			measurementUnitsWeightType,
			recovery,
			trackers,
			dialogAltimtersSearchManager,
			dialogRecoverySearchManager,
			dialogTrackersSearchManager,
			clickAltimetersSearch,
			clickRecoverySearch,
			clickTrackersSearch,
			resetEditData,
			selectAltimter,
			selectRecovery,
			selectTracker,
			setEditData,
			detailItemDiameterMajor,
			detailItemDiameterMajorMeasurementUnitId,
			detailItemDiameterMajorMeasurementUnitsId,
			detailItemDiameterMinor,
			detailItemDiameterMinorMeasurementUnitId,
			detailItemDiameterMinorMeasurementUnitsId,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemRocketType,
			manufacturers,
			panels,
			panelsId,
			stagesPanels,
			hasAdmin,
			rocketId,
			stages,
			panelsUpdated,
			requestManufacturers,
			stagesPanelsUpdated,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketValidation), LibraryCommonUtility.cloneDeep(useRocketEditValidation(true)));
	}
};
</script>

<style>
.v-expansion-panel-text__wrapper {
	padding-bottom: 0px !important;
	padding-right: 0px !important;
}
</style>