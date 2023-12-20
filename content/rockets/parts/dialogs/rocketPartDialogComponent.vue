<script>
import { computed, ref, watch } from 'vue';

import LibraryCommonUtility from '@thzero/library_common/utility';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useBaseEditComponent } from '@thzero/library_client_vue3/components/baseEdit';
import { useAdminComponent } from '@/components/content/adminComponent';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useRocketPartDialogComponent(props, context, options) {
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
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		measurementUnitsFromUnitId
	} = useToolsMeasurementUtilityComponent(props, context);

	const {
		hasAdminDelete,
		hasAdminEdit,
		hasAdminRoles,
		isLoggedIn
	} = useAdminComponent(props, context, { role: 'parts:public'});

	const detailItem = ref(null);
	
	const detailItemTextRows = computed(() => {
		return editable.value ? 5 : 1;
	});

	const dialogClose = async () => {
		context.emit('close');
	};
	const dialogError = async () => {
		context.emit('error');
	};
	const dialogOk = async () => {
		context.emit('ok');
	};

	const preCompleteOk = async (correlationId) => {
		if (!options.setAdditional)
			return error('useRocketPartDialogComponent', 'preCompleteOk', 'invalid setAdditional method', null, null, null, correlationId);

		await setAdditional(correlationId);

		if (!props.preCompleteOk)
			return error('useRocketPartDialogComponent', 'preCompleteOk', 'invalid preCompletedOk property', null, null, null, correlationId);

		// call the parent to tell them to save off the detail item
		return await props.preCompleteOk(correlationId, detailItem.value);
	};
	const resetAdditional = async (correlationId) => {
		if (!options.resetAdditional)
			return error('useRocketPartDialogComponent', 'preCompleteOk', 'invalid resetAdditional method', null, null, null, correlationId);

		await options.resetAdditional(correlationId);
	};
	const setAdditional = async (correlationId) => {
		if (!options.setAdditional)
			return error('useRocketPartDialogComponent', 'preCompleteOk', 'invalid setAdditional method', null, null, null, correlationId);

		await options.setAdditional(correlationId);
	};

	watch(() => props.value,
		async (value) => {
			if (options && options.initEdit)
				value = options.initEdit(correlationId(), value.item);
			detailItem.value = LibraryCommonUtility.cloneDeep(value.item);
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
		buttonsDialog,
		buttonsForms,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		measurementUnitsFromUnitId,
		hasAdminDelete,
		hasAdminEdit,
		hasAdminRoles,
		isLoggedIn,
		detailItem,
		detailItemTextRows,
		dialogClose,
		dialogError,
		dialogOk,
		preCompleteOk,
		resetAdditional,
		setAdditional
	};
};
</script>
