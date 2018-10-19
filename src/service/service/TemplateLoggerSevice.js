import HttpService from '../http/HttpService';

class TemplateLoggerSevice {
    constructor(uri) {
        this.uri = uri;
        this.storageKey = 'stg-' + uri.replace('/', '');
    }   

    getLoggerUrl() {
        return HttpService.getLoggerUrl();
    }

    getAll() {
        return HttpService.make(this.getLoggerUrl()).get(this.uri);
    }


    /*getBy(filter) {
        return HttpService.make().post(this.uri, data);
    }*/

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