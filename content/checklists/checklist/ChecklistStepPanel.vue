<template>
	<!-- [[ isEditable {{ isEditable }}]] -->
	<div v-bind="$attrs">
		<v-row dense>
			<v-col>
				<v-sheet 
					class="d-flex"
					:color="rowColor"
					rounded
				>
					<div class="pl-2 pr-4 pb-2 pt-2">
						<v-icon
							v-if="statusCompleted"
							style="height: 48px; float: left;" 
						>
							{{ hasLaunch ? 'mdi-rocket-launch' : 'mdi-check' }}
						</v-icon>
						<!-- dragable -->
						<!-- <slot name="draghandle">
							<span class="column-drag-handle mr-2">&#x2630;</span>
						</slot> -->
						<span class="v-card-title">{{ item.name }}</span>
					</div>
					<v-spacer></v-spacer>
					<div class="pl-4 pr-4 pb-2 pt-2">
						<v-btn
							v-if="isEditable && moveUp1"
							class="mr-2"
							size="small"
							icon="mdi-menu-up"
						></v-btn>
						<v-btn
							v-if="isEditable && moveDown1"
							size="small"
							icon="mdi-menu-down"
						></v-btn>
						<v-btn 
							v-if="isInProgress && !statusCompleted && hasCompleted"
							prepend-icon="mdi-check"
							:variant="buttonsForms.variant.ok"
							:color="buttonsForms.color.ok"
							@click="handleComplete"
							>{{ $t('buttons.complete') }}</v-btn>
						<v-btn 
							v-if="isInProgress && !statusCompleted && hasLaunch && root.canLaunch"
							prepend-icon="mdi-rocket-launch"
							:variant="buttonsForms.variant.ok"
							:color="buttonsForms.color.ok"
							@click="handleLaunch"
						>{{ $t('buttons.launch') }}</v-btn>
					</div>
				</v-sheet>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col>
				<v-card>
					<v-card-text
						v-if="item.description"
					>
						<slot name="description">
							{{ item.description }}
						</slot>
					</v-card-text>
					<v-card-actions
						v-if="isEditable"
					>
						<v-spacer></v-spacer>
						<v-btn 
							v-if="isEditable"
							class="ml-2 mr-2">asdfasdf</v-btn>
						<v-btn 
							v-if="isEditable"
							class="ml-2 mr-2">asdfasdf</v-btn>
						<v-btn 
							v-if="isEditable"
							class="ml-2 mr-2">asdfasdf</v-btn>
						<!-- <v-btn 
							v-if="isInProgress"
							:variant="buttonsForms.variant.ok"
							:color="buttonsForms.color.ok"
							class="ml-2 mr-2">Complete</v-btn> -->
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
			hasCompleted,
			hasLaunch,
			moveDown1,
			moveUp1,
			rowColor,
			statusCompleted,
			handleComplete,
			handleLaunch
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
			hasCompleted,
			hasLaunch,
			moveDown1,
			moveUp1,
			rowColor,
			statusCompleted,
			handleComplete,
			handleLaunch
		};
	}
};
</script>

<style scoped>
</style>