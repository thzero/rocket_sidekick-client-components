<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useDetailFormDialogComponent } from '@/components/content/detailFormDialogComponent';

export function useRocketDocumentEditDialogComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useBaseComponent(props, context, options);

	const {
		detailItem,
		detailItemTextRows,
		dialogError,
		dialogClose,
		dialogOk,
		isEditable
	} = useDetailFormDialogComponent(props, context, options);

	const detailItemLink = ref(null);
	const detailItemName = ref(null);
	const detailItemType = ref(null);
	
	const displayName = computed(() => {
		return LibraryClientUtility.$trans.t('forms.content.rockets.name') + ' ' + LibraryClientUtility.$trans.t('forms.content.rockets.documents.title');
	});

	const preCompleteOk = async (correlationId) => {
		await setAdditional(correlationId);

		if (!props.preCompleteOk)
			return error('useRocketStageEditDialogComponent', 'preCompleteOk', 'invalid preCompletedOk property', null, null, null, correlationId);

		// call the parent to tell them to save off the detail item
		return await props.preCompleteOk(correlationId, detailItem.value);
	};
	const resetEditData = (correlationId, value) => {
		detailItemLink.value = value ? value.link : null;
		detailItemName.value = value ? value.name : null;
		detailItemType.value = value ? value.type : null;
	};
	const setEditData = (correlationId, value) => {
		value.link = String.trim(detailItemLink.value);
		value.name = String.trim(detailItemName.value);
		value.type = String.trim(detailItemType.value);
	};
	const resetAdditional = async (correlationId, previous) => {
		resetEditData(correlationId, detailItem.value);
	};
	const setAdditional = async (correlationId) => {
		setEditData(correlationId, detailItem.value);
	};

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
		scope: 'RocketDocumentEditDialog',
		validation: useVuelidate({ $scope: 'RocketDocumentEditDialog' })
	};
};
</script>
