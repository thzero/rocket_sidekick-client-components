export const useChecklistStepsComponentProps = {
	item: {
		type: Object,
		default: { }
	},
	readonly: {
		type: Boolean,
		default: false
	},
	update: {
		type: Function,
		default: null
	}
};
