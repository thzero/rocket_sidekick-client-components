<script>
import { computed, ref, watch } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useAdminComponent(props, context, options) {
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

	if (String.isNullOrEmpty(options.role))
		throw Error('Invalid role.');

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);
	const serviceSecurity = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_SECURITY);

	const roles = ref([]);
	
	const hasAdminDelete = computed(() => {
		return roles.value.includes('delete');
	});
	const hasAdminEdit = computed(() => {
		return roles.value.includes('edit');
	});
	const hasAdminRoles = computed(() => {
		return roles.value;
	});
	const isLoggedIn = computed(() => {
		return serviceStore.user != null ? serviceStore.userAuthIsLoggedIn : false;
	});

	const computeSecurity = async () => {
		const correlationIdI = correlationId();
		const rolesT = ['delete', 'edit'];
		if (options.additional)
			rolesT.push(...options.additional)
		let temp;
		let role;
		for(const item of rolesT) {
			role = item;
			if (item === 'delete' || item === 'edit')
				role = options.role + ':' + item;

			temp = await serviceSecurity.securityAdmin(correlationIdI, [ role ]);
			if (temp)
				roles.value.push(item);
		}
	};
	(async () => {
		await computeSecurity();
	})();
	
	return {
		hasAdminDelete,
		hasAdminEdit,
		hasAdminRoles,
		isLoggedIn
	};
};
</script>
