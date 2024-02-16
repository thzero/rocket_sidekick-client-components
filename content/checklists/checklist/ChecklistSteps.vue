<template>
	<!-- [[ ChecklistSteps ]]
	[[ isEditable {{ isEditable }}]]
	[[ hasItem {{ hasItem }}]]
	<pre>[[ item {{ item }}]]</pre> -->
	<template 
		v-if="hasItem"
	>
		<template 
			v-for="(item1, index1) in item.steps" 
			:key="item1.id"
		>
			<ChecklistStepPanel 
				class="mt-2"
				:depth="0"
				:depthMax="!item.steps || item.steps.length === 0"
				:index="index1"
				:item="item1"
				:total="item.steps.length"
				:parent="item"
				:root="item"
				:isEditable="isEditable"
				:isLoading="isLoading"
				:isInProgress="isInProgress"
				:updateStatus="updateStatus"
				:debug="debug"
			>
				<template 
					v-for="(item2, index2) in item1.steps" 
					:key="item2.id"
				>
					<ChecklistStepPanel 
						class="ml-6 mt-2"
						:depth="1"
						:depthMax="!item2.steps || item2.steps.length === 0"
						:index="index2"
						:item="item2"
						:parent="item1"
						:root="item"
						:isEditable="isEditable"
						:isInProgress="isInProgress"
						:isLoading="isLoading"
						:updateStatus="updateStatus"
						:debug="debug"
					>
						<template 
							v-for="(item3, index3) in item2.steps" 
							:key="item3.id"
						>
							<ChecklistStepPanel 
								class="ml-6 mt-2"
								:depth="2"
								:depthMax="!item3.steps || item3.steps.length === 0"
								:index="index3"
								:item="item3"
								:parent="item2"
								:root="item"
								:isEditable="isEditable"
								:isInProgress="isInProgress"
								:isLoading="isLoading"
								:updateStatus="updateStatus"
								:debug="debug"
							>
								<template 
									v-for="(item4, index4)  in item3.steps" 
									:key="item4.id"
								>
									<ChecklistStepPanel 
										class="ml-6 mt-2"
										:depth="3"
										:depthMax="!item4.steps || item4.steps.length === 0"
										:index="index4"
										:item="item4"
										:parent="item3"
										:root="item"
										:isEditable="isEditable"
										:isLoading="isLoading"
										:isInProgress="isInProgress"
										:updateStatus="updateStatus"
										:debug="debug"
									>
										<template 
											v-for="(item5, index5) in item4.steps" 
											:key="item5.id"
										>
											<ChecklistStepPanel 
												class="ml-6 mt-2"
												:depth="4"
												:depthMax="false"
												:index="index5"
												:parent="item4"
												:root="item"
												:isEditable="isEditable"
												:isLoading="isLoading"
												:isInProgress="isInProgress"
												:updateStatus="updateStatus"
												:debug="debug"
											>
											</ChecklistStepPanel>
										</template>
									</ChecklistStepPanel>
								</template>
							</ChecklistStepPanel>
						</template>
					</ChecklistStepPanel>
				</template> 
			</ChecklistStepPanel>
		</template> 
	</template>
</template>

<script>
import { useChecklistStepsComponent } from '@/components/content/checklists/checklist/checklistStepsComponent';
import { useChecklistStepsComponentProps } from '@/components/content/checklists/checklist/checklistStepsComponentProps';

import ChecklistStepPanel from '@/components/content/checklists/checklist/ChecklistStepPanel';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'ChecklistSteps',
	components: {
		ChecklistStepPanel,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
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
</style>