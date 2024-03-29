<script>
import { computed, onMounted, ref, watch } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useNotify } from '@thzero/library_client_vue3/components/notify';
import { useBaseEditComponent } from '@thzero/library_client_vue3/components/baseEdit';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';

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

	const {
		isAdmin,
		isOwner,
		isPublic,
		isPublicDisplay,
		isUser
	} = useContentSecurityComponent(props, context);

	const {
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify
	} = useNotify(props, context, options);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const formControlRef = ref(null);
	const dirty = ref(false);
	const detailItem = ref(null);
	const dialogDeleteManager = ref(new DialogSupport());
	const dialogDeleteMessage = ref(LibraryClientUtility.$trans.t(`messages.${options.dialogDeleteMessage ? options.dialogDeleteMessage : 'items'}.delete_confirm`));
	const dialogDeleteParams = ref(null);
	const invalid = ref(false);
	const detailItemOrig = ref(null);
	const user = ref(null);

	const canDelete = computed(() => {
		return !isNew.value && !dirty.value;
	});
	const detailItemData = computed(() => {
		return detailItem.value ? detailItem.value.data : null;
	});
	const detailItemTextRows = computed(() => {
		return isEditable.value ? 5 : 1;
	});
	const isDeleting = (item) => {
		if (!dialogDeleteParams.value || !item)
			return false;

		return item.id === dialogDeleteParams.value;
	};
	const isEditable = computed(() => {
		return props.modelValue ? props.modelValue.isEditable ?? false : false;
	});
	const isNew = computed(() => {
		return props.modelValue ? props.modelValue.isNew ?? false : false;
	});

	const dialogDeleteCancel = async (item) => {
		try {
			dialogDeleteManager.value.cancel();
		}
		finally {
			dialogDeleteParams.value = null;
		}
	};
	const dialogDeleteError = async (err) => {
		try {
			dialogDeleteManager.value.cancel();
		}
		finally {
			dialogDeleteParams.value = null;
		}
	};
	const dialogDeleteOk = async () => {
		try {
			if (!dialogDeleteParams.value)
				return;

			const correlationIdI = correlationId();
			const response = await serviceStore.dispatcher.deletePartById(correlationIdI, dialogDeleteParams.value);
			if (hasFailed(response)) {
				setNotify(correlationIdI, 'errors.error');
				return;
			}
			await fetch(correlationIdI);
		}
		finally {
			dialogDeleteParams.value = null;
			dialogDeleteManager.value.ok();
		}
	};
	const dialogDeleteOpen = (item) => {
		if (!item)
			return;
		if (!canDelete(item)) {
			setNotify(correlationId(), 'errors.security');
			return;
		}

		dialogDeleteParams.value = item.id;
		dialogDeleteManager.value.open();
	};
	const dirtyCallback = (correlationId, value) => {
		dirty.value = value.value;
		context.emit('dirty', dirty.value);
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
	const preCompleteOk = async (correlationId) => {
		if (!options || !options.preCompleteOk)
			return error('partComponent', 'preCompleteOk', 'Invalid option preCompleteOk check.', null, 99999, correlationId);

		const response = await options.preCompleteOk(correlationId);
		logger.debug('partComponent', 'preCompleteOk', 'response', response, correlationId);
		if (hasFailed(response))
			return response;

		detailItem.value.data = response.results;
		detailItemOrig.value = LibraryCommonUtility.cloneDeep(detailItem.value);
		return response;
	};
	// eslint-disable-next-line
	const resetAdditional = async (correlationId, previous) => {
		if (!detailItem.value)
			return;

		detailItem.value.isNew = previous && detailItemOrig.value ? detailItemOrig.value.isNew : false;
		if (options.resetAdditional && detailItemOrig.value)
			await options.resetAdditional(correlationId, previous && detailItemOrig.value.data ? detailItemOrig.value.data : null);
	};

	onMounted(async () => {
		user.value = await serviceStore.user;
	});

	watch(() => props.modelValue,
		async (value) => {
			console.log('watch.modelValue', value);

			if (value) {
				await options.init(correlationId(), value.data);
				detailItem.value = value;
				detailItemOrig.value = LibraryCommonUtility.cloneDeep(value);
			}
			else
				detailItem.value = value;

			if (formControlRef && formControlRef.value)
				await formControlRef.value.reset(correlationId, false, true);
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
		resetAdditional
	};
};
</script>
