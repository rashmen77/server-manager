import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import AddServerRow from "./AddServer.jsx";

import { FaEdit, FaTrash } from "react-icons/fa";

const useStyles = makeStyles({
  table: {
    minWidth: 900
  }
});

const token = localStorage.token;

export default function ServerManager() {
  const classes = useStyles();
  const [servers, setServer] = useState(null);
  const [showAddServerModal, setShowModal] = useState(false);

  useEffect(() => {
    getServers();
  }, []);

  const handleServerAddHide = () => {
    setShowModal(false);
  };

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
      setServer(payload.data);
    }
  };

  const appendToServer = async serverDetail => {
    console.log("server details", serverDetail);
    if (token) {
      let response = await fetch("http://localhost:9000/createServer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          serverDetail
        })
      });
      let responseBody = await response.text();
      let payload = JSON.parse(responseBody);
      console.log("servers", payload);
      setServer(payload.data);
      handleServerAddHide();
    }
  };

  const deleteServer = async serverID => {
    if (token) {
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" colSpan={6}>
              <button
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Add Server
              </button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell align="right">Server Name</TableCell>
            <TableCell align="right">Instance ID</TableCell>
            <TableCell align="right">Public DNS</TableCell>
            <TableCell align="right">IPv4 public IP</TableCell>
            <TableCell align="right">Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servers &&
            servers.map(row => (
              <TableRow key={row._id}>
                <TableCell>
                  <FaEdit
                    onClick={() => {
                      console.log("HELLO");
                    }}
                  />
                  <FaTrash
                    onClick={() => {
                      deleteServer(row._id);
                    }}
                  />
                </TableCell>
                <TableCell align="right">{row.servername}</TableCell>
                <TableCell align="right">{row._id.substring(0, 15)}</TableCell>
                <TableCell align="right">{row.publicDNS}</TableCell>
                <TableCell align="right">{row.ipv4}</TableCell>
                <TableCell align="right">{row.country}</TableCell>
              </TableRow>
            ))}
          {showAddServerModal ? (
            <AddServerRow
              onHide={handleServerAddHide}
              addServer={appendToServer}
            />
          ) : (
            ""
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
