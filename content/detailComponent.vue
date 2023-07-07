<script>
import { computed, ref, watch } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseEditComponent } from '@thzero/library_client_vue3/components/baseEdit';

export function useDetailComponent(props, context, options) {
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
		setErrors
	} = useBaseEditComponent(props, context, options);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const formControlRef = ref(null);
	const dirty = ref(false);
	const detailItem = ref(null);
	const invalid = ref(false);
	const detailItemOrig = ref(null);

	const canDelete = computed(() => {
		return !isNew.value && !dirty.value;
	});
	const detailItemData = computed(() => {
		return detailItem.value ? detailItem.value.data : null;
	});
	const detailItemTextRows = computed(() => {
		return isEditable.value ? 5 : 1;
	});
	const isEditable = computed(() => {
		return props.modelValue ? props.modelValue.isEditable ?? false : false;
	});
	const isNew = computed(() => {
		return props.modelValue ? props.modelValue.isNew ?? false : false;
	});

	const dirtyCallback = (correlationId, value) => {
		dirty.value = value.value;
	};
	const invalidCallback = (correlationId, value) => {
		invalid.value = value.value;
	};
	const handleCancel = async () => {
		if (options.handleCancel) {
			const results = await options.handleCancel();
			if (!results)
				return;
		}

		detailItem.value = null;
		context.emit('cancel');
	};
	const handleClose = async () => {
		if (options.handleClose) {
			const results = await options.handleClose();
			if (!results)
				return;
		}

		detailItem.value = null;
		context.emit('close');
	};
	const handleOk = async () => {
		if (options.handleOk) {
			const results = await options.handleOk();
			if (!results)
				return;
		}

		props.modelValue.isNew = false
		context.emit('ok');
	};
	// eslint-disable-next-line
	const resetForm = async (correlationId, optionsReset) => {
		if (!detailItem.value)
			return;

		detailItem.value.isNew = detailItemOrig.value ? detailItemOrig.value.isNew : false;
		if (options.resetForm && detailItemOrig.value)
			await options.resetForm(correlationId, detailItemOrig.value.data ? detailItemOrig.value.data : null);
	};

	watch(() => props.modelValue,
		async (value) => {
			console.log('watch.modelValue', value);

			detailItem.value = value;
			if (detailItem.value) {
				options.init(correlationId(), detailItem.value.data);
				detailItemOrig.value = LibraryCommonUtility.cloneDeep(value);
			}
		}
	);

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
		invalid,
		canDelete,
		detailItemData,
		detailItemTextRows,
		isEditable,
		isNew,
		dirtyCallback,
		invalidCallback,
		handleCancel,
		handleClose,
		handleOk,
		resetForm
	};
};
</script>