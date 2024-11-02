import { Box, FormLabel, Stack, TextField,Button, } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import {  useState } from "react";

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
  const TableauMoyen = [
    [null, null, null, null, null, 6, 4, null, null],
    [3, 5, null, 9, null, null, null, 2, null],
    [null, null, null, 5, 1, null, 9, null, 5],
    [null, null, 9, null, 4, null, null, null, null],
    [null, 3, 7, null, 6, null, 1, 9, null],
    [8, 6, null, null, null, null, null, null, null],
    [null, 4, null, 7, 2, null, null, 6, null],
    [null, 8, 1, 6, 5, null, null, null, 3],
    [null, null, null, null, 9, null, null, null, 6]
  ];
  const TableauFacile = [
    [null, null, null, null, null, 6, 4, null, null],
    [3, 5, null, 9, 7, null, null, 2, null],
    [null, null, null, 5, 1, 3, 9, null, 5],
    [null, null, 9, null, 4, 8, null, null, null],
    [null, 3, 7, null, 6, null, 1, 9, null],
    [8, 6, null, null, null, 2, null, null, null],
    [null, 4, null, 7, 2, null, null, 6, null],
    [null, 8, 1, 6, 5, null, 2, null, 3],
    [null, null, null, null, 9, null, null, null, 6]
  ];
    
  const [temp, setTemp] = useState(TableauFacile);
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const NiveauFacile = () =>{
    setTemp(TableauFacile);
    setActive1(true);
    setActive2(false);
    setActive3(false);
  }
  const NiveauMoyen = () =>{
    setTemp(TableauMoyen);
    setActive1(false);
    setActive2(true);
    setActive3(false);
  }
  const NiveauDifficile = () =>{
    setTemp(TableauInit);
    setActive1(false);
    setActive2(false);
    setActive3(true)
  }
 
  const [color, setColor] = useState("black");
  const [tempHistory, setTempHistory] = useState([]);
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
    setTempHistory((prev) => [...prev, temp]);
 // Résultat du jeu
  let cases = true;

  for (let row = 0; row < updatedTab.length; row++) {
    for (let col = 0; col < updatedTab[row].length; col++) {
      if (updatedTab[row][col] === null) {
        cases = false;
        break;
      }
    }
    if (!cases) break;
  }
  if (cases) {
    return alert("Le jeu est terminé et vous avez gagné !");
  } 
  };
  
  const retour = () => {
    setTemp(tempHistory.pop());
  };


  return (
    <Stack spacing={2} justifyContent={"center"} alignItems={"center"}>
      <Stack direction={"row"} gap={2} justifyContent={"space-between"} alignItems={"center"}>
        <Button variant="contained" onClick={retour} sx={{backgroundColor: "GrayText"}} startIcon={<ArrowBack />}>Retour</Button>
        <FormLabel
          sx={{
            color: color,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Sudoku
        </FormLabel>
      </Stack>
      <Stack direction={"row"} gap={2}>
       <Stack direction={"column"} gap={2}>
          <FormLabel>Niveau : </FormLabel>
          <Button variant="contained" onClick={NiveauFacile} sx={{backgroundColor: active1 ? "GrayText" : ""}}>Facile</Button>
          <Button variant="contained" onClick={NiveauMoyen} sx={{backgroundColor: active2 ? "GrayText" : ""}}>Moyen</Button>
          <Button variant="contained" onClick={NiveauDifficile} sx={{backgroundColor: active3 ? "GrayText" : ""}}>Difficile</Button>
        </Stack>
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
                  const value = e.target.value === "" ? null : parseInt(e.target.value);
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
    </Stack>
  );
};

export default Sudoku;
