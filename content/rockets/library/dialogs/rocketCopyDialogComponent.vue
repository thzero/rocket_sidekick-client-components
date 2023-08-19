<script>
import { ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useRocketCopyDialogComponent(props, context, options) {
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

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const name = ref(null);

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
	const preCompleteOk = async (correlationId) => {
		const name2 = String.trim(name.value);
		const response = await serviceStore.dispatcher.copyRocketById(correlationId, { id: props.params.id, name: name2 });
		return response;
	};
	// eslint-disable-next-line
	const resetAdditional = async (correlationId, previous) => {
		name.value = props.params ? props.params.name : null;
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
		name,
		buttonOkDisabledOverride,
		dialogError,
		dialogClose,
		dialogOk,
		preCompleteOk,
		resetAdditional,
		scope: 'RocketCopyDialog',
		validation: useVuelidate({ $scope: 'RocketCopyDialog' })
	};
};
</script>
