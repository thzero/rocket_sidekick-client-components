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
	const innerItem = ref(null);
	const innerItemOrig = ref(null);
	const invalid = ref(false);

	const canDelete = computed(() => {
		return !isNew.value && !dirty.value;
	});
	const detailTextRows = computed(() => {
		return isEditable.value ? 5 : 1;
	});
	const isEditable = computed(() => {
		return innerItem.value ? innerItem.value.isEditable ?? false : false;
	});
	const isNew = computed(() => {
		return innerItem.value ? innerItem.value.isNew ?? false : false;
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

		innerItem.value = null;
		context.emit('cancel');
	};
	const handleClose = async () => {
		if (options.handleClose) {
			const results = await options.handleClose();
			if (!results)
				return;
		}

		innerItem.value = null;
		context.emit('close');
	};
	const handleOk = async () => {
		if (options.handleOk) {
			const results = await options.handleOk();
			if (!results)
				return;
		}

		innerItem.value.isNew = false
		context.emit('ok');
	};
	// eslint-disable-next-line
	const resetForm = async (correlationId, optionsReset) => {
		if (!innerItem.value)
			return;

		innerItem.value.isNew = innerItemOrig.value ? innerItemOrig.value.isNew : false;
		if (options.resetForm && innerItemOrig.value)
			await options.resetForm(correlationId, options);
	};

	watch(() => props.detailItem,
		async (value) => {
			console.log('watch.detailItem', value);
			console.log('watch.detailItem', value);
			console.log('watch.detailItem', value);
			console.log('watch.detailItem', value);
			console.log('watch.detailItem', value);
			await formControlRef.value.reset(correlationId, false);

			innerItem.value = value;
			options.init(innerItem.value);
			innerItemOrig.value = LibraryCommonUtility.cloneDeep(value);
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
	};
};
</script>
