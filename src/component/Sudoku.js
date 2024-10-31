import { Box, FormLabel, Stack, TextField } from "@mui/material";
import { useState } from "react";

const Sudoku = () => {
      function isValid(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
          if (board[row][i] === num || board[i][col] === num) {
            return false;
          }
        }
    
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
              return false;
            }
          }
        }
    
        return true;
      }
    
      // Fonction récursive pour remplir la grille de manière aléatoire
      function fillBoard(board) {
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
              const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
    
              for (let num of numbers) {
                if (isValid(board, row, col, num)) {
                  board[row][col] = num;
    
                  if (fillBoard(board)) {
                    return true;
                  }
    
                  board[row][col] = 0;
                }
              }
              return false;
            }
          }
        }
        return true;
      }
    
      // Fonction pour retirer aléatoirement des valeurs de la grille
      function removeNumbers(board, numEmptyCells) {
        let count = numEmptyCells;
        while (count > 0) {
          const row = Math.floor(Math.random() * 9);
          const col = Math.floor(Math.random() * 9);
    
          if (board[row][col] !== 0) {
            board[row][col] = 0;
            count--;
          }
        }
      }
    
      // Fonction pour générer une grille de Sudoku avec un remplissage initial
      function generateSudoku(initialFilledCells) {
        const board = Array(9).fill(null).map(() => Array(9).fill(0));
        fillBoard(board);
        removeNumbers(board, 81 - initialFilledCells);
        return board;
      }
    
      const [board, setBoard] = useState(generateSudoku(30)); 
    
      return (
        <Stack spacing={2} justifyContent={"center"} alignItems={"center"}>
          <FormLabel sx={{ color: "black", fontWeight: "bold", fontSize: 20 }}>Sudoku</FormLabel>
          <Box>
            {board.map((row, rowIndex) => (
              <Box key={rowIndex} display="flex">
                {row.map((col, colIndex) => (
                  <TextField
                    key={colIndex}
                    sx={{ width: 50, height: 50, border: "1px solid black", textAlign: "center" }}
                    value={col === 0 ? "" : col} // Affiche une case vide si la valeur est 0
                    onChange={(e) => {
                      const value = Number(e.target.value) || 0;
                      const newBoard = board.map((r, i) =>
                        r.map((c, j) => (i === rowIndex && j === colIndex ? value : c))
                      );
                      setBoard(newBoard);
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
    
