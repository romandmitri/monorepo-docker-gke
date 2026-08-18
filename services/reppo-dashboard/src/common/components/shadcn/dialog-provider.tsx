import {createContext, ReactNode, useContext, useState} from "react";

export type DialogId = string;

interface DialogContextInterface {
	isOpen: (id: DialogId) => boolean;
	onOpen: (id: DialogId) => OnOpenFunction;
	openIds: Set<DialogId>;
	open: (id: DialogId) => void;
	close: (id: DialogId) => void;
}

interface OnOpenFunction {
	(isOpen: boolean): void,
}

export const DialogContext = createContext<DialogContextInterface | undefined>(undefined)

// export const DialogContext = createContext<DialogContextInterface>({
// 	isOpen: () => false,
// 	onOpen: () => () => undefined,
// 	openIds: new Set<DialogId>(),
// 	open: () => undefined,
// 	close: () => undefined,
// })

interface Props {
	children: ReactNode;
}

export const DialogProvider = (p: Props) => {
	const [openIds, setOpenIds] = useState<Set<DialogId>>(new Set<DialogId>());

	const handleOpen = (id: DialogId) => {
		setOpenIds(ids => {
			const set = new Set(ids);
			set.add(id);
			return set;
		});
	}

	const handleClose = (id: DialogId) => {
		setOpenIds(ids => {
			const set = new Set(ids)
			set.delete(id);
			return set;
		})
	}

	const context: DialogContextInterface = {
		isOpen: (id: DialogId) => openIds.has(id),
		onOpen: (id: DialogId) => (isOpen: boolean) => {
			if (!isOpen) handleClose(id);
		},
		openIds: openIds,
		open: handleOpen,
		close: handleClose,
	}

	return <DialogContext.Provider value={context}>{p.children}</DialogContext.Provider>
}

export const useDialogProvider = (): DialogContextInterface => {
	const ctx = useContext(DialogContext)
	if (!ctx) throw new Error("useDialogProvider() is NOT in <DialogProvider />");
	return ctx;
};
