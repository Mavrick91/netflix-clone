interface RadioButtonProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
}

const Radio: React.FC<RadioButtonProps> = ({
  name,
  value,
  checked,
  onChange,
  className,
  id,
}) => {
  return (
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className={className}
    />
  );
};

export default Radio;
