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
					:label="$t('forms.content.rockets.albums.name')"
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
					:label="$t('forms.content.rockets.albums.type')"
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
					:label="$t('forms.content.rockets.albums.url')"
					:maxcount="255"
				/>
			</v-col>
		</v-row>
	</VtFormDialog>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailFormDialogProps } from '@/components/content/detailFormDialogProps';
import { useRocketAlbumEditDialogComponent } from '@/components/content/rockets/library/dialogs/rocketAlbumEditDialogComponent';
import { useRocketAlbumEditDialogValidation } from '@/components/content/rockets/library/dialogs/rocketAlbumEditDialogValidation';
import { useRocketAlbumEditDialogComponentProps } from '@/components/content/rockets/library/dialogs/rocketAlbumEditDialogComponentProps';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'RocketAlbumEditDialog',
	components: {
		VtFormDialog,
		VtTextFieldWithValidation
	},
	props: {
		...useDetailFormDialogProps,
		...useRocketAlbumEditDialogComponentProps
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
		} = useRocketAlbumEditDialogComponent(props, context);

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
		return Object.assign(LibraryCommonUtility.cloneDeep(useRocketAlbumEditDialogValidation));
	}
};
</script>

<style scoped>
</style>
