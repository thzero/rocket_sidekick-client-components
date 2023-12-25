<template>
	<!-- [[ readonly {{ readonly }}]] -->
	<div v-bind="$attrs">
		<v-row dense>
			<v-col>
				<v-sheet 
					class="d-flex"
					color="info"
					rounded
				>
					<div class="pl-2 pr-4 pb-4 pt-2">
						<!-- dragable -->
						<!-- <slot name="draghandle">
							<span class="column-drag-handle mr-2">&#x2630;</span>
						</slot> -->
						<slot name="title">
							{{ title }}
						</slot>
					</div>
					<v-spacer></v-spacer>
					<div class="pl-4 pr-4 pb-2 pt-2">
						<slot name="pre">
						</slot>
						<v-btn
							v-if="!readonly && moveUp1"
							class="mr-2"
							size="small"
							icon="mdi-menu-up"
						></v-btn>
						<v-btn
							v-if="!readonly && moveDown1"
							size="small"
							icon="mdi-menu-down"
						></v-btn>
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
						v-if="!readonly"
					>
						<v-spacer></v-spacer>
						<v-btn 
							v-if="!readonly"
							class="ml-2 mr-2">asdfasdf</v-btn>
						<v-btn 
							v-if="!readonly"
							class="ml-2 mr-2">asdfasdf</v-btn>
						<v-btn 
							v-if="!readonly"
							class="ml-2 mr-2">asdfasdf</v-btn>
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
			moveDown1,
			moveUp1
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
			moveDown1,
			moveUp1
		};
	}
};
</script>

<style scoped>
</style>