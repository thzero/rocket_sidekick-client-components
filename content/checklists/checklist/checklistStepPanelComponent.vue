<script>
import { computed } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants.js';

import { useBaseEditComponent } from '@thzero/library_client_vue3/components/baseEdit';
import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { corr } from 'mathjs';

export function useChecklistStepPanelComponent(props, context, options) {
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
	} = useBaseEditComponent(props, context, {
	});

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const hasCompleted = computed(() => {
		if (!props.item)
			return false;
		
		return (props.item.typeId !== AppCommonConstants.Checklists.ChecklistStepTypes.launch) &&
			(props.item.typeId !== AppCommonConstants.Checklists.ChecklistStepTypes.section);
	});
	const hasLaunch = computed(() => {
		if (!props.item)
			return false;
		
		return (props.item.typeId === AppCommonConstants.Checklists.ChecklistStepTypes.launch);
	});
	const moveDown1 = computed(() => {
		const total = (props.total ?? 99) - 1;
		return (props.depth > 0) || (props.depth === 0 && props.index >= 0 && props.index < total);
	});

	const moveUp1 = computed(() => {
		return (props.depth > 0) || (props.depth === 0 && props.index > 0);
	});
	const rowColor = computed(() => {
		if (!props.item || !props.item.statusId)
			return 'primary';

		if (props.item.statusId === AppCommonConstants.Checklists.ChecklistStepStatus.completed)
			return 'green';

		return 'primary';
	});
	const statusCompleted = computed(() => {
		if (!props.item)
			return false;
		
		return props.item.statusId === AppCommonConstants.Checklists.ChecklistStepStatus.completed;
	});

	const handleComplete = async () => {
		await props.updateStatus(correlationId(), props.item.id, AppCommonConstants.Checklists.ChecklistStepStatus.completed);
	};
	const handleLaunch = async () => {
		await props.updateStatus(correlationId(), props.item.id, AppCommonConstants.Checklists.ChecklistStepStatus.completed, true);
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
		buttonsForms,
		hasCompleted,
		hasLaunch,
		moveDown1,
		moveUp1,
		rowColor,
		statusCompleted,
		handleComplete,
		handleLaunch
	};
};
</script>
