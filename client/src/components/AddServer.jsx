import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { FaWindowClose, FaCheckSquare } from "react-icons/fa";

const inputStyle = {
  width: "70px"
};

export default function AddServer({ onHide, serverFunc }) {
  const [servername, setServerName] = useState("");
  const [publicDNS, setPublicDNS] = useState("");
  const [ipv4, setIpv4] = useState("");
  const [country, setCountr] = useState("");

  const createServerDetail = () => {
    return { servername, publicDNS, ipv4, country };
  };

  return (
    <>
      <TableRow>
        <TableCell align="left">
          <FaWindowClose onClick={onHide} />
          <FaCheckSquare
            onClick={() => {
              serverFunc(createServerDetail());
            }}
          />
        </TableCell>
        <TableCell align="right">
          <input
            style={inputStyle}
            type="text"
            onChange={e => {
              setServerName(e.target.value);
            }}
          />
        </TableCell>
        <TableCell align="right">xxxxxxxxxxxxxxx</TableCell>
        <TableCell align="right">
          <input
            style={inputStyle}
            type="text"
            onChange={e => {
              setPublicDNS(e.target.value);
            }}
          />
        </TableCell>
        <TableCell align="right">
          <input
            style={inputStyle}
            type="text"
            onChange={e => {
              setIpv4(e.target.value);
            }}
          />
        </TableCell>
        <TableCell align="right">
          <input
            style={inputStyle}
            type="text"
            onChange={e => {
              setCountr(e.target.value);
            }}
          />
        </TableCell>
      </TableRow>
    </>
  );
}
