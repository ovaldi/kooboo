define(function () {
    "use strict";
    
    var ap = Array.prototype, splice = ap.splice, slice = ap.slice;

    var _EventMixin = {
        on: function (evName, fn, scope) {
            var self = this, _events = this._events || (this._events = {}), listeners = _events[evName] || (_events[evName] = []);
            listeners.push(fn);

            return {
                remove: function () {
                    _EventMixin.off.call(scope||self, evName, fn);
                }
            };
        },
        emit: function (evName, extraParameters) {
            var _events = this._events,listeners,len,fn, args;
            if(_events && (listeners = _events[evName])){
                listeners = _events[evName];
                len = listeners.length;
                if (len) {
                    args = slice.call(arguments, 1);
                    while (fn = listeners[--len]) {
                        fn.apply(this, args);
                    }
                }
            }
        },
        off: function (evName, fn) {
            var _events = this._events, listeners,len,item;
            if(_events && (listeners = _events[evName])){
                len = listeners.length;
                if(fn) {
                    while (len && len--) {
                        item = listeners[len];
                        if (item === fn) {
                            splice.call(listeners, len, 1);
                        }
                    }
                }else{
                    delete _events[evName];
                }
            }
        }
    };

    return _EventMixin;
});
