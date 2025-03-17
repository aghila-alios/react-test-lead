import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

type NumberInputProps = {
	id: string;
	name: string;
	label: string;
	value: number | null;
	className?: string;
	placeholder?: string;
	step?: string | number;
	defaultValue?: number;
	required?: boolean;
	disabled?: boolean;
	groupText?: string;
	groupTextBefore?: boolean;
	onChange: (value: number) => void;
	validate?: (value: any) => string | undefined;
	error?: string | undefined;
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
	validate,
	error,
}) => {
	const [fieldError, setFieldError] = useState<string | undefined>(error);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		validate && setFieldError(validate(Number(value)));
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
					value={value !== null ? value : ""}
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
			<div style={{ color: "red" }}>{error}</div>
		</>
	);
};

export default NumberInput;
