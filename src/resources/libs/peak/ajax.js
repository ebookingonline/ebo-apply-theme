/*globals peak, $*/
peak.provide('peak.ajax');

/**
 * @author Evan Winslow
 * Provides a bunch of useful shortcut functions for making ajax calls
 */

/**
 * Wrapper function for jQuery.ajax which ensures that the url being called
 * is relative to the peak site root.
 *
 * You would most likely use peak.get or peak.post, rather than this function
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options Optional. {@link jQuery#ajax}
 * @return {jqXHR}
 */
peak.ajax = function (url, options) {
    options = peak.ajax.handleOptions(url, options);

    options.url = peak.normalize_url(options.url);

    //Always display system messages after actions
    var custom_complete = options.complete || peak.nullFunction;
    options.complete = function (json, two, three, four) {
        var responseText = {};
        try {
            responseText = $.parseJSON(json.responseText)
        } catch (err) {
        }

        if (responseText && responseText.messages) {
            peak.register_error(responseText.messages.error);
            peak.system_message(responseText.messages.success);
            peak.register_info(responseText.messages.info);
            peak.register_warning(responseText.messages.warning);
        }

        custom_complete(json, two, three, four);
    };

    return $.ajax(options);
};
/**
 * @const
 */
peak.ajax.SUCCESS = 0;

/**
 * @const
 */
peak.ajax.ERROR = -1;


/**
 * Handle optional arguments and return the resulting options object
 *
 * @param url
 * @param options
 * @return {Object}
 * @private
 */
peak.ajax.handleOptions = function (url, options) {
    var data_only = true,
        data,
        member;

    //peak.ajax('example/file.php', {...});
    if (peak.isString(url)) {
        options = options || {};

        //peak.ajax({...});
    } else {
        options = url || {};
        url = options.url;
    }

    //peak.ajax('example/file.php', function() {...});
    if (peak.isFunction(options)) {
        data_only = false;
        options = {success: options};
    }

    //peak.ajax('example/file.php', {data:{...}});
    if (options.data) {
        data_only = false;
    } else {
        for (member in options) {
            //peak.ajax('example/file.php', {callback:function(){...}});
            if (peak.isFunction(options[member])) {
                data_only = false;
            }
        }
    }

    //peak.ajax('example/file.php', {notdata:notfunc});
    if (data_only) {
        data = options;
        options = {data: data};
    }

    if (!peak.isFunction(options.error)) {
        // add a generic error handler
        options.error = peak.ajax.handleAjaxError;
    }

    if (url) {
        options.url = url;
    }

    var headers = {
        'X-CSRF-TOKEN': peak.config.token || $('meta[name="csrf-token"]').attr('content')
    };

    options.headers = headers;

    return options;
};

/**
 * Handles low level errors like 404
 *
 * @param xhr
 * @param status
 * @param error
 * @private
 */
peak.ajax.handleAjaxError = function (xhr, status, error) {
    if (!xhr.getAllResponseHeaders()) {
        // user aborts (like refresh or navigate) do not have headers
        return;
    }

    peak.register_error('ajax:error');
};

/**
 * Wrapper function for peak.ajax which forces the request type to 'get.'
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
peak.get = function (url, options) {
    options = peak.ajax.handleOptions(url, options);

    options.type = 'get';
    return peak.ajax(options);
};

/**
 * Wrapper function for peak.get which forces the dataType to 'json.'
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
peak.getJSON = function (url, options) {
    options = peak.ajax.handleOptions(url, options);

    options.dataType = 'json';
    return peak.get(options);
};

/**
 * Wrapper function for peak.ajax which forces the request type to 'post.'
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
peak.post = function (url, options) {
    options = peak.ajax.handleOptions(url, options);

    options.type = 'post';
    return peak.ajax(options);
};

/**
 * Perform an action via ajax
 *
 * @example Usage 1:
 * At its simplest, only the action name is required (and anything more than the
 * action name will be invalid).
 * <pre>
 * peak.action('name/of/action');
 * </pre>
 *
 * The action can be relative to the current site ('name/of/action') or
 * the full URL of the action ('http://peak.org/action/name/of/action').
 *
 * @example Usage 2:
 * If you want to pass some data along with it, use the second parameter
 * <pre>
 * peak.action('friend/add', { friend: some_guid });
 * </pre>
 *
 * @example Usage 3:
 * Of course, you will have no control over what happens when the request
 * completes if you do it like that, so there's also the most verbose method
 * <pre>
 * peak.action('friend/add', {
 *     data: {
 *         friend: some_guid
 *     },
 *     success: function(json) {
 *         //do something
 *     },
 * }
 * </pre>
 * You can pass any of your favorite $.ajax arguments into this second parameter.
 *
 * @note If you intend to use the second field in the "verbose" way, you must
 * specify a callback method or the data parameter.  If you do not, peak.action
 * will think you mean to send the second parameter as data.
 *
 * @note You do not have to add security tokens to this request.  peak does that
 * for you automatically.
 *
 * @see jQuery.ajax
 *
 * @param {String} action The action to call.
 * @param {Object} options
 * @return {jqXHR}
 */
peak.action = function (action, options) {
    peak.assertTypeOf('string', action);

    if (action.indexOf('ajax/action/') < 0) {
        action = 'ajax/action/' + action;
    }
    options = peak.ajax.handleOptions(action, options);
    options.dataType = 'json';

    return peak.post(options);
};

/**
 * ajax view
 * @param view
 * @param options
 * @returns {jqXHR}
 */
peak.view = function (view, options) {
    peak.assertTypeOf('string', view);

    if (view.indexOf('ajax/view/') < 0)
        view = 'ajax/view/' + view;

    options = peak.ajax.handleOptions(view, options);
    options.dataType = 'html';

    return peak.get(options);
};

/**
 * Make an API call
 *
 * @example Usage:
 * <pre>
 * peak.api('system.api.list', {
 *     success: function(data) {
 *         console.log(data);
 *     }
 * });
 * </pre>
 *
 * @param {String} method The API method to be called
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
peak.api = function (method, options) {
    peak.assertTypeOf('string', method);

    var defaults = {
        dataType: 'json',
        data: {}
    };

    options = peak.ajax.handleOptions(method, options);
    options = $.extend(defaults, options);

    options.url = 'services/api/rest/' + options.dataType + '/';
    options.data.method = method;

    return peak.ajax(options);
};
