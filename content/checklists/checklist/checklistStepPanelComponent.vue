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

	const canAdd = computed(() => {
		if (!props.item)
			return false;
		
		return props.isEditable && isSection.value && !isLaunch.value;
	});
	const canDelete = computed(() => {
		if (!props.item)
			return false;
		
		return props.isEditable && !isLaunch.value;
	});
	const hasCompleted = computed(() => {
		if (!props.item)
			return false;
		
		return (props.item.typeId !== AppCommonConstants.Checklists.ChecklistStepTypes.launch) &&
			(props.item.typeId !== AppCommonConstants.Checklists.ChecklistStepTypes.section);
	});
	const isLaunch = computed(() => {
		if (!props.item)
			return false;
		
		return (props.item.typeId === AppCommonConstants.Checklists.ChecklistStepTypes.launch);
	});
	const isSection = computed(() => {
		if (!props.item)
			return false;
		
		return (props.item.typeId === AppCommonConstants.Checklists.ChecklistStepTypes.section);
	});
	const moveDown = computed(() => {
		const total = (props.total ?? 99) - 1;
		return ((props.depth > 0) || (props.depth === 0 && props.index >= 0 && props.index < total)) && !isLaunch.value;;
	});
	const moveIn = computed(() => {
		return (((props.depth > 0) || (props.depth === 0 && props.index > 0)) && !props.depthMax) && !isLaunch.value;;
	});
	const moveOut = computed(() => {
		return ((props.depth > 0) || (props.depth === 0 && props.index > 0)) && !isLaunch.value;;
	});
	const moveUp = computed(() => {
		return ((props.depth > 0) || (props.depth === 0 && props.index > 0)) && !isLaunch.value;;
	});
	const rowColor = computed(() => {
		if (!props.item || !props.item.statusId) {
			if (props.item.typeId === AppCommonConstants.Checklists.ChecklistStepTypes.launch)
				return 'red';
			return isSection.value ? 'primary' : 'secondary';
		}

		if (props.item.statusId === AppCommonConstants.Checklists.ChecklistStepStatus.completed)
			return 'green';

		if (props.item.typeId === AppCommonConstants.Checklists.ChecklistStepTypes.launch)
			return 'red';

		return isSection.value ? 'primary' : 'secondary';
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
		canAdd,
		canDelete,
		hasCompleted,
		isLaunch,
		isSection,
		moveDown,
		moveIn,
		moveOut,
		moveUp,
		rowColor,
		statusCompleted,
		handleComplete,
		handleLaunch
	};
};
</script>
