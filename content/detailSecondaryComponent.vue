<script>
import { computed, ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useDetailComponent } from '@/components/content/detailComponent';

export function useDetailSecondaryComponent(props, context, options) {
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
		resetAdditional
	} = useDetailComponent(props, context, options);

	const {
		isAdmin,
		isOwner,
		isPublic,
		isPublicDisplay,
		isUser
	} = useContentSecurityComponent(props, context);
	
	const dialogDeleteSecondaryManager = ref(new DialogSupport());
	const dialogDeleteSecondaryMessage = ref(LibraryClientUtility.$trans.t(`messages.${options && options.dialogDeleteMessage ? options.dialogDeleteMessage : 'items'}.delete_confirm`));
	const dialogDeleteSecondaryParams = ref(null);
	const dialogEditSecondaryManager = ref(new DialogSupport());
	const dialogEditSecondaryParams = ref(null);
	
	const canAddSecondary = computed(() => {
		const correlationIdI = correlationId();
		return isOwner(correlationIdI, detailItemData.value) && !isNew.value && isEditable.value && !dirty.value && (options && options.canAddSecondary ? options.canAddSecondary(correlationIdI, detailItemData.value) : true);
	});
	const canDeleteSecondary = computed(() => {
		const correlationIdI = correlationId();
		return isOwner(correlationIdI, detailItemData.value) && !isNew.value && isEditable.value && !dirty.value && (options && options.canDeleteSecondary ? options.canDeleteSecondary(correlationIdI, detailItemData.value) : true);
	});
	const canEditSecondary = computed(() => {
		const correlationIdI = correlationId();
		return isOwner(correlationIdI, detailItemData.value) && !isNew.value && isEditable.value && !dirty.value && (options && options.canEditSecondary ? options.canEditSecondary(correlationIdI, detailItemData.value) : true);
	});
	const isDeletingSecondary = (item) => {
		if (!dialogDeleteSecondaryParams.value || !item)
			return false;

		return item.id === dialogDeleteSecondaryParams.value;
	};
	const isEditingSecondary = (item) => {
		if (!dialogEditSecondaryParams.value || !item)
			return false;

		return item.id === dialogEditSecondaryParams.value;
	};
	
	const dialogDeleteSecondaryCancel = async (item) => {
		try {
			dialogDeleteSecondaryManager.value.cancel();
		}
		finally {
			dialogDeleteSecondaryParams.value = null;
		}
	};
	const dialogDeleteSecondaryError = async (err) => {
		try {
			dialogDeleteSecondaryManager.value.cancel();
		}
		finally {
			dialogDeleteSecondaryParams.value = null;
		}
	};
	const dialogDeleteSecondaryOk = async () => {
		try {
			if (!dialogDeleteSecondaryParams.value)
				return;

			if (!options || !options.dialogDeleteSecondaryOk)
				return;

			const correlationIdI = correlationId();
			const response = await options.dialogDeleteSecondaryOk(correlationIdI, dialogDeleteSecondaryParams.value);
			if (hasFailed(response))
				setNotify(correlationIdI, 'errors.error');
			
			detailItem.value.data = response.results;
			return response;
		}
		finally {
			dialogDeleteSecondaryParams.value = null;
			dialogDeleteSecondaryManager.value.ok();
		}
	};
	const dialogDeleteSecondaryOpen = (item) => {
		if (!item)
			return;
		if (!canDeleteSecondary.value)
			return;

		dialogDeleteSecondaryParams.value = item.id;
		dialogDeleteSecondaryManager.value.open();
	};
	const dialogEditSecondaryCancel = async (item) => {
		try {
			dialogEditSecondaryManager.value.cancel();
		}
		finally {
			dialogEditSecondaryParams.value = null;
		}
	};
	const dialogEditSecondaryError = async (err) => {
		try {
			dialogEditSecondaryManager.value.cancel();
		}
		finally {
			dialogEditSecondaryParams.value = null;
		}
	};
	const dialogEditSecondaryOk = async (item) => {
		try {
			if (!dialogEditSecondaryParams.value)
				return;

			if (!options || !options.editSecondary)
				return;

			const correlationIdI = correlationId();
			const response = await options.editSecondary(correlationIdI, item);
			if (hasFailed(response)) {
				setNotify(correlationIdI, 'errors.error');
				return;
			}
		}
		finally {
			dialogEditSecondaryParams.value = null;
			dialogEditSecondaryManager.value.ok();
		}
	};
	const dialogEditSecondaryOpen = async (item) => {
		if (!item)
			return;
		if (!canEditSecondary.value)
			return;

		if (options && options.initEditSecondary)
			item = await options.initEditSecondary(correlationId(), item);

		dialogEditSecondaryParams.value = item;
		dialogEditSecondaryManager.value.open();
	};
	const dialogEditSecondaryPreCompleteOk = async (correlationId, item) => {
		if (!options || !options.dialogEditSecondaryPreCompleteOk)
			return error('useDetailSecondaryComponent', 'dialogEditSecondaryPreCompleteOk', null, null, null, null, correlationId);

		const response = await options.dialogEditSecondaryPreCompleteOk(correlationId, item);
		if (hasFailed(response))
			return response;

		detailItem.value.data = response.results;
		return response;
	};
	const handleAddSecondary = async () => {
		if (!options || !options.initNewSecondary)
			return;

		await options.initNewSecondary(correlationId());
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
		dialogEditSecondaryPreCompleteOk,
		handleAddSecondary
	};
};
</script>
