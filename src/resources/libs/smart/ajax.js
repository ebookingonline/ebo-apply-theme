/*globals smart, $*/
smart.provide('smart.ajax');

/**
 * @author Evan Winslow
 * Provides a bunch of useful shortcut functions for making ajax calls
 */

/**
 * Wrapper function for jQuery.ajax which ensures that the url being called
 * is relative to the smart site root.
 *
 * You would most likely use smart.get or smart.post, rather than this function
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options Optional. {@link jQuery#ajax}
 * @return {jqXHR}
 */
smart.ajax = function (url, options) {
    options = smart.ajax.handleOptions(url, options);

    options.url = smart.normalize_url(options.url);

    //Always display system messages after actions
    var custom_complete = options.complete || smart.nullFunction;
    options.complete = function (json, two, three, four) {
        var responseText = {};
        try {
            responseText = $.parseJSON(json.responseText)
        } catch (err) {
        }

        if (responseText && responseText.messages) {
            smart.register_error(responseText.messages.error);
            smart.system_message(responseText.messages.success);
            smart.register_info(responseText.messages.info);
            smart.register_warning(responseText.messages.warning);
        }

        custom_complete(json, two, three, four);
    };

    return $.ajax(options);
};
/**
 * @const
 */
smart.ajax.SUCCESS = 0;

/**
 * @const
 */
smart.ajax.ERROR = -1;


/**
 * Handle optional arguments and return the resulting options object
 *
 * @param url
 * @param options
 * @return {Object}
 * @private
 */
smart.ajax.handleOptions = function (url, options) {
    var data_only = true,
        data,
        member;

    //smart.ajax('example/file.php', {...});
    if (smart.isString(url)) {
        options = options || {};

        //smart.ajax({...});
    } else {
        options = url || {};
        url = options.url;
    }

    //smart.ajax('example/file.php', function() {...});
    if (smart.isFunction(options)) {
        data_only = false;
        options = {success: options};
    }

    //smart.ajax('example/file.php', {data:{...}});
    if (options.data) {
        data_only = false;
    } else {
        for (member in options) {
            //smart.ajax('example/file.php', {callback:function(){...}});
            if (smart.isFunction(options[member])) {
                data_only = false;
            }
        }
    }

    //smart.ajax('example/file.php', {notdata:notfunc});
    if (data_only) {
        data = options;
        options = {data: data};
    }

    if (!smart.isFunction(options.error)) {
        // add a generic error handler
        options.error = smart.ajax.handleAjaxError;
    }

    if (url) {
        options.url = url;
    }

    var headers = {
        'X-CSRF-TOKEN': smart.config.token || $('meta[name="csrf-token"]').attr('content')
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
smart.ajax.handleAjaxError = function (xhr, status, error) {
    if (!xhr.getAllResponseHeaders()) {
        // user aborts (like refresh or navigate) do not have headers
        return;
    }

    smart.register_error('ajax:error');
};

/**
 * Wrapper function for smart.ajax which forces the request type to 'get.'
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
smart.get = function (url, options) {
    options = smart.ajax.handleOptions(url, options);

    options.type = 'get';
    return smart.ajax(options);
};

/**
 * Wrapper function for smart.get which forces the dataType to 'json.'
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
smart.getJSON = function (url, options) {
    options = smart.ajax.handleOptions(url, options);

    options.dataType = 'json';
    return smart.get(options);
};

/**
 * Wrapper function for smart.ajax which forces the request type to 'post.'
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
smart.post = function (url, options) {
    options = smart.ajax.handleOptions(url, options);

    options.type = 'post';
    return smart.ajax(options);
};

/**
 * Perform an action via ajax
 *
 * @example Usage 1:
 * At its simplest, only the action name is required (and anything more than the
 * action name will be invalid).
 * <pre>
 * smart.action('name/of/action');
 * </pre>
 *
 * The action can be relative to the current site ('name/of/action') or
 * the full URL of the action ('http://smart.org/action/name/of/action').
 *
 * @example Usage 2:
 * If you want to pass some data along with it, use the second parameter
 * <pre>
 * smart.action('friend/add', { friend: some_guid });
 * </pre>
 *
 * @example Usage 3:
 * Of course, you will have no control over what happens when the request
 * completes if you do it like that, so there's also the most verbose method
 * <pre>
 * smart.action('friend/add', {
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
 * specify a callback method or the data parameter.  If you do not, smart.action
 * will think you mean to send the second parameter as data.
 *
 * @note You do not have to add security tokens to this request.  smart does that
 * for you automatically.
 *
 * @see jQuery.ajax
 *
 * @param {String} action The action to call.
 * @param {Object} options
 * @return {jqXHR}
 */
smart.action = function (action, options) {
    smart.assertTypeOf('string', action);

    if (action.indexOf('ajax/action/') < 0) {
        action = 'ajax/action/' + action;
    }
    options = smart.ajax.handleOptions(action, options);
    options.dataType = 'json';

    return smart.post(options);
};

/**
 * ajax view
 * @param view
 * @param options
 * @returns {jqXHR}
 */
smart.view = function (view, options) {
    smart.assertTypeOf('string', view);

    if (view.indexOf('ajax/view/') < 0)
        view = 'ajax/view/' + view;

    options = smart.ajax.handleOptions(view, options);
    options.dataType = 'html';

    return smart.get(options);
};

/**
 * Make an API call
 *
 * @example Usage:
 * <pre>
 * smart.api('system.api.list', {
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
smart.api = function (method, options) {
    smart.assertTypeOf('string', method);

    var defaults = {
        dataType: 'json',
        data: {}
    };

    options = smart.ajax.handleOptions(method, options);
    options = $.extend(defaults, options);

    options.url = 'services/api/rest/' + options.dataType + '/';
    options.data.method = method;

    return smart.ajax(options);
};
