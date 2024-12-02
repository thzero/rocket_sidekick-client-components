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
		[[ validation <pre>{{ JSON.stringify(validation?.$silentErrors, null, '  ') }}</pre> ]]
		<!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
		<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
		<!-- <div>[[ detailItemData {{ JSON.stringify(detailItemData) }} ]] </div> -->
	</div>
	<VtFormControl
		ref="formControlRef"
		:validation="validation"
		:button-cancel="isEditable"
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
				<VtTextFieldWithValidation
					ref="nameRef"
					v-model="detailItemName"
					vid="detailItemName"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.name')"
					:maxcount="50"
				/>
			</v-col>
			<v-col cols="12" md="4">
				<VtSelectWithValidation
					ref="detailItemRocketTypeRef"
					v-model="detailItemRocketType"
					vid="detailItemRocketType"
					:items="rocketTypes"
					:validation="validation"
					:readonly="!isEditable"
					multiple
					:max-values="2"
					:label="$t('forms.content.rockets.type')"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<v-row dense>
					<v-col :cols="isEditable ? 12 : $vuetify.display.smAndDown ? 12 : 6">
						<VtTextAreaWithValidation
							ref="descriptionRef"
							v-model="detailItemDescription"
							vid="detailItemDescription"
							:validation="validation"
							:readonly="!isEditable"
							:label="$t('forms.description')"
							:clearable="isEditable"
							:maxcount="1000"
							:rows="detailItemTextRows"
						/>
<div
	v-if="isEditable"
	v-html="markupHint"
></div>
					</v-col>
					<v-col
						v-if="!isEditable"
						:cols="isEditable ? 12 : $vuetify.display.smAndDown ? 12 : 6"
					>
					<v-img
						:src="coverUrl"
						cover
					></v-img>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="6">
				<VtSelectWithValidation
					ref="manufacturerRef"
					v-model="detailItemManufacturer"
					vid="detailItemManufacturer"
					:items="manufacturers"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.manufacturer.name')"
				/>
			</v-col>
			<v-col cols="6">
				<VtTextFieldWithValidation
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
			<v-col cols="6">
				<VtSelectWithValidation
					ref="manufacturerRef"
					v-model="detailItemManufacturer"
					vid="detailItemManufacturer"
					:items="manufacturers"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.manufacturer.name')"
				/>
			</v-col>
			<v-col cols="6">
				<VtTextFieldWithValidation
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
			<v-col cols="12">
				<VtTextFieldWithValidation
					ref="detailItemCoverUrlRef"
					v-model="detailItemCoverUrl"
					vid="detailItemCoverUrl"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.cover') + ' ' + $t('forms.content.rockets.url')"
					:counter="255"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<h4>{{ $t('titles.content.rockets.albums.title') }}</h4>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="4" md="3">
				<VtTextFieldWithValidation
					ref="detailItemAlbumNameRef"
					v-model="detailItemAlbumName"
					vid="detailItemAlbumName"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.albums.name')"
					:counter="50"
				/>
			</v-col>
			<!-- <v-col cols="12" sm="6">
				<VtTextFieldWithValidation
					ref="detailItemAlbumTypeRef"
					v-model="detailItemAlbumType"
					vid="detailItemAlbumName"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.albums.type')"
					:counter="20"
				/>
			</v-col> -->
			<v-col cols="12" sm="8" md="9">
				<VtTextFieldWithValidation
					ref="detailItemAlbumLinkRef"
					v-model="detailItemAlbumLink"
					vid="detailItemAlbumLink"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.albums.url')"
					:counter="255"
				/>
			</v-col>
		</v-row>
		<template v-slot:buttons_pre
			v-if="$vuetify.display.mdAndUp"
		>
			<v-btn
				v-if="canAddSecondary"
				class="mr-2"
				color="primary"
				@click="handleAddVideo"
			>
				{{ $t('buttons.add') }} {{ $t('titles.content.rockets.videos.title') }}
			</v-btn>
			<v-btn
				v-if="canAddSecondary"
				class="mr-2"
				color="primary"
				@click="handleAddSecondary"
			>
				{{ $t('buttons.add') }} {{ $t('forms.content.rockets.stage.name') }}
			</v-btn>
			<span
				v-if="canAddSecondary"
				class="mr-2"
			>|</span>
		</template>
		<template v-slot:buttons_post
			v-if="$vuetify.display.smAndDown"
		>
			<br>
			<v-btn
				v-if="canAddSecondary"
				class="mr-2 mt-2"
				color="primary"
				@click="handleAddVideo"
			>
				{{ $t('buttons.add') }} {{ $t('titles.content.rockets.videos.title') }}
			</v-btn>
			<v-btn
				v-if="canAddSecondary"
				class="mt-2"
				color="primary"
				@click="handleAddSecondary"
			>
				{{ $t('buttons.add') }} {{ $t('forms.content.rockets.stage.name') }}
			</v-btn>
		</template>
		<template v-slot:after>	
			<!-- [[ {{ videosPanels  }} ]] 
			[[ {{ isNew }} ]]  -->
			<v-expansion-panels
				v-if="!isNew"
				v-model="videosPanels"
				class="mt-4"
				multiple
				@update:modelValue="videosPanelsUpdated"
			>
				<v-expansion-panel
					v-for="item in videos" 
					:key="item.id"
					:value="item.id"
				>
					<v-expansion-panel-title
						color="primary"
					>
						{{ item.name }}
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<RocketVideo
							:detail-item="item"
							:is-editable="isEditable"
							:update-video="updateVideo"
							:debug="debug"
						>
							<template
								v-slot:actionsEdit
							>	
								<v-btn
									:variant="buttonsForms.variant.delete"
									:color="buttonsForms.color.delete"
									class="mr-2"
									:disabled="isDeletingVideo(item)"
									@click="dialogDeleteVideoOpen(item)"
								>
									{{ $t('buttons.delete') }}
								</v-btn>
								<v-btn
									:variant="buttonsForms.variant.edit"
									:color="buttonsForms.color.edit"
									:disabled="isEditingVideo(item)"
									@click="dialogEditVideoOpen(item)"
								>
									{{ $t('buttons.edit') }}
								</v-btn>
							</template>
						</RocketVideo>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
			<!-- [[ {{ stagesPanels }} ]] 
			[[ {{ isNew }} ]]  -->
			<v-expansion-panels
				v-if="!isNew"
				v-model="stagesPanels"
				class="mt-4"
				multiple
				@update:modelValue="stagesPanelsUpdated"
			>
				<v-expansion-panel
					v-for="item in stages" 
					:key="item.id"
					:value="item.id"
				>
					<v-expansion-panel-title
						color="primary"
					>
						<span class="v-card-title pb-0 pl-0 pr-0 pt-0">{{ $t(`forms.content.rockets.stage.name`) }} {{ item.index  + 1 }}</span>
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<RocketStage
							:detail-item="item"
							:is-editable="isEditable"
							:manufacturers="manufacturers"
							:pre-complete-ok-rocket-part="dialogEditPreCompleteOkRocketPart"
							:update-stage="updateStage"
							:debug="debug"
						>
							<template
								v-if="isEditable"
								v-slot:actionsEdit
							>	
								<v-btn
									v-if="isEditable && !item.primary"
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
							</template>
						</RocketStage>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</template>
	</VtFormControl>
	<VtConfirmationDialog
		ref="dialogDeleteSecondaryRef"
		:message="dialogDeleteSecondaryMessage"
		:messageRaw=true
		:signal="dialogDeleteSecondaryManager.signal"
		@cancel="dialogDeleteSecondaryCancel"
		@error="dialogDeleteSecondaryError"
		@ok="dialogDeleteSecondaryOk"
	/>
	<VtConfirmationDialog
		ref="dialogDeleteVideoRef"
		:message="dialogDeleteVideoMessage"
		:messageRaw=true
		:signal="dialogDeleteVideoManager.signal"
		@cancel="dialogDeleteVideoCancel"
		@error="dialogDeleteVideoError"
		@ok="dialogDeleteVideoOk"
	/>
	<RocketStageEditDialog
		v-if="!readonly"
		ref="dialogEditSecondaryRef"
		:debug="debug"
		:manufacturers="manufacturers"
		:pre-complete-ok="dialogEditSecondaryPreCompleteOk"
		:value="dialogEditSecondaryParams"
		:signal="dialogEditSecondaryManager.signal"
		@close="dialogEditSecondaryCancel"
		@ok="dialogEditSecondaryOk"
		width="90%"
	/>
	<RocketVideoEditDialog
		v-if="!readonly"
		ref="dialogEditVideoRef"
		:debug="debug"
		:pre-complete-ok="dialogEditVideoPreCompleteOk"
		:value="dialogEditVideoParams"
		:signal="dialogEditVideoManager.signal"
		@close="dialogEditVideoCancel"
		@ok="dialogEditVideoOk"
		width="90%"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useRocketValidation } from '@/components/content/rockets/library/rocket/rocketValidation';
import { useRocketEditValidation } from '@/components/content/rockets/library/rocket/rocketEditValidation';
import { useRocketComponent } from '@/components/content/rockets/library/rocket/rocketComponent';
import { useRocketComponentProps } from '@/components/content/rockets/library/rocket/rocketComponentProps';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketStage from '@/components/content/rockets/library/rocket/RocketStage';
import RocketStageEditDialog from '@/components/content/rockets/library/dialogs/RocketStageEditDialog';
import RocketVideo from '@/components/content/rockets/library/rocket/RocketVideo';
import RocketVideoEditDialog from '@/components/content/rockets/library/dialogs/RocketVideoEditDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'RocketControl',
	components: {
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		RocketStage,
		RocketStageEditDialog,
		RocketVideo,
		RocketVideoEditDialog,
		VtConfirmationDialog,
		VtFormControl,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useDetailComponentProps,
		...useRocketComponentProps
	},
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
			markupHint,
			detailItemAlbumLink,
			detailItemAlbumName,
			detailItemAlbumType,
			detailItemCoverUrl,
			detailItemDescription,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemRocketType,
			stagesPanels,
			videosPanels,
			dialogDeleteVideoManager,
			dialogDeleteVideoMessage,
			dialogEditVideoManager,
			dialogEditVideoParams,
			coverUrl,
			hasAdmin,
			manufacturers,
			rocketId,
			stages,
			videos,
			dialogEditPreCompleteOkRocketPart,
			dialogDeleteVideoCancel,
			dialogDeleteVideoError,
			dialogDeleteVideoOk,
			dialogDeleteVideoOpen,
			dialogEditVideoCancel,
			dialogEditVideoError,
			dialogEditVideoOk,
			dialogEditVideoOpen,
			dialogEditVideoPreCompleteOk,
			handleAddVideo,
			isDeletingVideo,
			isEditingVideo,
			stagesPanelsUpdated,
			videosPanelsUpdated,
			updateStage,
			updateVideo,
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
			markupHint,
			detailItemAlbumLink,
			detailItemAlbumName,
			detailItemAlbumType,
			detailItemCoverUrl,
			detailItemDescription,
			detailItemManufacturer,
			detailItemManufacturerStockId,
			detailItemName,
			detailItemRocketType,
			stagesPanels,
			videosPanels,
			dialogDeleteVideoManager,
			dialogDeleteVideoMessage,
			dialogEditVideoManager,
			dialogEditVideoParams,
			coverUrl,
			hasAdmin,
			manufacturers,
			rocketId,
			stages,
			videos,
			dialogEditPreCompleteOkRocketPart,
			dialogDeleteVideoCancel,
			dialogDeleteVideoError,
			dialogDeleteVideoOk,
			dialogDeleteVideoOpen,
			dialogEditVideoCancel,
			dialogEditVideoError,
			dialogEditVideoOk,
			dialogEditVideoOpen,
			dialogEditVideoPreCompleteOk,
			handleAddVideo,
			isDeletingVideo,
			isEditingVideo,
			stagesPanelsUpdated,
			videosPanelsUpdated,
			updateStage,
			updateVideo,
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
</style>