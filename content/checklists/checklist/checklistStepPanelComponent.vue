<script>
import { computed, ref } from 'vue';

import AppConstants from '@/constants';
import AppCommonConstants from 'rocket_sidekick_common/constants.js';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useBaseEditComponent } from '@thzero/library_client_vue3/components/baseEdit';
import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';

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

	const dragHasTarget = ref(false);
	const dragTarget = ref(null);

	const canAdd = computed(() => {
		if (!props.item)
			return false;
		
		return props.isEditable && !isLaunch.value;
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
	const isDraggable = computed(() => {
		return (
			!isLaunch.value && 
			props.root.statusId !== AppCommonConstants.Checklists.ChecklistStatus.completed && 
			props.root.statusId !== AppCommonConstants.Checklists.ChecklistStatus.inProgress
		);
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
		const total = (props.total ?? 99) - (props.depth === 0 ? 2 : 1);
		return ((props.index >= 0 && props.index < total)) && !isLaunch.value;
	});
	const moveIn = computed(() => {
		return (((props.depth > 0) || (props.depth === 0 && props.index > 0)) && !props.depthMax) && !isLaunch.value;
	});
	const moveOut = computed(() => {
		return (props.depth > 0) && !isLaunch.value;
	});
	const moveUp = computed(() => {
		return (props.index > 0) && !isLaunch.value;
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

	let DragMaxScrollSpeed = 20;
	let dragScrollDelta = 0;
	let dragScrollingTimer = null;
	const dragged = (e) => {
		if (e.y < 150)
			dragScrollDelta = Math.max(-DragMaxScrollSpeed, e.y - 150);
		else if (e.y > (window.innerHeight - 150))
			dragScrollDelta = Math.min(DragMaxScrollSpeed, e.y - (window.innerHeight - 150));
		 else
			dragScrollDelta = 0;

		if (dragScrollDelta !== 0 && !dragScrollingTimer)
			dragScrollingTimer = window.requestAnimationFrame(dragScroll);
	};
	const dragDrop = async (e, direction) => {
		dragHasTarget.value = false;
		dragTarget.value = null;
		alert(e);
		if (!LibraryClientUtility.$store.checklistsDragItem) {
			alert('error - no dragged item!');
			return;
		}
		if (!direction) {
			alert('error - no direction');
			return;
		}
		if (!props.item) {
			alert('error - no item!');
			return;
		}

		alert(`Gonna move ${direction}...` + props.item.name);
		await updateMove(correlationId(), LibraryClientUtility.$store.checklistsDragItem, props.item.id, props.parent.id, direction);
	};
	const dragEnd = (event) => {
		dragScrollDelta = 0;
		if (dragScrollingTimer)
			window.cancelAnimationFrame(dragScrollingTimer);
		dragScrollingTimer = null;
		LibraryClientUtility.$store.checklistsDragItem = null;
	};
	let debounced = LibraryCommonUtility.debounce(() => {
		dragHasTarget.value = false;
		dragTarget.value = null;
	}, 150);
	const dragOver = (e) => {
		return dragOverI(e, false);
	};
	const dragOverI = (e, droppable, target) => {
		if (!LibraryClientUtility.$store.checklistsDragItem)
			return;

		if (LibraryClientUtility.$store.checklistsDragItem.typeId === AppCommonConstants.Checklists.ChecklistStepTypes.section) {
			if (!isSection.value)
				return;
			if (props.item.id === LibraryClientUtility.$store.checklistsDragItem.itemId)
				return;

			dragHasTarget.value = true;
			if (droppable)
				dragTarget.value = target;
			debounced();

			if (droppable)
				e.preventDefault();
			return;
		}
		if (LibraryClientUtility.$store.checklistsDragItem.typeId !== AppCommonConstants.Checklists.ChecklistStepTypes.section) {
			if (props.item.id === LibraryClientUtility.$store.checklistsDragItem.itemId)
				return;

			dragHasTarget.value = true;
			if (droppable)
				dragTarget.value = target;
			debounced();

			if (droppable)
				e.preventDefault();
			return;
		}
	};
	const dragOverDrop = (e, target) => {
		return dragOverI(e, true, target);
	};
	const dragScroll = () => {
		if (dragScrollDelta !== 0)
			window.scrollBy({left: 0, top: dragScrollDelta, behavior: 'instant'});
		dragScrollDelta = 0;
		dragScrollingTimer = null;
	};
	const dragStart = (event) => {
		LibraryClientUtility.$store.checklistsDragItem = { typeId: props.item.typeId, itemId: props.item.id, parentId: props.parent.id };
	};
	const handleAdd = () => {
	};
	const handleComplete = async () => {
		await props.updateStatus(correlationId(), props.item.id, AppCommonConstants.Checklists.ChecklistStepStatus.completed);
	};
	const handleDelete = () => {
	};
	const handleLaunch = async () => {
	};
	const handleMoveDown = async () => {
		await props.updateMove(correlationId(), props.item.id, AppConstants.ChecklistMoveDirection.down);
	};
	const handleMoveIn = async () => {
		await props.updateMove(correlationId(), props.item.id, AppConstants.ChecklistMoveDirection.in);
	};
	const handleMoveOut = async () => {
		await props.updateMove(correlationId(), props.item.id, AppConstants.ChecklistMoveDirection.out);
	};
	const handleMoveUp = async () => {
		await props.updateMove(correlationId(), props.item.id, AppConstants.ChecklistMoveDirection.up);
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
		dragHasTarget,
		dragTarget,
		canAdd,
		canDelete,
		hasCompleted,
		isDraggable,
		isLaunch,
		isSection,
		moveDown,
		moveIn,
		moveOut,
		moveUp,
		rowColor,
		statusCompleted,
		dragged,
		dragDrop,
		dragEnd,
		dragOver,
		dragOverDrop,
		dragStart,
		handleAdd,
		handleComplete,
		handleDelete,
		handleLaunch,
		handleMoveDown,
		handleMoveIn,
		handleMoveOut,
		handleMoveUp
	};
};
</script>
