<script>
import { computed, ref, watch } from 'vue';

import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useDetailFormDialogComponent(props, context, options) {
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

	const detailItem = ref(null);
	
	const detailItemTextRows = computed(() => {
		return isEditable.value ? 5 : 1;
	});

	const buttonOkDisabledOverride = (disabled, invalid, invalidOverride) => {
		return invalid;
	};
	const dialogError = (err) => {
		context.emit('error', err);
	};
	const dialogClose = () => {
		context.emit('close');
	};
	const dialogOk = (response) => {
		context.emit('ok', response);
	};
	const isEditable = computed(() => {
		return props.readonly ? !props.readonly ?? true : true;
	});

	watch(() => props.value,
		async (value) => {
			detailItem.value = LibraryCommonUtility.cloneDeep(value);
		}
	);

	return {
		detailItem,
		detailItemTextRows,
		buttonOkDisabledOverride,
		dialogError,
		dialogClose,
		dialogOk,
		isEditable
	};
};
</script>
