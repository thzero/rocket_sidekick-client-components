<template>
	<ContentLayout>
		<ContentHeader :value="contentTitle" />
		<div
			v-if="hasContentMarkupToc"
			class="pt-2"
		>
			<v-row dense>
				<v-col cols="12" class="pb-2">
					<v-card>
						<v-card-text>
			<v-row dense>
				<v-col
					v-for="(item, index) in contentMarkupToc"
					:key="index"
				>
					<a :href="('#' + item.tag)"><span class="nobreak"><h3>{{ item.title }}</h3></span></a>
				</v-col>
			</v-row>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</div>
		<div
			v-for="(item, index) in contentMarkup"
			:key="index"
			:class="(!hasContentMarkupToc ? 'pt-2' : '')"
		>
			<v-row dense>
				<a :name="(item.tag)"></a>
				<v-col cols="12" class="pb-2">
					<v-card>
						<v-card-text>
<VtMarkdown v-model="item.markup" :use-github=false />
						</v-card-text>
						<LoadingOverlay
							:signal="contentLoadSignal"
						/>
					</v-card>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12" class="pb-2">
					<v-card>
						<v-card-text>
<Attribution :value="item" @has-attribution="handleAttribution" />
						</v-card-text>
						<LoadingOverlay
							:signal="contentLoadSignal"
							:progress="false"
						/>
					</v-card>
				</v-col>
			</v-row>
		</div>
	</ContentLayout>
</template>

<script>
import { useInfoMarkupBaseComponent } from '@/components/content/info/infoMarkupBase';

import Attribution from '@/components/content/Attribution';
import ContentHeader from '@/components/content/Header';
import ContentLayout from '@/components/content/Layout';
import LoadingOverlay from '@/components/LoadingOverlay';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';

export default {
	name: 'InfoMarkup',
	components: {
		Attribution,
		ContentHeader,
		ContentLayout,
		LoadingOverlay,
		VtMarkdown
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
			content,
			contentDesc,
			contentId,
			handleAttribution,
			contentLoadSignal,
			contentMarkup,
			contentMarkupToc,
			contentTitle,
			hasContentMarkupToc
		} = useInfoMarkupBaseComponent(props, context);

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
			content,
			contentDesc,
			contentId,
			handleAttribution,
			contentLoadSignal,
			contentMarkup,
			contentMarkupToc,
			contentTitle,
			hasContentMarkupToc
		};
	}
};
</script>

<style scoped>
.nobreak
{
  white-space: pre;
}
</style>
