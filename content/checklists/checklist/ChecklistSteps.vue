<template>
	<!-- [[ ChecklistSteps ]]
	[[ readonly {{ readonly }}]]
	[[ hasItem {{ hasItem }}]]
	[[ item {{ JSON.stringify(item) }}]] -->
	<Container 
		v-if="hasItem"
		@drop="onDrop($event)"
		:get-child-payload="(itemIndex) => getChildPayload(null, itemIndex)"
		lock-axis="y"
	>
		<!-- drag-handle-selector=".column-drag-handle" -->
		<Draggable 
			v-for="item1 in item.steps" 
			:key="item1.id"
			:drag-not-allowed="true"
		>
			<ChecklistStepPanel 
				class="mt-2"
				:title="item1.name"
				:item="item1"
				:moveUp="false"
				:parent="item"
				:readonly="readonly"
			>
				<Container 
					@drop="onDrop($event)"
					:get-child-payload="(itemIndex) => getChildPayload([item1.id], itemIndex)"
					lock-axis="y"
				>
					<Draggable 
						v-for="item2 in item1.steps" 
						:key="item2.id"
						:drag-not-allowed="true"
					>
						<ChecklistStepPanel 
							class="ml-6 mt-2"
							:title="item2.name"
							:item="item2"
							:parent="item1"
							:readonly="readonly"
						>
							<Container 
								@drop="onDrop($event)"
								:get-child-payload="(itemIndex) => getChildPayload([item1.id, item2.id], itemIndex)"
								lock-axis="y"
							>
								<Draggable 
									v-for="item3 in item2.steps" 
									:key="item3.id"
									:readonly="readonly"
								>
									<ChecklistStepPanel 
										class="ml-6 mt-2"
										:title="item3.name"
										:item="item3"
										:parent="item2"
										:readonly="readonly"
									>
										<Container 
											@drop="onDrop($event)"
											:get-child-payload="(itemIndex) => getChildPayload([item1.id, item2.id, item3.id], itemIndex)"
											lock-axis="y"
										>
											<Draggable 
												v-for="item4 in item3.steps" 
												:key="item4.id"
												:readonly="readonly"
											>
												<ChecklistStepPanel 
													class="ml-6 mt-2"
													:title="item4.name"
													:item="item4"
													:parent="item3"
													:readonly="readonly"
												>
													<Container 
														@drop="onDrop($event)"
														:get-child-payload="(itemIndex) => getChildPayload([item1.id, item2.id, item3.id, item4.id], itemIndex)"
														lock-axis="y"
													>
														<Draggable 
															v-for="item5 in item4.steps" 
															:key="item5.id"
															:readonly="readonly"
														>
															<ChecklistStepPanel 
																class="ml-6 mt-2"
																:title="item5.name"
																:item="item5"
																:moveDown="false"
																:parent="item4"
																:readonly="readonly"
															>
															</ChecklistStepPanel>
														</Draggable>
													</Container>
												</ChecklistStepPanel>
											</Draggable>
										</Container>
									</ChecklistStepPanel>
								</Draggable>
							</Container>
						</ChecklistStepPanel>
					</Draggable> 
				</Container>
			</ChecklistStepPanel>
		</Draggable> 
	</Container>
</template>

<script>
import { Container, Draggable } from "vue-dndrop";
// import { applyDrag, generateItems } from "../utils/helpers";

import { useChecklistStepsComponent } from '@/components/content/checklists/checklist/checklistStepsComponent';
import { useChecklistStepsComponentProps } from '@/components/content/checklists/checklist/checklistStepsComponentProps';

import ChecklistStepPanel from '@/components/content/checklists/checklist/ChecklistStepPanel';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'ChecklistSteps',
	components: {
		Container,
		Draggable,
		ChecklistStepPanel,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
	},
	props: {
		...useChecklistStepsComponentProps
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
			hasItem,
			getChildPayload,
			onDrop
		} = useChecklistStepsComponent(props, context);

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
			hasItem,
			getChildPayload,
			onDrop
		};
	}
};
</script>

<style scoped>
</style>

<style>
.dndrop-container {
	min-height: auto;
}
</style>