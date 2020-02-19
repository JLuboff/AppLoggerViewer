import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Paper,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody
} from '@material-ui/core';

type TLogLevels = 'Info' | 'Warning' | 'Error';
interface ILogData {
  LogID: number;
  Application: string;
  LogLevel: TLogLevels;
  ErrorMessage: string;
  ErrorType: string;
  User: string;
  Function: string;
  Route: string;
  RouteMethod: string;
  LogTime: string;
}
const ViewTable = () => {
  const [logData, setLogData] = useState<ILogData[]>([]);

  useEffect(() => {
    async function getLogData() {
      const logDataResponse = await fetch('http://localhost:3010/logMessages', {
        method: 'GET'
      });
      const returnedData = await logDataResponse;
      const { logMessages } = await returnedData.json();
      console.log(logMessages);
      setLogData([...logMessages]);
    }

    getLogData()
    setInterval(() => getLogData(), 30000);
  }, []);

  return logData.length ? (
    <Paper style={{ overflow: 'auto', height: '1000px' }}>
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow color="primary">
            {Object.keys(logData[0]).map(header => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {logData.map((log, index) => (
            <TableRow key={`log-${index}`} hover={true}>
              <TableCell>{log.LogID}</TableCell>
              <TableCell>{log.Application}</TableCell>
              <TableCell>{moment.utc(log.LogTime).format('MM-DD-YYYY hh:mm:ss A')}</TableCell>
              <TableCell>{log.LogLevel}</TableCell>
              <TableCell>{log.ErrorMessage}</TableCell>
              <TableCell>{log.ErrorType}</TableCell>
              <TableCell>{log.User}</TableCell>
              <TableCell>{log.Function}</TableCell>
              <TableCell>{log.Route}</TableCell>
              <TableCell>{log.RouteMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  ) : null;
};

export default ViewTable;
