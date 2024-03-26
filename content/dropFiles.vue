<template>
	<div class="main">
		<div
			class="dropzone-container"
			@dragover="dragover"
			@dragleave="dragleave"
			@drop="drop"
		>
			<input
				id="fileInput"
				name="fileInput"
				ref="fileInput"
				type="file"
				accept=".csv"
				multiple
				@change="onChange"
				class="hidden-input"
			/>

			<label for="fileInput" class="file-label">
				<div v-if="isDragging">{{ $t('strings.content.drop.files1') }}</div>
				<div v-else>{{ $t('strings.content.drop.files2') }} <u>{{ $t('strings.content.drop.click') }}</u> {{ $t('strings.content.drop.files3') }}</div>
			</label>

			<div class="preview-container mt-4" v-if="files.length">
				<div v-for="file in files" :key="file.name" class="preview-card">
					<div>
						<img class="preview-img" :src="generateThumbnail(file)" />
						<p :title="file.name">
							{{ generateName(file.name) }}
						</p>
					</div>
					<div>
						<button
							class="ml-2"
							type="button"
							@click="remove(files.indexOf(file))"
							title="Remove file"
						>
							<b>&times;</b>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';

export default {
	name: 'DropFile',
	setup(props, context) {
		const fileInput = ref(null);
		const files = ref([]);
		const isDragging = ref(false);
		const showMessage = ref(false);
		const output = ref(null);

		const dragover = async (e) => {
			e.preventDefault();
			isDragging.value = true;
		};
		const dragleave = async () => {
			isDragging.value = false;
		};
		const drop = (e) => {
			e.preventDefault();
			fileInput.value.files = e.dataTransfer.files;
			onChange();
			isDragging.value = false;
		};
		const generateName = (name) => {
			return (
				name.split('.')[0].substring(0, 3) +
				'...' +
				name.split('.')[name.split('.').length - 1]
			);
		};
		const generateThumbnail = (file) => {
			let fileSrc = URL.createObjectURL(file);
			setTimeout(() => {
				URL.revokeObjectURL(fileSrc);
			}, 1000);
			return fileSrc;
		};
		const onChange = async () => {
			let incomingFiles = Array.from(fileInput.value.files);
			const fileExist = files.value.some((r) =>
				incomingFiles.some( (file) => file.name === r.name && file.size === r.size)
			);
			if (fileExist) {
                showMessage.value = true;
                alert('New upload contains files that already exist');
                return;
			}
			
			files.value.push(...incomingFiles);
		};
		const remove = (index) => {
			files.value.splice(index, 1);
		};

		return {
			fileInput,
			files,
			isDragging,
			showMessage,
            dragleave,
            dragover,
            drop,
            generateName,
            generateThumbnail,
            onChange,
            remove
		}
	},
	validations () {
		return useFlightPathValidation;
	}
};
</script>

<style>
	.dropzone-container {
		padding: 4rem;
		background: rgb(98, 98, 98);
		border: 1px solid #e2e8f0;
	}
	.hidden-input {
		opacity: 0;
		overflow: hidden;
		position: absolute;
		width: 1px;
		height: 1px;
	}
	.file-label {
		font-size: 20px;
		display: block;
		cursor: pointer;
	}
	.preview-container {
		display: flex;
		margin-top: 2rem;
	}
	.preview-card {
		display: flex;
		border: 1px solid #a2a2a2;
		padding: 5px;
		margin-left: 5px;
	}
	.preview-img {
		width: 50px;
		height: 50px;
		border-radius: 5px;
		border: 1px solid #a2a2a2;
		background-color: #a2a2a2;
	}
</style>