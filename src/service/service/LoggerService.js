import TemplateLoggerSevice from './TemplateLoggerSevice';
class LoggerService
{
    constructor(){
        const uriLogger = "/logger";
        const uriLoggerFilter = `${uriLogger}/filter`;
        const filter = null;

        this.templateLogger = new TemplateLoggerSevice(uriLogger);
    }

    getAllLogs = () => this.templateLogger.getAll();
    getLogsBy = (filter) => this.templateLogger.postByOwner(filter);
    getLogsUserByProcess = (filter) => this.templateLogger.postUserByProcess(filter);


}
export default new LoggerService();


