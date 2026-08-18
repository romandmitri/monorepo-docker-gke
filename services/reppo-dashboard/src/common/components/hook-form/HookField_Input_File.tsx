import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { LinkExternal } from "@/src/common/components/link/LinkExternal.tsx";
import { Button } from "@/src/common/components/shadcn/button.tsx";
import { Input } from "@/src/common/components/shadcn/input.tsx";
import { Item, ItemActions, ItemContent } from "@/src/common/components/shadcn/item.tsx";
import { ThemeIcon } from "@/src/common/style/ThemeIcon.tsx";
import { consoleCatch, consoleLog } from "@/src/common/utility/log/Log.ts";
import { FileReferenceBadge } from "@/src/modules/file/components/FileReferenceBadge.tsx";
import { useFileUpload } from "@/src/modules/file/logic/useFileUpload.tsx";
import { FileReference, FileReferenceResponse } from "@/src/modules/file/type/FileReference.ts";
import { FileSchema } from "@/src/modules/file/type/FileSchema.ts";
import { LucideDownload } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isAutofocus?: boolean;
	isDisabled?: boolean;
	name: HookFieldName;
	placeholder?: string;
	schema: FileSchema;
}

export const HookField_Input_File = (p: Props) => {
	const methods = useFormContext();
	const upload = useFileUpload({});

	const file = methods.watch(p.name);
	consoleLog("HookField_Input_File", file);

	const isFileReference = file instanceof FileReference;

	const setFile = (file?: File | FileReferenceResponse) => {
		methods.setValue(p.name, file, setValueConfig);
	};

	const handleFile = async (file?: File) => {
		if (!(file instanceof File)) return;
		const fileReference = await upload.upload(file);
		consoleLog("HookField_Input_File.handleFile.fileReference", fileReference);
		setFile(fileReference);
	};

	useEffect(() => {
		handleFile(file).catch(consoleCatch);
	}, [file]);

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<div className={""}>
				{!isFileReference && (
					<Input
						//
						accept={p.schema.mimeTypes?.join(",")}
						autoFocus={p.isAutofocus}
						className={"cursor-pointer"}
						disabled={p.isDisabled || upload.isUploading || isFileReference}
						id={p.name}
						onChange={async (v) => {
							const file = v.target.files?.[0] as File | undefined;
							setFile(file);
						}}
						multiple={false}
						placeholder={p.placeholder}
						type={"file"}
					/>
				)}
				{isFileReference && (
					<Item variant={"outline"} className={"flex-1"}>
						<ItemContent>
							<FileReferenceBadge file={file} className={""} />
						</ItemContent>
						<ItemActions>
							<LinkExternal href={file.url} tooltip={"Download"}>
								<LucideDownload />
							</LinkExternal>
							<Button disabled={p.isDisabled} onClick={() => setFile()} variant={"ghost"}>
								<ThemeIcon.Common_Delete />
							</Button>
						</ItemActions>
					</Item>
				)}
			</div>
		</HookField>
	);
};
