import { ReactNode } from "react";

type VisibleComponentProps = {
	visible: boolean;
	children: ReactNode;
};

export const VisibleComponet = ({ visible, children }: VisibleComponentProps) => {
	return visible ? <>{children}</> : <></>;
};
