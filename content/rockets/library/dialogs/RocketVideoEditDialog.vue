<template>
	<VtFormDialog
		:label="$t('titles.edit') + ' ' + displayName"
		:signal="signal"
		:pre-complete-ok="preCompleteOk"
		:reset-additional="resetAdditional"
		:set-additional="setAdditional"
		:validation="validation"
		button-clear-name="buttons.reset"
		:debug="debug"
		width="70vh"
		max-width="90vh"
		@close="dialogClose"
		@error="dialogError"
		@ok="dialogOk"
	>
		<div
			v-if="debug"
			class="text-center"
		>
			isEditable: {{ isEditable }} readonly: {{ readonly }}
		</div>
		<v-row dense>
			<v-col cols="6">
				<VtTextFieldWithValidation
					ref="detailItemNameRef"
					v-model="detailItemName"
					vid="detailItemName"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.videos.name')"
					:maxcount="50"
				/>
			</v-col>
			<v-col cols="6">
				<VtTextFieldWithValidation
					ref="detailItemTypeRef"
					v-model="detailItemType"
					vid="detailItemType"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.videos.type')"
					:maxcount="20"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="23">
				<VtTextFieldWithValidation
					ref="detailItemLinkRef"
					v-model="detailItemLink"
					vid="detailItemLink"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.rockets.videos.url')"
					:maxcount="255"
				/>
			</v-col>
		</v-row>
	</VtFormDialog>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailFormDialogProps } from '@/components/content/detailFormDialogProps';
import { useRocketVideoEditDialogComponent } from '@/components/content/rockets/library/dialogs/rocketVideoEditDialogComponent';
import { useRocketVideoEditDialogValidation } from '@/components/content/rockets/library/dialogs/rocketVideoEditDialogValidation';
import { useRocketVideoEditDialogComponentProps } from '@/components/content/rockets/library/dialogs/rocketVideoEditDialogComponentProps';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'RocketVideoEditDialog',
	components: {
		VtFormDialog,
		VtTextFieldWithValidation
	},
	props: {
		...useDetailFormDialogProps,
		...useRocketVideoEditDialogComponentProps
	},
	emits: ['close', 'error', 'ok'],
	setup (props, context) {
		const {
			detailItem,
			detailItemTextRows,
			dialogError,
			dialogClose,
			dialogOk,
			isEditable,
			detailItemLink,
			detailItemName,
			detailItemType,
			resetEditData,
			setEditData,
			displayName,
			preCompleteOk,
			resetAdditional,
			setAdditional,
			scope,
			validation
		} = useRocketVideoEditDialogComponent(props, context);

		return {
			detailItem,
			detailItemTextRows,
			dialogError,
			dialogClose,
			dialogOk,
			isEditable,
			detailItemLink,
			detailItemName,
			detailItemType,
			resetEditData,
			setEditData,
			displayName,
			preCompleteOk,
			resetAdditional,
			setAdditional,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketVideoEditDialogValidation));
	}
};
</script>

<style scoped>
</style>
