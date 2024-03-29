<template>
	<!-- [[ isEditable {{ isEditable }}]] -->
	<div v-bind="$attrs">
		<v-row 
			dense
		>
			<v-col cols="12">
				<v-sheet 
					class="d-flex"
					:color="rowColor"
					rounded
					:draggable="isDraggable"
					@drag="dragged($event)"
					@dragover="dragOver($event)"
					@dragend="dragEnd($event)"
					@dragstart="dragStart($event)"
				>
					<div
						v-if="dragHasTarget"
  						class="d-flex justify-center align-center ml-2"
						@dragover="dragOverDrop($event, 'down')"
						@drop="dragDrop($event, 'down')"
					>
						<v-icon
							:color="dragTarget === 'down' ? 'green': null"
							icon="mdi-arrow-down-bold-circle-outline"
							size="48px">
						</v-icon>
					</div>
					<div
						v-if="dragHasTarget"
  						class="d-flex justify-center align-center ml-2"
						@dragover="dragOverDrop($event, 'up')"
						@drop="dragDrop($event, 'up')"
					>
						<v-icon
							:color="dragTarget === 'up' ? 'green': null"
							icon="mdi-arrow-up-bold-circle-outline"
							size="48px">
						</v-icon>
					</div>
					<div
						v-if="dragHasTarget && isSection"
  						class="d-flex justify-center align-center ml-2"
						@dragover="dragOverDrop($event, 'in')"
						@drop="dragDrop($event, 'in')"
					>
						<v-icon
							:color="dragTarget === 'in' ? 'green': null"
							icon="mdi-arrow-right-bold-circle-outline"
							size="48px"
						>
						</v-icon>
					</div>
					<div class="pl-2 pr-4 pb-2 pt-2">
						<v-icon
							v-if="statusCompleted"
							style="float: left;" 
							size="48px"
						>
							{{ isLaunch ? 'mdi-rocket-launch' : 'mdi-check' }}
						</v-icon>
						<!-- dragable -->
						<!-- <slot name="draghandle">
							<span class="column-drag-handle mr-2">&#x2630;</span>
						</slot> -->
						<span class="v-card-title">{{ item.name }} {{ isSection ? $t('forms.content.checklists.section') : ''}}</span>
					</div>
					<v-spacer></v-spacer>
					<div class="pl-4 pr-4 pb-2 pt-2">
						<!-- <v-btn
							v-if="isEditable && moveUp"
							class="mr-2"
							size="small"
							icon="mdi-menu-up"
						></v-btn>
						<v-btn
							v-if="isEditable && moveDown"
							size="small"
							icon="mdi-menu-down"
						></v-btn> -->
						<v-btn 
							v-if="isInProgress && !statusCompleted && hasCompleted"
							prepend-icon="mdi-check"
							:variant="buttonsForms.variant.ok"
							:color="buttonsForms.color.ok"
							@click="handleComplete"
							:loading="isLoading"
							>{{ $t('buttons.complete') }}</v-btn>
						<v-btn 
							v-if="isInProgress && !statusCompleted && isLaunch && root.canLaunch"
							prepend-icon="mdi-rocket-launch"
							:variant="buttonsForms.variant.ok"
							:color="buttonsForms.color.ok"
							@click="handleLaunch"
							:loading="isLoading"
						>{{ $t('buttons.launch') }}</v-btn>
					</div>
				</v-sheet>
			</v-col>
			<v-col cols="12">
				<v-card>
					<v-card-text
						v-if="item.description"
					>
						<slot name="description">
							{{ item.description }}
						</slot>
					</v-card-text>
					<v-card-actions
						v-if="isEditable && !isLaunch"
					>
						<v-spacer></v-spacer>
						<v-tooltip :text="$t('tooltips.content.checklists.steps.add')">
							<template v-slot:activator="{ props }">
								<v-btn
									v-if="canAdd"
									v-bind="props"
									:variant="buttonsForms.variant.add"
									:color="buttonsForms.color.add"
								>{{ $t('buttons.add' )}}</v-btn>
							</template>
						</v-tooltip>
						<v-tooltip :text="$t('tooltips.content.checklists.steps.delete')">
							<template v-slot:activator="{ props }">
								<v-btn 
									v-if="canDelete"
									v-bind="props"
									:variant="buttonsForms.variant.delete"
									:color="buttonsForms.color.delete"
								>{{ $t('buttons.delete' )}}</v-btn>
							</template>
						</v-tooltip>
						<v-tooltip :text="$t('tooltips.content.checklists.steps.edit')">
							<template v-slot:activator="{ props }">
								<v-btn 
									v-if="isEditable"
									v-bind="props"
									:variant="buttonsForms.variant.edit"
									:color="buttonsForms.color.edit"
								>{{ $t('buttons.edit' )}}</v-btn>
							</template>
						</v-tooltip>
						<!-- <v-btn 
							v-if="isEditable"
							class="ml-2 mr-2">{{ $t('buttons.delete' )}}</v-btn> -->
						<!-- <v-tooltip :text="$t('tooltips.content.checklists.steps.moveIn')">
							<template v-slot:activator="{ props }">
								<v-btn
									v-if="isEditable && moveIn"
									v-bind="props"
									density="comfortable"
									color="black"
									style="background-color: gray;"
									icon="mdi-menu-right"
									@click="handleMoveIn"
								></v-btn>
							</template>
						</v-tooltip>
						<v-tooltip :text="$t('tooltips.content.checklists.steps.moveUp')">
							<template v-slot:activator="{ props }">
								<v-btn
									v-if="isEditable && moveUp"
									v-bind="props"
									color="black"
									density="comfortable"
									style="background-color: gray;"
									icon="mdi-menu-up"
									@click="handleMoveUp"
								></v-btn>
							</template>
						</v-tooltip>
						<v-tooltip :text="$t('tooltips.content.checklists.steps.moveDown')">
							<template v-slot:activator="{ props }">
								<v-btn
									v-if="isEditable && moveDown"
									v-bind="props"
									density="comfortable"
									color="black"
									style="background-color: gray;"
									icon="mdi-menu-down"
									@click="handleMoveDown"
								></v-btn>
							</template>
						</v-tooltip>
						<v-tooltip :text="$t('tooltips.content.checklists.steps.moveOut')">
							<template v-slot:activator="{ props }">
								<v-btn
									v-if="isEditable && moveOut"
									v-bind="props"
									density="comfortable"
									color="black"
									style="background-color: gray;"
									icon="mdi-menu-left"
									@click="handleMoveOut"
								></v-btn>
							</template>
						</v-tooltip> -->
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		<slot>
		</slot>
	</div>
</template>

<script>
import { useChecklistStepPanelComponent } from '@/components/content/checklists/checklist/checklistStepPanelComponent';
import { useChecklistStepsPanelComponentProps } from '@/components/content/checklists/checklist/checklistStepPanelComponentProps';

export default {
	name: 'ChecklistPanel',
	props: {
		...useChecklistStepsPanelComponentProps
	},
	setup (props, context) {
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
		} = useChecklistStepPanelComponent(props, context);

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
	}
};
</script>

<style scoped>
</style>