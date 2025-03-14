import React from "react";
import { Form, InputGroup } from "react-bootstrap";

type NumberInputProps = {
	id: string;
	name: string;
	label: string;
	value: number | undefined;
	className?: string;
	placeholder?: string;
	step?: string | number;
	defaultValue?: number;
	required?: boolean;
	disabled?: boolean;
	groupText?: string;
	groupTextBefore?: boolean;
	onChange: (value: number) => void;
};
const NumberInput: React.FC<NumberInputProps> = ({
	id,
	name,
	label,
	value,
	className = "no-spinner",
	onChange,
	placeholder,
	step = "any",
	defaultValue,
	required = true,
	disabled = false,
	groupText,
	groupTextBefore,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		onChange(Number(value));
	};

	return (
		<>
			<Form.Label htmlFor={name}>{label}</Form.Label>
			<InputGroup className="mb-3">
				{!!groupText && groupTextBefore && (
					<InputGroup.Text>{groupText}</InputGroup.Text>
				)}
				<Form.Control
					id={id}
					name={name}
					type="number"
					value={value}
					onChange={handleChange}
					className={className}
					step={step}
					required={required}
					disabled={disabled}
					placeholder={placeholder}
					defaultValue={defaultValue}
					aria-label={label}
					aria-required={required}
					aria-disabled={disabled}
				/>
				{!!groupText && !groupTextBefore && (
					<InputGroup.Text>{groupText}</InputGroup.Text>
				)}
			</InputGroup>
		</>
	);
};

export default NumberInput;
