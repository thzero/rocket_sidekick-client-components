<template>
	<v-row dense>
		<v-col cols="12" md="2" />
		<v-col cols="12" md="8">
			<v-toolbar
				density="compact"
			>
				<v-toolbar-title class="text-center text-h5">
					<span>{{ $t('titles.about') }}</span>
				</v-toolbar-title>
			</v-toolbar>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="12" md="2" />
		<v-col cols="12" md="8">
			<v-card>
				<v-card-text>
<div class="mt-4">
    <p>
{{ $t('strings.about.text1a') }}
<a href="https://thzero.com/labs" target="_blank">thZero Labs</a>.
{{ $t('strings.about.text1ab') }}
 {{ $t('strings.about.text2') }} <a :href="`mailto:${emailsInquiry}@thzero.com`" :title="emailsInquiryTitle">{{ emailsInquiry }}</a>.
    </p>
</div>
<div class="mt-4">
    <p class="text-h5 text-center font-weight-bold pb-4">{{ $t('strings.about.contributing.title') }}</p>
    <p>
 {{ $t('titles.application') }} {{ $t('strings.about.contributing.text1') }} <a :href="`mailto:${emailsContributing}@thzero.com`" :title="emailsContributingTitle"> {{ emailsContributing }}</a>.
    </p>
    <p class="mt-2">
        {{ $t('strings.about.contributing.text2') }}:
        <ul class="ml-12">
            <li>{{ $t('strings.about.contributing.contributions.link') }}</li>
            <li>{{ $t('strings.about.contributing.contributions.info') }}</li>
            <li>{{ $t('strings.about.contributing.contributions.tool') }}</li>
            <li>{{ $t('strings.about.contributing.contributions.tool2') }}</li>
        </ul>
    </p>
    <p class="text-h5 text-center font-weight-bold pb-4">{{ $t('strings.about.contributing.licensing.title') }}</p>
    <p>{{ $t('strings.about.contributing.licensing.text1') }} {{ $t('strings.about.contributing.licensing.text2') }}</p>
    <ul class="ml-12">
        <li>{{ $t('strings.about.contributing.licensing.public') }}</li>
        <li>{{ $t('strings.about.contributing.licensing.free') }}</li>
    </ul>
</div>
<div class="text-h6 text-center pb-4">
    <a href="https://thzero.com" target="_blank"><img src="/images/thZeroLabs.png" alt="thzero.com" /></a>
</div>
<div class="mt-4">
    <p class="text-h6 text-center pb-4">
		<v-btn variant="flat" color="primary"
											to="/privacy">
			{{ $t('titles.privacy') }}
		</v-btn>
	</p>
</div>
<div>
    {{ $t('strings.copyright2') }} <a href="https://thzero.com" target="_blank">thzero.com</a> {{ $t('strings.copyright3') }}
</div>
                </v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { useAppAboutComponent } from '@/components/appAbout';

export default {
	name: 'AboutComponent',
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
			emailsContributing,
			emailsContributingTitle,
			emailsInquiry,
			emailsInquiryTitle
		} = useAppAboutComponent(props, context);

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
			emailsContributing,
			emailsContributingTitle,
			emailsInquiry,
			emailsInquiryTitle
		};
	}
};
</script>

<style scoped>
</style>
