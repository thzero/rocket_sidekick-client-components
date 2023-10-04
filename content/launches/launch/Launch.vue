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
			<v-col cols="12">
				<div class="d-flex">
					<VTextField
						ref="detailItemRocketNameRef"
						v-model="detailItemRocketName"
						vid="detailItemRocketName"
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
		<template v-slot:buttons_pre>
		</template>
		<template v-slot:buttons_post>
		</template>
		<template v-slot:after>	
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
	<RocketLookupDialog
		ref="dialogRocketLookupManagerRef"
		:signal="dialogRocketLookupManager.signal"
		@close="dialogRocketLookupManager.cancel()"
		@select="selectRocket"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useLaunchEditValidation } from '@/components/content/launches/launch/launchEditValidation';
import { useLaunchComponent } from '@/components/content/launches/launch/launchComponent';
import { useLaunchComponentProps } from '@/components/content/launches/launch/launchComponentProps';

import DeploymentBagPanelTitle from '@/components/content/parts/deploymentBags/DeploymentBagPanelTitle';

import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import RocketLookupDialog from '@/components/content/rockets/dialogs/RocketLookupDialog';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'LaunchControl',
	components: {
		DeploymentBagPanelTitle,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		RocketLookupDialog,
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
		...useLaunchComponentProps
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
			dialogRocketLookupManager,
			detailItemDescription,
			detailItemName,
			detailItemRocketId,
			detailItemRocketName,
			hasAdmin,
			clickSearchRockets,
			selectRocket,
			scope,
			validation
		} = useLaunchComponent(props, context, options);

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
			dialogRocketLookupManager,
			detailItemDescription,
			detailItemName,
			detailItemRocketId,
			detailItemRocketName,
			hasAdmin,
			clickSearchRockets,
			selectRocket,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useLaunchEditValidation(true)), {});
	}
};
</script>

<style>
</style>