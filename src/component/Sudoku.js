import { Box, FormLabel, Stack, TextField, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useState } from "react";

const Sudoku = () => {
  const TableauInit = [
    [null, null, null, null, null, 6, 4, null, null],
    [3, 5, null, 9, null, null, null, null, null],
    [null, null, null, null, 1, null, 9, null, 5],
    [null, null, 9, null, null, null, null, null, null],
    [null, 3, 7, null, 6, null, 1, 9, null],
    [8, 6, null, null, null, null, null, null, null],
    [null, 4, null, 7, 2, null, null, null, null],
    [null, 8, 1, 6, 5, null, null, null, 3],
    [null, null, null, null, null, null, null, null, 6]
  ];

  const [temp, setTemp] = useState(TableauInit);
  const [color, setColor] = useState("black");

  const addNumberAtPosition = (i, j, value) => {
    if (temp[i].includes(value)) {
      setColor("red");
      return;
    }
    
    for (let row = 0; row < temp.length; row++) {
      if (temp[row][j] === value) {
        setColor("red");
        return;
      }
    }

    const startRow =Math.floor(i / 3) * 3;
    const startCol = Math.floor(j / 3) * 3;
    console.log(startRow, startCol);
    for (let row = startRow; row < startRow + 3; row++) {
      for (let col = startCol; col < startCol + 3; col++) {
        if (temp[row][col] === value) {
          setColor("red");
          return;
        }
      }
    }
    setColor("black");
    const updatedTab = temp.map((row, rowIndex) =>
      row.map((col, colIndex) =>
        rowIndex === i && colIndex === j ? value : col
      )
    );
    setTemp(updatedTab);
  };


  return (
    <Stack spacing={2} justifyContent={"center"} alignItems={"center"}>
      <FormLabel
        sx={{
          color: color,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Sudoku
      </FormLabel>
      <Box>
        {temp.map((row, rowIndex) => (
          <Box key={rowIndex} display="flex">
            {row.map((col, colIndex) => (
              <TextField
                key={colIndex}
                sx={{
                  width: 50,
                  height: 50,
                  textAlign: "center",
                  borderRight: colIndex === 2 || colIndex === 5 ? "2px solid black" : "",
                  borderBottom: rowIndex === 2 || rowIndex === 5 ? "2px solid black" : "",
                  borderColor: color,
                }}
                value={col || ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || null;
                  addNumberAtPosition(rowIndex, colIndex, value);
                }}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center" },
                }}
              />
            ))}
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default Sudoku;
