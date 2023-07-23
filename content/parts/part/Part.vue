<template>
	[[ invalid {{ invalid }} ]]
	[[ dirty {{ dirty }} ]]
	[[ isEditable {{ isEditable }} ]]
	[[ isNew {{ isNew }} ]]
	[[ canAdd {{ canAdd }} ]]
	[[ isDefault {{ isDefault }} ]]
	[[ isInProgress {{ isInProgress }} ]]
	[[ isShared {{ isShared }} ]]
	 <!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
	<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
	<!-- [[ detailItemData {{ JSON.stringify(detailItemData) }}]]  -->
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
			<v-col>
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
			<v-col cols="3">
				<VSwitch
					v-if="!isEditable"
					ref="isDefaultRef"
					v-model="detailItemIsDefault"
					vid="detailItemIsDefault"
					:label="$t('forms.parts.default')"
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
				v-if="$vuetify.display.lgAndUp"
			>
				<v-btn
					v-if="canAdd"
					class="mr-2"
					color="primary"
					@click="handleAdd"
				>
					{{ $t('buttons.add') }} {{ $t('buttons.parts.step') }}
				</v-btn>
				<span
					v-if="canAdd"
					class="mr-2"
				>|</span>
			</template>
		</template>
		<template v-slot:buttons_post>
			<!-- <v-btn
				v-if="!isEditable"
				class="ml-2"
				color="primary"
				@click="handleClose"
			>
				{{ $t('buttons.close') }}
			</v-btn> -->
			<div 
				v-if="$vuetify.display.mdAndDown"
				class="mt-2"
			>
				<v-btn
					v-if="canAdd"
					color="primary"
					@click="handleAdd"
				>
					{{ $t('buttons.add') }} {{ $t('buttons.parts.step') }}
				</v-btn>
			</div>
		</template>
	</VFormControl>
</template>

<script>
import { maxLength, minLength, required } from '@vuelidate/validators';

import { usePartComponent } from '@/components/content/parts/part/partComponent';
import { usePartComponentProps } from '@/components/content/parts/part/partComponentProps';

import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'PartControl',
	components: {
		VFormControl,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
	},
	props: {
		...usePartComponentProps
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
			dirtyCallback,
			dialogDeleteCancel,
			dialogDeleteError,
			dialogDeleteOk,
			dialogDeleteOpen,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			resetAdditional,
			detailItemDescription,
			detailItemIsDefault,
			detailItemName,
			detailItemReorder,
			canAdd,
			isPublic,
			handleAdd,
			preCompleteOk,
			updateDataModel,
			scope,
			validation
		} = usePartComponent(props, context);

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
			dirtyCallback,
			dialogDeleteCancel,
			dialogDeleteError,
			dialogDeleteOk,
			dialogDeleteOpen,
			invalidCallback,
			handleCancel,
			handleClose,
			handleOk,
			resetAdditional,
			detailItemDescription,
			detailItemIsDefault,
			detailItemName,
			detailItemReorder,
			canAdd,
			isPublic,
			handleAdd,
			preCompleteOk,
			updateDataModel,
			scope,
			validation
		};
	},
	validations () {
		return {
			detailItemName: {
				required,
				minLength: minLength(3),
				maxLength: maxLength(50),
				$autoDirty: true
			},
			detailItemDescription: { $autoDirty: true },
			detailItemReorder: { $autoDirty: true }
		}
	}
};
</script>

<style scoped>
</style>
