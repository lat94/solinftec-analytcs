import HttpService from '../http/HttpService';

class TemplateLoggerSevice {
    constructor(uri) {
        this.uri = uri;
        this.storageKey = 'stg-' + uri.replace('/', '');
        //this.filter = filter;
    }   

    getLoggerUrl() {
        return HttpService.getLoggerUrl();
    }

    getFilterSuffix() {
        return HttpService.getFilterSuffix();
    }

    getAll() {
        return HttpService.make(this.getLoggerUrl()).get(this.uri);
    }

    postByOwner(filter) {
        return HttpService.make(this.getLoggerUrl())
                          .post("/logger/filter", {"owner": filter});
    }

    save(data) {
        return HttpService.make().post(this.uri, data);
    }


    post(uri, data) {
        return HttpService.make().post(this.uri + uri, data);
    }

    update(data) {
        return HttpService.make().put(this.uri, data);
    }

    delete(id) {
        return HttpService.make().deleteOne(this.uri + '/' + id);
    }
}
export default TemplateLoggerSevice;