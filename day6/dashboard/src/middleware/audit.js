const auditMiddleware = (storeAPI) => (next) => (action) => {
    if(action.type.startsWith('audits/')){
        return next(action);
    }
    const log = {
        actionType: action.type,
        timestamp: Date.now(),
    }
    next(action);
    storeAPI.dispatch({type:'audits/addAuditEntry',payload:log}); //audit specific action

}

export default auditMiddleware;