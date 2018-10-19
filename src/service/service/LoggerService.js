import TemplateLoggerSevice from './TemplateLoggerSevice';
class LoggerService
{
    constructor(){
        const uriLogger = "/logger";
        //this.uriLoggerFilter = `${uriLogger}/filter`;

        this.templateLogger = new TemplateLoggerSevice(uriLogger);
    }

    getAllLogs = () => this.templateLogger.getAll();

    //getLogsBy = (filter) => this.templateLogger.getBy(filter);

}
export default new LoggerService();


