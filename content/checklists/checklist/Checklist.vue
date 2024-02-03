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
		[[ isDefault {{ isDefault }} ]]
		[[ isDefaultEdit {{ isDefaultEdit }} ]]
		[[ isDefaultView {{ isDefaultView }} ]]
		[[ isInProgress {{ isInProgress }} ]]
		[[ isShared {{ isShared }} ]]
		<!-- [[ modelValue {{ JSON.stringify(modelValue) }}]] -->
		<!-- [[ detailItem {{ JSON.stringify(detailItem) }}]]  -->
		<!-- [[ detailItemData {{ JSON.stringify(detailItemData) }}]]  -->
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
		:reset-additional="resetAdditional"
		:pre-complete-ok="preCompleteOk"
		@cancel="handleCancel"
		@ok="handleOk"
	>
		<!-- :readonly="!isEditable" -->
		<v-row dense>
			<v-col
				v-if="!isDefaultView"
				cols="12" sm="8" lg="10"
			>
				<VtTextFieldWithValidation
					ref="detailItemNameRef"
					v-model="detailItemName"
					vid="detailItemName"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.name')"
					:counter="30"
				/>
			</v-col>
			<v-col
				v-if="!isDefaultView"
				cols="12" sm="4" lg="2"
			>
				<VtDateTimePickerFieldWithValidation
					ref="detailItemDateRef"
					v-model="detailItemDate"
					vid="detailItemDate"
					:default-date="false"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.date')"
				/>
			</v-col>
			<v-col
				v-if="isDefaultView"
				cols="10"
			>
				<VtTextFieldWithValidation
					ref="nameRef"
					v-model="detailItemName"
					vid="detailItemName"
					:label="$t('forms.name')"
					:counter="30"
					:validation="validation"
					:readonly="!isEditable"
				/>
			</v-col>
			<v-col 
				v-if="isDefaultView"
				cols="2"
			>
				<VtSwitchWithValidation
					ref="detailItemIsDefaultRef"
					v-model="detailItemIsDefault"
					vid="detailItemIsDefault"
					:label="$t('forms.checklists.default')"
					:validation="validation"
					:readonly="true"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<VtTextAreaWithValidation
					ref="descriptionRef"
					v-model="detailItemDescription"
					vid="detailItemDescription"
					:label="$t('forms.description')"
					:counter="300"
					:validation="validation"
					:readonly="!isEditable"
					:clearable="isEditable"
					:rows="detailItemTextRows"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" sm="8">
				<div class="d-flex">
					<VtTextFieldWithValidation
						v-if="!isDefault"
						ref="detailItemLocationNameRef"
						v-model="detailItemLocationName"
						vid="detailItemLocationName"
						:validation="validation"
						:errorsReadonly="validation.detailItemLocationId.$silentErrors"
						:label="$t('forms.content.locations.name')"
						:readonly="true"
					/>
					<v-btn
						v-if="isEditable"
						class="ml-4 text-right"
						:variant="buttonsForms.variant.add"
						:color="buttonsForms.color.add"
						@click="clickSearchLocations(item)"
					>
						{{ $t('buttons.select') }}
					</v-btn>
					<!-- <v-btn
						v-if="!isEditable && !isDefault"
						class="ml-4 text-right"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						@click="clickViewLocation(detailItemData)"
					>
						{{ $t('buttons.link') }}
					</v-btn> -->
					<div
						v-if="!isEditable && !isDefault && detailItemData && detailItemData.locationId"
						style="display: flex; justify-content: center; align-items: center;"
					>
						<router-link
							:to="'/user/locations/' + (detailItemData ? detailItemData.locationId: '')"
							class="text-contrast router-link headline"
						>
							<h2>{{ $t('buttons.link') }}</h2>
						</router-link>
					</div>
				</div>
			</v-col>
			<v-col cols="12" sm="4">
				<VtSelectWithValidation
					v-if="detailItemLocationId && locationIterations.length > 1"
					ref="detailItemLocationIterationIdRef"
					v-model="detailItemLocationIterationId"
					vid="detailItemLocationIterationId"
					:items="locationIterations"
					:validation="validation"
					:readonly="!isEditable"
					:label="$t('forms.content.locations.iterations.name')"
				/>
			</v-col>
		</v-row>
		<v-row 
			dense
			class="mt-4"
		>
			<v-col cols="12">
				<div class="d-flex">
					<VtTextFieldWithValidation
						v-if="!isDefault"
						ref="detailItemRocketNameRef"
						v-model="detailItemRocketName"
						vid="detailItemRocketName"
						:validation="validation"
						:errorsReadonly="validation.detailItemRocketId.$silentErrors"
						:label="$t('forms.content.launches.rocket.title')"
						:readonly="true"
					/>
					<v-btn
						v-if="isEditable"
						class="ml-4 text-right"
						:variant="buttonsForms.variant.add"
						:color="buttonsForms.color.add"
						@click="clickSearchRockets()"
					>
						{{ $t('buttons.select') }}
					</v-btn>
					<!-- <v-btn
						v-if="!isEditable && !isDefault"
						class="ml-4 text-right"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						@click="clickViewRocket(detailItemData)"
					>
						{{ $t('buttons.link') }}
					</v-btn> -->
					<div
						v-if="!isEditable && !isDefault && detailItemData && detailItemData.rocketId"
						style="display: flex; justify-content: center; align-items: center;"
					>
						<router-link
							:to="'/user/rockets/' + (detailItemData ? detailItemData.rocketId: '')"
							class="text-contrast router-link headline"
						>
							<h2>{{ $t('buttons.link') }}</h2>
						</router-link>
					</div>
				</div>
			</v-col>
			<v-col 
				v-if="detailItemRocketId"
				cols="12"
			>
				<div 
					class="d-flex"
				>
					<!-- <VtTextFieldWithValidation
						ref="detailItemRocketSetupNameRef"
						v-model="detailItemRocketSetupName"
						vid="detailItemRocketSetupName"
						:validation="validation"
						:errorsReadonly="validation.detailItemRocketSetupId.$silentErrors"
						:label="$t('forms.content.launches.rocketSetup.title')"
						:readonly="true"
					/> -->
					<VtTextAreaWithValidation
						ref="detailItemRocketSetupNameRef"
						v-model="detailItemRocketSetupName"
						vid="detailItemRocketSetupName"
						:validation="validation"
						:errorsReadonly="validation.detailItemRocketSetupId.$silentErrors"
						:readonly="true"
						:label="$t('forms.content.launches.rocketSetup.title')"
						:clearable="false"
						:rows="1"
					/>
					<v-btn
						v-if="isEditable"
						class="ml-4 text-right"
						:variant="buttonsForms.variant.add"
						:color="buttonsForms.color.add"
						@click="clickSearchRocketSetups()"
					>
						{{ $t('buttons.select') }}
					</v-btn>
					<!-- <v-btn
						v-if="!isEditable"
						class="ml-4 text-right"
						:variant="buttonsForms.variant.default"
						:color="buttonsForms.color.default"
						@click="clickViewRocketSetup(detailItemData)"
					>
						{{ $t('buttons.link') }}
					</v-btn> -->
					<div
						v-if="!isEditable && !isDefault && detailItemData && detailItemData.rocketSetupId"
						style="display: flex; justify-content: center; align-items: center;"
					>
						<router-link
							:to="'/user/rocketsetups/' + (detailItemData ? detailItemData.rocketSetupId: '')"
							class="text-contrast router-link headline"
						>
							<h2>{{ $t('buttons.link') }}</h2>
						</router-link>
					</div>
				</div>
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
					v-if="canAddSecondary"
					:variant="buttonsForms.variant.add"
					:color="buttonsForms.color.add"
					class="mr-2"
					@click="handleAddSecondary"
				>
					{{ $t('buttons.add') }} {{ $t('buttons.checklists.step') }}
				</v-btn>
				<span
					v-if="canAddSecondary"
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
					v-if="canAddSecondary"
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
	</VtFormControl>
	<LocationLookupDialog
		ref="dialogLocationLookupManagerRef"
		:signal="dialogLocationLookupManager.signal"
		@close="dialogLocationLookupManager.cancel()"
		@select="selectLocation"
	/>
	<RocketLookupDialog
		ref="dialogRocketLookupManagerRef"
		message-replace="messages.launches.rocket.replace_confirm"
		:rocket-id="detailItemRocketId"
		:signal="dialogRocketLookupManager.signal"
		@close="dialogRocketLookupManager.cancel()"
		@select="selectRocket"
	/>
	<RocketSetupLookupDialog
		ref="dialogRocketSetupLookupManagerRef"
		message-replace="messages.launches.rocketSetup.replace_confirm"
		:rocket-id="detailItemRocketId"
		:rocket-setup-id="detailItemRocketSetupId"
		:signal="dialogRocketSetupLookupManager.signal"
		@close="dialogRocketSetupLookupManager.cancel()"
		@select="selectRocketSetup"
	/>
</template>

<script>
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useDetailComponentProps } from '@/components/content/detailComponentProps';
import { useChecklistComponent } from '@/components/content/checklists/checklist/checklistComponent';
import { useChecklistComponentProps } from '@/components/content/checklists/checklist/checklistComponentProps';
import { useChecklistValidation } from '@/components/content/checklists/checklist/checklistValidation';

import ChecklistSteps from '@/components/content/checklists/checklist/ChecklistSteps';
import LocationLookupDialog from '@/components/content/locations/dialogs/LocationLookupDialog';
import RocketLookupDialog from '@/components/content/rockets/dialogs/RocketLookupDialog';
import RocketSetupLookupDialog from '@/components/content/rockets/dialogs/RocketSetupLookupDialog';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtDateTimePickerFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtDateTimePickerFieldWithValidationTemp';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'ChecklistControl',
	components: {
		ChecklistSteps,
		LocationLookupDialog,
		RocketLookupDialog,
		RocketSetupLookupDialog,
		VtFormControl,
		VtDateTimePickerFieldWithValidation,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		...useDetailComponentProps,
		...useChecklistComponentProps
	},
	emits: ['cancel', 'close', 'dirty', 'error', 'ok'],
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
			dialogLocationLookupManager,
			dialogRocketLookupManager,
			dialogRocketSetupLookupManager,
			detailItemDate,
			detailItemDescription,
			detailItemIsDefault,
			detailItemLocationId,
			detailItemLocationIterationId,
			detailItemLocationName,
			detailItemName,
			detailItemReorder,
			detailItemRocketId,
			detailItemRocketName,
			detailItemRocketSetupId,
			detailItemRocketSetupName,
			isDefault,
			isDefaultEdit,
			isDefaultView,
			isInProgress,
			isShared,
			locationIterations,
			steps,
			clickSearchLocations,
			clickSearchRockets,
			clickSearchRocketSetups,
			clickViewLocation,
			clickViewRocket,
			clickViewRocketSetup,
			selectLocation,
			selectRocket,
			selectRocketSetup,
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
			dialogLocationLookupManager,
			dialogRocketLookupManager,
			dialogRocketSetupLookupManager,
			detailItemDate,
			detailItemDescription,
			detailItemIsDefault,
			detailItemLocationId,
			detailItemLocationIterationId,
			detailItemLocationName,
			detailItemName,
			detailItemReorder,
			detailItemRocketId,
			detailItemRocketName,
			detailItemRocketSetupId,
			detailItemRocketSetupName,
			isDefault,
			isDefaultEdit,
			isDefaultView,
			isInProgress,
			isShared,
			locationIterations,
			steps,
			clickSearchLocations,
			clickSearchRockets,
			clickSearchRocketSetups,
			clickViewLocation,
			clickViewRocket,
			clickViewRocketSetup,
			selectLocation,
			selectRocket,
			selectRocketSetup,
			updateOrder,
			scope,
			validation
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useChecklistValidation(this)), {
		});
	}
};
</script>

<style scoped>
</style>
