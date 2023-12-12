<template>
	<div
		class="mt-2"
	>
		<!-- <pre>{{ displayItem }}</pre> -->
		<!-- {{ stagePrimary }} -->
		<!-- {{ stagePrimaryRocket }} -->
		<!-- length {{ length }} -->
		<v-row dense
			v-if="displayItem.description"
		>
			<v-col cols="12">
				<VtMarkdown v-model="displayItem.description" :use-github=false />
			</v-col>
		</v-row>
		<v-row dense>
			<v-col 
				cols="12"
			>
				<v-sheet
					class="pt-2 pb-2"
				>
					<h3>{{ $t('titles.content.rockets.specifications') }}</h3>
					<v-divider></v-divider>
				</v-sheet>
			</v-col>
			<!-- <v-col 
				v-if="stages"
				cols="12" sm="6"
			>
				<VtTextField
					v-model="stages"
					:label="$t('strings.rockets.stages')"
					:readonly="true"
				/>
			</v-col> -->
			<!-- <v-col 
				v-if="diameter"
				cols="4" sm="3"
			>
				<VtTextField
					v-model="diameter"
					:label="$t('strings.rockets.diameterMajor')"
					:readonly="true"
				/>
			</v-col> -->
			<!-- <v-col 
				v-if="stages"
				cols="2"
			>
				<VtTextField
					v-model="stages"
					:label="$t('strings.rockets.stages')"
					:readonly="true"
				/>
			</v-col> -->
			<v-col 
				v-if="length"
				cols="3" md="2"
			>
				<VtTextField
					v-model="length"
					:label="$t('strings.rockets.length')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="weight"
				cols="3" md="2"
			>
				<VtTextField
					v-model="weight"
					:label="$t('strings.rockets.weight')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="cg"
				cols="4" sm="3" md="2"
			>
				<VtTextField
					v-model="cg"
					:label="$t('strings.rockets.cg')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="cp"
				cols="4" sm="3" md="2"
			>
				<VtTextField
					v-model="cp"
					:label="$t('strings.rockets.cp')"
					:readonly="true"
				/>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col 
				v-if="stagePrimaryRocket.manufacturerId"
				cols="12" sm="6"
			>
				<VtTextField
					v-model="manufacturer"
					:label="$t('forms.content.parts.manufacturer')"
					:readonly="true"
				/>
			</v-col>
			<v-col 
				v-if="stagePrimaryRocket.manufacturerStockId"
				cols="12" sm="6"
			>
				<VtTextField
					v-model="stagePrimaryRocket.manufacturerStockId"
					:label="$t('forms.content.parts.manufacturerId')"
					:readonly="true"
				/>
			</v-col>
		</v-row>
		<v-sheet
			v-if="stageRocketMotors.length > 0"
			class="pt-2 pb-2 mt-2"
		>
			<h3>{{ $t('strings.content.rockets.motors') }}</h3>
			<v-divider></v-divider>
		</v-sheet>
		<v-row 
			v-for="item in stageRocketMotors"
			:key="item"
			dense
		>
			<v-col 
				cols="12"
			>
				<v-sheet
					v-if="stageRocketMotors.length > 1"
					color="secondary"
					class="ml-4 mt-2 pl-4 pr-4 pt-2 pb-2"
					rounded
				>
					{{ $t('forms.content.rockets.stage.name') }}
					{{ item.index }}
				</v-sheet>
				<v-sheet 
					v-for="(item2, index) in item.motors"
					:key="item2"
					:color="index % 2 === 0 ? 'green' : 'green'"
					:class="`ml-${(stageRocketMotors.length > 1 ? '8' : '4')} mt-2 pl-4 pr-4 pt-2 pb-2`"
					style="width: 100%;"
					rounded
				>
					<!-- <v-row
						dense
						class="pl-8"
					>
						<v-col>
							{{ item2.name }}
						</v-col>
						<v-col>
							{{ item2.caseName }}
						</v-col>
					</v-row> -->
					<a style="color: white" :href="motorUrl(item2)" target="_blank">{{ item2.name }}</a> {{ $t('strings.content.rockets.in') }} {{ item2.caseName }}
				</v-sheet>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { useRocketSetupViewComponent } from '@/components/content/rockets/setups/setup/rocketSetupViewComponent';
import { useRocketSetupViewComponentProps } from '@/components/content/rockets/setups/setup/rocketSetupViewComponentProps';

import ContentHeader from '@/components/content/Header';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtTextArea from '@thzero/library_client_vue3_vuetify3/components/form/VtTextArea';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

export default {
	name: 'RocketSetupView',
	components: {
		ContentHeader,
		VtMarkdown,
		VtSelect,
		VtTextArea,
		VtTextField
	},
	props: {
		...useRocketSetupViewComponentProps
	},
	setup(props, context) {
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
			serviceStore,
			sortByOrder,
			target,
			cg,
			cp,
			diameter,
			displayItem,
			length,
			manufacturer,
			stagePrimary,
			stagePrimaryRocket,
			stageRocketMotors,
			stages,
			weight,
			motorUrl
		} = useRocketSetupViewComponent(props, context);

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
			serviceStore,
			sortByOrder,
			target,
			cg,
			cp,
			diameter,
			displayItem,
			length,
			manufacturer,
			stagePrimary,
			stagePrimaryRocket,
			stageRocketMotors,
			stages,
			weight,
			motorUrl
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
tr .specifications {
	padding-right: 12px;
}
</style>
