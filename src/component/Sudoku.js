import { Box, FormLabel, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

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
    
      function generateSudoku(initialFilledCells) {
        const board = Array(9).fill(null).map(() => Array(9).fill(0));
        fillBoard(board);
        removeNumbers(board, 81 - initialFilledCells);
        return board;
      }
    
      const [board, setBoard] = useState(generateSudoku(30)); 
      const isValidRow = (board) => {
        return board.every(row => {
          const nums = row.filter(num => num !== 0); 
          return nums.length === new Set(nums).size;
        });
      };
      
      const isValidCol = (board) => {
        for (let col = 0; col < 9; col++) {
          const nums = [];
          for (let row = 0; row < 9; row++) {
            if (board[row][col] !== 0) nums.push(board[row][col]);
          }
          if (nums.length !== new Set(nums).size) return false;
        }
        return true;
      };
    
      const isValidBlock = (board) => {
        for (let i = 0; i < 9; i += 3) {
          for (let j = 0; j < 9; j += 3) {
            const nums = [];
            for (let x = 0; x < 3; x++) {
              for (let y = 0; y < 3; y++) {
                if (board[i + x][j + y] !== 0) nums.push(board[i + x][j + y]);
              }
            }
            if (nums.length !== new Set(nums).size) return false;
          }
        }
        return true;
      };
      
      const isValidSudoku = (board) => {
        return isValidRow(board) && isValidCol(board) && isValidBlock(board);
      };
      const [color, setColor] = useState("balck")
        useEffect(() => {
          if (isValidSudoku(board)) {
            setColor("black");
          } else {
            setColor("red");
          }
        }, [board]);
      
      return (
        <Stack spacing={2} justifyContent={"center"} alignItems={"center"}>
          <FormLabel sx={{ color: color ==="black" ? "black": "red", fontWeight: "bold", fontSize: 20 }}>Sudoku</FormLabel>
          <Box>
            {board.map((row, rowIndex) => (
              <Box key={rowIndex} display="flex">
                {row.map((col, colIndex) => (
                  <TextField
                    key={colIndex}
                    sx={{
                        width: 50,
                        height: 50,
                        textAlign: "center",
                        borderRight: colIndex === 2 || colIndex === 5 ? "2px solid black" : "1px solid lightgrey",
                        borderBottom: rowIndex === 2 || rowIndex === 5 ? "2px solid black" : "1px solid lightgrey",
                        borderColor: color === "black" ? "black" : "red",
                      }}
                      
                    value={col === 0 ? "" : col} 
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
    
