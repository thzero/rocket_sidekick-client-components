export const useDetailFormDialogProps = {
	debug: {
		type: Boolean,
		value: false
	},
	preCompleteOk: {
		type: Function,
		value: null
	},
	readonly: {
		type: Boolean,
		value: false
	},
	signal: {
		type: Boolean,
		default: false
	},
	value: {
		type: Object,
		value: null
	}
};
