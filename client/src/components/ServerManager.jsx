import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { FaEdit, FaTrash } from "react-icons/fa";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const token = localStorage.token;

export default function ServerManager() {
  const classes = useStyles();
  const [servers, setServer] = useState(null);

  useEffect(() => {
    getServers();
  }, []);

  const getServers = async () => {
    console.log("token", token);
    if (token) {
      let response = await fetch("http://localhost:9000/getAllServer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      let responseBody = await response.text();
      let payload = JSON.parse(responseBody);
      console.log("servers", payload);
      // setServer(payload.data);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" colSpan={6}>
              <button>Add Server</button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell>Server Name</TableCell>
            <TableCell align="right">Instance ID</TableCell>
            <TableCell align="right">Public DNS</TableCell>
            <TableCell align="right">IPv4 public IP</TableCell>
            <TableCell align="right">Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servers &&
            servers.map(row => (
              <TableRow key={row.name}>
                <TableCell>
                  <FaEdit
                    onClick={() => {
                      console.log("HELLO");
                    }}
                  />
                  <FaTrash />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
