import db from '../controllers/sqlConnect';

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
// ////////////////////////////////////////
// Retrieve all LOG DATA
// ///////////////////////////////////////
const currentLogData = async (): Promise<ILogData[]> => {
  try {
    const request = await db.request();

    const logData = await request.query(`
    SELECT TOP (1000) l.LogID, a.Application, l.TimeOccured AS LogTime, ll.LogLevel, e.ErrorMessage, 
    e.ErrorType, u.[User], m.Method AS [Function], r.Route, 
    r.Method AS RouteMethod
FROM            dbo.[Log] AS l INNER JOIN
                         dbo.Application AS a ON l.ApplicationID = a.ApplicationID INNER JOIN
                         dbo.LogLevel AS ll ON l.LogLevelID = ll.LogLevelID LEFT OUTER JOIN
                         dbo.Error AS e ON l.ErrorID = e.ErrorID LEFT OUTER JOIN
                         dbo.[User] AS u ON l.UserID = u.UserID LEFT OUTER JOIN
                         dbo.Method AS m ON l.MethodID = m.MethodID LEFT OUTER JOIN
                         dbo.Route AS r ON l.RouteID = r.RouteID
ORDER BY l.LogID DESC, logTime DESC`);

    return logData.recordset;
  } catch (error) {
    throw error;
  }
};

export default currentLogData;
