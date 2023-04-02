<script>
import { ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useChecklistControlComponent(props, context, options) {
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

	const ok = () => {
		context.emit('ok');
	};
	const preCompleteOk = async (correlationId) => {
		const name2 = String.trim(name.value);
		// const response = await serviceStore.dispatcher.copyChecklist(correlationId, { id: props.params.id, name: name2 });
		const response = success(correlationId, { id: props.params.id }); // TODO
		logger.debug('ChecklistCopyDialog', 'preCompleteOk', 'response', response, correlationId);
		if (hasSucceeded(response)) {
			LibraryClientUtility.$navRouter.push(LibraryCommonUtility.formatUrl({ url: '/user/checklists', params: [ response.results.id ]}));
			return response;
		}

		return success(correlationId);
	};
	// eslint-disable-next-line
	const resetForm = async (correlationId, options) => {
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
		ok,
		preCompleteOk,
		resetForm,
		scope: 'ChecklistControl',
		validation: useVuelidate({ $scope: 'ChecklistControl' })
	};
};
</script>
