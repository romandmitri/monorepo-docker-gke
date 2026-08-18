import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { GroupId } from "@/src/modules/group/type/GroupId.ts";
import { RoleSelect } from "@/src/modules/perm/components/RoleSelect.tsx";
import { RoleKey } from "@/src/modules/perm/role/RoleKey.ts";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	groupId: GroupId;
	isDisabled?: boolean;
	name: HookFieldName;
}

export const HookField_Select_Role = (p: Props) => {
	const methods = useFormContext();
	const roleKey = methods.watch(p.name) as RoleKey;

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<RoleSelect
				//
				isDisabled={p.isDisabled}
				groupId={p.groupId}
				roleKey={roleKey ?? null}
				onChange={(v) => methods.setValue(p.name, v, setValueConfig)}
			/>
		</HookField>
	);
};
