<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppCommonConstants from 'rocket_sidekick_common/constants.js';

import { useDetailComponent } from './detailComponent';

export function useChecklistComponent(props, context, options) {
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
		innerItem,
		innerItemOrig,
		invalid,
		canDelete,
		detailTextRows,
		isEditable,
		isNew,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		resetForm
	} = useDetailComponent(props, context, {
		init: (value) => {
			innerItemDescription.value = value && value.data ? value.data.description : null;
			innerItemIsDefault.value = value && value.data ? value.data.isDefault : null;
			innerItemName.value = value && value.data ? value.data.name : null;
		},
		resetForm: (correlationId, options) => {
			innerItemDescription.value = innerItemOrig.value.data.description;
			innerItemName.value = innerItemOrig.value.data.name;
		}
	});

	const innerItemDescription = ref(null);
	const innerItemIsDefault = ref(null);
	const innerItemName = ref(null);

	const canAdd = computed(() => {
		return !isNew.value && !dirty.value;
	});
	const isDefault = computed(() => {
		return innerItem.value && innerItem.value.data ? innerItem.value.data.isDefault ?? false : false;
	});
	const isInProgress = computed(() => {
		return innerItem.value && innerItem.value.data ? innerItem.value.data.type === AppCommonConstants.Checklists.ChecklistStatus.inProgress : false;
	});
	const isShared = computed(() => {
		return innerItem.value && innerItem.value.data ? innerItem.value.data.isShared ?? false : false;
	});

	const handleAdd = () => {
	};
	const preCompleteOk = async (correlationId) => {
		innerItem.value.data.description = String.trim(innerItemDescription.value);
		innerItem.value.data.name = String.trim(innerItemName.value);
		delete innerItem.value.data.isDefault;
		const response = await serviceStore.dispatcher.saveChecklistUser(correlationId, innerItem.value.data);
		logger.debug('checklistComponent', 'preCompleteOk', 'response', response, correlationId);
		return response;
	};

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
		innerItem,
		innerItemOrig,
		invalid,
		canDelete,
		detailTextRows,
		isEditable,
		isNew,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		resetForm,
		innerItemDescription,
		innerItemIsDefault,
		innerItemName,
		canAdd,
		isDefault,
		isInProgress,
		isShared,
		handleAdd,
		preCompleteOk,
		scope: 'ChecklistControl',
		validation: useVuelidate({ $scope: 'ChecklistControl' })
	};
};
</script>
