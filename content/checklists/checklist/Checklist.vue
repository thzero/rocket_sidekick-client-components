<template>
	<div
		v-if="debug"
	>
		[[ invalid {{ invalid }} ]]
		[[ dirty {{ dirty }} ]]
		[[ isEditable {{ isEditable }} ]]
		[[ isNew {{ isNew }} ]]
		[[ canAddStep {{ canAddStep }} ]]
		[[ canDeleteStep {{ canDeleteStep }} ]]
		[[ canEditStep {{ canEditStep }} ]]
		[[ isDefault {{ isDefault }} ]]
		[[ isInProgress {{ isInProgress }} ]]
		[[ isShared {{ isShared }} ]]
		<!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
		<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
		<!-- [[ detailItemData {{ JSON.stringify(detailItemData) }}]]  -->
	</div>
	<VFormControl
		ref="formControlRef"
		:validation="validation"
		:button-cancel="true"
		button-cancel-name="buttons.close"
		:button-clear="isEditable"
		button-clear-name="buttons.reset"
		:button-delete="false"
		:button-ok="isEditable"
		:dirty-callback="dirtyCallback"
		:invalid-callback="invalidCallback"
		:reset-additional="resetAdditional"
		:pre-complete-ok="preCompleteOk"
		@cancel="handleCancel"
		@ok="handleOk"
	>
		<!-- :readonly="!isEditable" -->
		<v-row dense>
			<v-col cols="10">
				<VTextFieldWithValidation
					ref="nameRef"
					v-model="detailItemName"
					vid="detailItemName"
					:label="$t('forms.name')"
					:counter="30"
					:validation="validation"
					:readonly="!isEditable"
				/>
			</v-col>
			<v-col cols="2">
				<VSwitch
					v-if="!isEditable"
					ref="isDefaultRef"
					v-model="detailItemIsDefault"
					:label="$t('forms.checklists.default')"
					:readonly="true"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VTextAreaWithValidation
					ref="descriptionRef"
					v-model="detailItemDescription"
					vid="detailItemDescription"
					:label="$t('forms.description')"
					:counter="30"
					:validation="validation"
					:readonly="!isEditable"
					:clearable="isEditable"
					:rows="detailItemTextRows"
				/>
			</v-col>
		</v-row>
		<div
			v-show="false"
		>
			<VSwitch
				ref="reorderRef"
				v-model="detailItemReorder"
				vid="detailItemReorder"
				:validation="validation"
				:readonly="!isEditable"
			/>
		</div>
		<template v-slot:buttons_pre>
			<template
				v-if="$vuetify.display.mdAndUp"
			>
				<v-btn
					v-if="canAddStep"
					:variant="buttonsForms.variant.add"
					:color="buttonsForms.color.add"
					class="mr-2"
					@click="handleAddSecondary"
				>
					{{ $t('buttons.add') }} {{ $t('buttons.checklists.step') }}
				</v-btn>
				<span
					v-if="canAddStep"
					class="mr-2"
				>|</span>
			</template>
		</template>
		<template v-slot:buttons_post>
			<!-- <v-btn
				v-if="!isEditable"
				:variant="buttonsForms.variant.close"
				:color="buttonsForms.color.close"
				class="ml-2"
				@click="handleClose"
			>
				{{ $t('buttons.close') }}
			</v-btn> -->
			<div 
				v-if="$vuetify.display.smAndDown"
				class="mt-2"
			>
				<v-btn
					v-if="canAddStep"
					:variant="buttonsForms.variant.add"
					:color="buttonsForms.color.add"
					@click="handleAddSecondary"
				>
					{{ $t('buttons.add') }} {{ $t('buttons.checklists.step') }}
				</v-btn>
			</div>
		</template>
		<template v-slot:after>	
			<v-row
				dense 
				class="mt-4"
			>
				<v-col>
					<ChecklistSteps
						:item="detailItemData"
						:readonly="!isEditable"
						:update-order="updateOrder"
						:debug="debug"
					>
					</ChecklistSteps>
				</v-col>
			</v-row>
		</template>
	</VFormControl>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useChecklistComponent } from '@/components/content/checklists/checklist/checklistComponent';
import { useChecklistComponentProps } from '@/components/content/checklists/checklist/checklistComponentProps';
import { useChecklistValidation } from '@/components/content/checklists/checklist/checklistValidation';

import ChecklistSteps from '@/components/content/checklists/checklist/ChecklistSteps';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'ChecklistControl',
	components: {
		ChecklistSteps,
		VFormControl,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
	},
	props: {
		...useChecklistComponentProps
	},
	emits: ['cancel', 'close', 'ok'],
	setup (props, context) {
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
			handleAddSecondary,
			buttonsDialog,
			buttonsForms,
			detailItemDescription,
			detailItemIsDefault,
			detailItemName,
			detailItemReorder,
			hasAdmin,
			isDefault,
			isInProgress,
			isShared,
			steps,
			updateOrder,
			scope,
			validation
		} = useChecklistComponent(props, context);

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
			handleAddSecondary,
			buttonsDialog,
			buttonsForms,
			detailItemDescription,
			detailItemIsDefault,
			detailItemName,
			detailItemReorder,
			hasAdmin,
			isDefault,
			isInProgress,
			isShared,
			steps,
			updateOrder,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useChecklistValidation), {
		});
	}
};
</script>

<style scoped>
</style>
