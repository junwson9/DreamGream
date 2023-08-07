/* eslint-disable */ // SelectSmall.js

import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const CustomSelect = ({ ...props }) => (
  <Select
    {...props}
    sx={{
      '&:focus': {
        borderColor: '#7887D4',
        backgroundColor: 'transparent',
      },
      fontFamily: 'Noto Sans KR, sans-serif',
    }}
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: 200,
        },
      },
    }}
  />
);

function SelectSmall({ onSelect, selectedValue }) {
  const years = Array.from({ length: 100 }, (_, idx) =>
    (new Date().getFullYear() - idx).toString(),
  );

  const [selectedYear, setSelectedYear] = useState(selectedValue || '');

  const handleChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    onSelect(selectedYear);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <FormControl sx={{ m: 1, minWidth: 320 }}>
        <CustomSelect
          value={selectedYear}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <span className="text-base text-gray-400">
              {/* {selectedValue} */}
              {selectedValue === '' ? '연도를 입력해주세요' : selectedValue}
            </span>
          </MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </CustomSelect>
      </FormControl>
    </div>
  );
}

export default SelectSmall;
