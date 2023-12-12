import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

type SelectBoxProps = {
  id: string;
  label: string;
  value: string;
  handleChange: (event: SelectChangeEvent<string>) => void;
  selectOptions: { value: number; label: string }[];
};

const SelectBox: React.FC<SelectBoxProps> = ({
  id,
  label,
  value,
  handleChange,
  selectOptions,
}) => {
  return (
    <FormControl>
      <InputLabel id={`label-${id}`}>{label}</InputLabel>
      <Select
        labelId={`label-${id}`}
        id={id}
        value={value}
        label={label}
        onChange={handleChange}
        size="small"
      >
        {selectOptions.map((option, index) => (
          <MenuItem key={`option-${index}-${id}`} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SelectBox;
