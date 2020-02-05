import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';

import AddServerRow from './AddServer.jsx';

import { FaEdit, FaTrash } from 'react-icons/fa';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function UnconnectedServerManager({ lgin }) {
  const alert = useAlert();
  const classes = useStyles();
  const [servers, setServer] = useState(null);
  const [showAddServer, setShowAdd] = useState(false);
  const [showUpdateServer, setShowUpdate] = useState(false);
  const [updateID, setUpdateID] = useState('');

  useEffect(() => {
    getServers();
  }, []);

  const handleServerAddHide = () => {
    setShowAdd(false);
  };

  const handleServerUpdateHide = () => {
    setShowUpdate(false);
  };
  //get servers and setState
  const getServers = async () => {
    const token = localStorage.token;
    if (token) {
      let response = await fetch(
        'http://localhost:9000/getAllServer',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      let responseBody = await response.text();
      let payload = JSON.parse(responseBody);
      setServer(payload.data);
    } else {
      alert.show('Session expired'); //no token
    }
  };

  //add server to DB and setState
  const appendToServer = async serverDetail => {
    const token = localStorage.token;
    if (token) {
      let response = await fetch(
        'http://localhost:9000/createServer',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            serverDetail
          })
        }
      );
      let responseBody = await response.text();
      let payload = JSON.parse(responseBody);
      setServer(payload.data);
      handleServerAddHide();
    } else {
      alert.show('Session expired');
    }
  };

  //delete server from DB and setState
  const deleteServer = async serverID => {
    const token = localStorage.token;
    if (token) {
      let response = await fetch(
        `http://localhost:9000/deleteServer/${serverID}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      let responseBody = await response.text();
      let payload = JSON.parse(responseBody);
      setServer(payload.data);
    } else {
      alert.show('Session expired');
    }
  };

  //update Server with ID and setState
  const updateServer = async serverDetail => {
    const token = localStorage.token;

    if (token) {
      let response = await fetch(
        `http://localhost:9000/updateServer/${updateID}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            serverDetail
          })
        }
      );

      let responseBody = await response.text();
      let payload = JSON.parse(responseBody);
      setServer(payload.data);
      handleServerUpdateHide();
    } else {
      alert.show('Session expired');
    }
  };

  return (
    <>
      {lgin ? (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-label='simple table'
          >
            <TableHead>
              <TableRow>
                <TableCell align='left' colSpan={3}>
                  <h1>Server Manager</h1>
                </TableCell>
                <TableCell align='right' colSpan={3}>
                  <button
                    className='server-manager-button'
                    onClick={() => {
                      setShowAdd(true);
                    }}
                  >
                    <h3>Add Server</h3>
                  </button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell>Actions</TableCell>
                <TableCell align='right'>
                  Server Name
                </TableCell>
                <TableCell align='right'>
                  Instance ID
                </TableCell>
                <TableCell align='right'>
                  Public DNS
                </TableCell>
                <TableCell align='right'>
                  IPv4 public IP
                </TableCell>
                <TableCell align='right'>Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {servers &&
                !showUpdateServer &&
                servers.map(row => (
                  <>
                    <TableRow key={row._id}>
                      <TableCell>
                        <FaEdit
                          className='fa-icons'
                          onClick={() => {
                            setUpdateID(row._id);
                            setShowUpdate(true);
                          }}
                        />
                        <FaTrash
                          className='fa-icons'
                          onClick={() => {
                            deleteServer(row._id);
                          }}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        {row.servername}
                      </TableCell>
                      <TableCell align='right'>
                        {row._id.substring(0, 15)}
                      </TableCell>
                      <TableCell align='right'>
                        {row.publicDNS}
                      </TableCell>
                      <TableCell align='right'>
                        {row.ipv4}
                      </TableCell>
                      <TableCell align='right'>
                        {row.country}
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              {showUpdateServer ? (
                <AddServerRow
                  onHide={handleServerUpdateHide}
                  serverFunc={updateServer}
                />
              ) : (
                ''
              )}

              {showAddServer ? (
                <AddServerRow
                  onHide={handleServerAddHide}
                  serverFunc={appendToServer}
                />
              ) : (
                ''
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <div>
            <h1>Not ALLOWED</h1>
            <Link to='/'>Sign in</Link>
          </div>
        </>
      )}
    </>
  );
}
let mapStateToProps = state => {
  return { lgin: state.loggedIn };
};
let ServerManager = connect(mapStateToProps)(
  UnconnectedServerManager
);

export default ServerManager;
