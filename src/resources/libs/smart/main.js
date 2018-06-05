/**
 * @namespace Singleton object for holding the smart javascript library
 */
var smart = smart || {};

/**
 * Pointer to the global context
 *
 * @see smart.require
 * @see smart.provide
 */
smart.global = this;


/**
 * Ensure smart.config object
 */
smart.config = smart.config || {};

/**
 * Convenience reference to an empty function.
 *
 * Save memory by not generating multiple empty functions.
 */
smart.nullFunction = function () {
};

/**
 * This forces an inheriting class to implement the method or
 * it will throw an error.
 *
 * @example
 * AbstractClass.prototype.toBeImplemented = smart.abstractMethod;
 */
smart.abstractMethod = function () {
    throw new Error("Oops... you forgot to implement an abstract method!");
};

/**
 * Merges two or more objects together and returns the result.
 */
smart.extend = jQuery.extend;

/**
 * Check if the value is an array.
 *
 * No sense in reinventing the wheel!
 *
 * @param {*} val
 *
 * @return boolean
 */
smart.isArray = jQuery.isArray;

/**
 * Check if the value is a function.
 *
 * No sense in reinventing the wheel!
 *
 * @param {*} val
 *
 * @return boolean
 */
smart.isFunction = jQuery.isFunction;

/**
 * Check if the value is a "plain" object (i.e., created by {} or new Object())
 *
 * No sense in reinventing the wheel!
 *
 * @param {*} val
 *
 * @return boolean
 */
smart.isPlainObject = jQuery.isPlainObject;

/**
 * Check if the value is a string
 *
 * @param {*} val
 *
 * @return boolean
 */
smart.isString = function (val) {
    return typeof val === 'string';
};

/**
 * Check if the value is a number
 *
 * @param {*} val
 *
 * @return boolean
 */
smart.isNumber = function (val) {
    return typeof val === 'number';
};

/**
 * Check if the value is an object
 *
 * @note This returns true for functions and arrays!  If you want to return true only
 * for "plain" objects (created using {} or new Object()) use smart.isPlainObject.
 *
 * @param {*} val
 *
 * @return boolean
 */
smart.isObject = function (val) {
    return typeof val === 'object';
};

/**
 * Check if the value is undefined
 *
 * @param {*} val
 *
 * @return boolean
 */
smart.isUndefined = function (val) {
    return val === undefined;
};

/**
 * Check if the value is null
 *
 * @param {*} val
 *
 * @return boolean
 */
smart.isNull = function (val) {
    return val === null;
};

/**
 * Check if the value is either null or undefined
 *
 * @param {*} val
 *
 * @return boolean
 */
smart.isNullOrUndefined = function (val) {
    return val == null;
};

/**
 * Throw an exception of the type doesn't match
 *
 * @todo Might be more appropriate for debug mode only?
 */
smart.assertTypeOf = function (type, val) {
    if (typeof val !== type) {
        throw new TypeError("Expecting param of " +
            arguments.caller + "to be a(n) " + type + "." +
            "  Was actually a(n) " + typeof val + ".");
    }
};

/**
 * Throw an error if the required package isn't present
 *
 * @param {String} pkg The required package (e.g., 'smart.package')
 */

smart.require = function (pkg) {
    smart.assertTypeOf('string', pkg);

    var parts = pkg.split('.'),
        cur = smart.global,
        part, i;

    for (i = 0; i < parts.length; i += 1) {
        part = parts[i];
        cur = cur[part];
        if (smart.isUndefined(cur)) {
            throw new Error("Missing package: " + pkg);
        }
    }
};


/**
 * Generate the skeleton for a package.
 *
 * <pre>
 * smart.provide('smart.package.subpackage');
 * </pre>
 *
 * is equivalent to
 *
 * <pre>
 * smart = smart || {};
 * smart.package = smart.package || {};
 * smart.package.subpackage = smart.package.subpackage || {};
 * </pre>
 *
 * An array package name can be given if any subpackage names need to contain a period.
 *
 * <pre>
 * smart.provide(['one', 'two.three']);
 * </pre>
 *
 * is equivalent to
 *
 * one = one || {};
 * one['two.three'] = one['two.three'] || {};
 *
 * @example smart.provide('smart.config.translations')
 *
 * @param {String|Array} pkg The package name. Only use an array if a subpackage name needs to contain a period.
 *
 * @param {Object} opt_context The object to extend (defaults to this)
 */
smart.provide = function (pkg, opt_context) {
    var parts,
        context = opt_context || smart.global,
        part, i;

    if (smart.isArray(pkg)) {
        parts = pkg;
    } else {
        smart.assertTypeOf('string', pkg);
        parts = pkg.split('.');
    }

    for (i = 0; i < parts.length; i += 1) {
        part = parts[i];
        context[part] = context[part] || {};
        context = context[part];
    }
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * @example
 * <pre>
 * function ParentClass(a, b) { }
 *
 * ParentClass.prototype.foo = function(a) { alert(a); }
 *
 * function ChildClass(a, b, c) {
 *     //equivalent of parent::__construct(a, b); in PHP
 *     ParentClass.call(this, a, b);
 * }
 *
 * smart.inherit(ChildClass, ParentClass);
 *
 * var child = new ChildClass('a', 'b', 'see');
 * child.foo('boo!'); // alert('boo!');
 * </pre>
 *
 * @param {Function} Child Child class constructor.
 * @param {Function} Parent Parent class constructor.
 */
smart.inherit = function (Child, Parent) {
    Child.prototype = new Parent();
    Child.prototype.constructor = Child;
};

/**
 * register smart config objects
 * @param config
 */
smart.config.register = function (config = {}) {
    smart.assertTypeOf('object', config);
    $.extend(smart.config, config);
};

/**
 * return config value from smart config
 * @param nested
 * @param defaultValue
 * @returns {boolean|*}
 */
smart.config.get = function (nested, defaultValue = null) {
    return smart.extract(nested, smart.config, defaultValue);
};

/**
 * Converts shorthand urls to absolute urls.
 *
 * If the url is already absolute or protocol-relative, no change is made.
 *
 * smart.normalize_url('');                   // 'http://my.site.com/'
 * smart.normalize_url('dashboard');          // 'http://my.site.com/dashboard'
 * smart.normalize_url('http://google.com/'); // no change
 * smart.normalize_url('//google.com/');      // no change
 *
 * @param {String} url The url to normalize
 * @return {String} The extended url
 */
smart.normalize_url = function (url) {
    url = url || '';
    smart.assertTypeOf('string', url);

    function validate(url) {
        url = smart.parse_url(url);
        if (url.scheme) {
            url.scheme = url.scheme.toLowerCase();
        }
        if (url.scheme == 'http' || url.scheme == 'https') {
            if (!url.host) {
                return false;
            }
            /* hostname labels may contain only alphanumeric characters, dots and hypens. */
            if (!(new RegExp("^([a-zA-Z0-9][a-zA-Z0-9\\-\\.]*)$", "i")).test(url.host) || url.host.charAt(-1) == '.') {
                return false;
            }
        }
        /* some schemas allow the host to be empty */
        if (!url.scheme || !url.host && url.scheme != 'mailto' && url.scheme != 'news' && url.scheme != 'file') {
            return false;
        }
        return true;
    };

    // ignore anything with a recognized scheme
    if (url.indexOf('http:') === 0 ||
        url.indexOf('https:') === 0 ||
        url.indexOf('javascript:') === 0 ||
        url.indexOf('mailto:') === 0) {
        return url;
    }

    // all normal URLs including mailto:
    else if (validate(url)) {
        return url;
    }

    // '//example.com' (Shortcut for protocol.)
    // '?query=test', #target
    else if ((new RegExp("^(\\#|\\?|//)", "i")).test(url)) {
        return url;
    }


    // watch those double escapes in JS.

    // 'install.php', 'install.php?step=step'
    else if ((new RegExp("^[^\/]*\\.php(\\?.*)?$", "i")).test(url)) {
        return smart.config.wwwroot + url.ltrim('/');
    }

    // 'example.com', 'example.com/subpage'
    else if ((new RegExp("^[^/]*\\.", "i")).test(url)) {
        return 'http://' + url;
    }

    // 'page/handler', 'mod/plugin/file.php'
    else {
        // trim off any leading / because the site URL is stored
        // with a trailing /
        return smart.config.wwwroot + url.ltrim('/');
    }
};

/**
 * Displays system messages via javascript rather than php.
 *
 * @param {String} msgs The message we want to display
 * @param {Number} delay The amount of time to display the message in milliseconds. Defaults to 6 seconds.
 * @param {String} type The type of message (typically 'error' or 'message')
 * @private
 */
smart.messages = function (msgs, delay, type) {
    if (smart.isUndefined(msgs)) {
        return;
    }

    var appendMessage = function (msg) {
        if (notie && smart.isObject(notie)) {
            notie.alert({text: msg, position: 'bottom', type: type});
        } else {
            console.log(msg);
        }
    };

    // handle non-arrays
    if (!smart.isArray(msgs))
        msgs = [msgs];

    msgs.forEach(appendMessage);
};

/**
 * Wrapper function for messages. Specifies "messages" as the type of message
 * @param {String} msgs  The message to display
 * @param {Number} delay How long to display the message (milliseconds)
 */
smart.system_message = function (msgs, delay) {
    smart.messages(msgs, delay, "success");
};

/**
 * Wrapper function for messages.  Specifies "errors" as the type of message
 * @param {String} errors The error message to display
 * @param {Number} delay  How long to dispaly the error message (milliseconds)
 */
smart.register_error = function (errors, delay) {
    smart.messages(errors, delay, "error");
};

/**
 * Wrapper function for messages.  Specifies "info" as the type of message
 * @param {String} errors The error message to display
 * @param {Number} delay  How long to dispaly the error message (milliseconds)
 */
smart.register_info = function (errors, delay) {
    smart.messages(errors, delay, "info");
};

/**
 * Wrapper function for messages.  Specifies "warning" as the type of message
 * @param {String} errors The error message to display
 * @param {Number} delay  How long to dispaly the error message (milliseconds)
 */
smart.register_warning = function (errors, delay) {
    smart.messages(errors, delay, "warning");
};


/**
 * Informs admin users via a console message about use of a deprecated function or capability
 *
 * @param {String} msg         The deprecation message to display
 * @param {String} dep_version The version the function was deprecated for
 * @since 1.9
 */
smart.deprecated_notice = function (msg, dep_version) {
    if (smart.is_admin_logged_in()) {
        msg = "Deprecated in smart " + dep_version + ": " + msg;
        if (typeof console !== "undefined") {
            console.info(msg);
        }
    }
};

/**
 * Meant to mimic the php forward() function by simply redirecting the
 * user to another page.
 *
 * @param {String} url The url to forward to
 */
smart.forward = function (url) {
    location.href = smart.normalize_url(url);
};

/**
 * Parse a URL into its parts. Mimicks http://php.net/parse_url
 *
 * @param {String}  url       The URL to parse
 * @param {Number}  component A component to return
 * @param {Boolean} expand    Expand the query into an object? Else it's a string.
 *
 * @return {Object} The parsed URL
 */
smart.parse_url = function (url, component, expand) {
    // Adapted from http://blog.stevenlevithan.com/archives/parseuri
    // which was release under the MIT
    // It was modified to fix mailto: and javascript: support.
    expand = expand || false;
    component = component || false;

    var re_str =
            // scheme (and user@ testing)
        '^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?://)?'
        // possibly a user[:password]@
        + '((?:(([^:@]*)(?::([^:@]*))?)?@)?'
        // host and port
        + '([^:/?#]*)(?::(\\d*))?)'
        // path
        + '(((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[?#]|$)))*/?)?([^?#/]*))'
        // query string
        + '(?:\\?([^#]*))?'
        // fragment
        + '(?:#(.*))?)',
        keys = {
            1: "scheme",
            4: "user",
            5: "pass",
            6: "host",
            7: "port",
            9: "path",
            12: "query",
            13: "fragment"
        },
        results = {};

    if (url.indexOf('mailto:') === 0) {
        results['scheme'] = 'mailto';
        results['path'] = url.replace('mailto:', '');
        return results;
    }

    if (url.indexOf('javascript:') === 0) {
        results['scheme'] = 'javascript';
        results['path'] = url.replace('javascript:', '');
        return results;
    }

    var re = new RegExp(re_str);
    var matches = re.exec(url);

    for (var i in keys) {
        if (matches[i]) {
            results[keys[i]] = matches[i];
        }
    }

    if (expand && typeof(results['query']) != 'undefined') {
        results['query'] = smart.parse_str(results['query']);
    }

    if (component) {
        if (typeof(results[component]) != 'undefined') {
            return results[component];
        } else {
            return false;
        }
    }
    return results;
};

/**
 * Returns an object with key/values of the parsed query string.
 *
 * @param  {String} string The string to parse
 * @return {Object} The parsed object string
 */
smart.parse_str = function (string) {
    var params = {},
        result,
        key,
        value,
        re = /([^&=]+)=?([^&]*)/g,
        re2 = /\[\]$/;

    // assignment intentional
    while (result = re.exec(string)) {
        key = decodeURIComponent(result[1].replace(/\+/g, ' '));
        value = decodeURIComponent(result[2].replace(/\+/g, ' '));

        if (re2.test(key)) {
            key = key.replace(re2, '');
            if (!params[key]) {
                params[key] = [];
            }
            params[key].push(value);
        } else {
            params[key] = value;
        }
    }

    return params;
};

/**
 * Returns a jQuery selector from a URL's fragement.  Defaults to expecting an ID.
 * @param {String} url The URL
 * @return {String} The selector
 */
smart.getSelectorFromUrlFragment = function (url) {
    var fragment = url.split('#')[1];

    if (fragment) {
        // this is a .class or a tag.class
        if (fragment.indexOf('.') > -1) {
            return fragment;
        }

        // this is an id
        else {
            return '#' + fragment;
        }
    }
    return '';
};

/**
 * Adds child to object[parent] array.
 *
 * @param {Object} object The object to add to
 * @param {String} parent The parent array to add to.
 * @param {*}      value  The value
 */
smart.push_to_object_array = function (object, parent, value) {
    smart.assertTypeOf('object', object);
    smart.assertTypeOf('string', parent);

    if (!(object[parent] instanceof Array)) {
        object[parent] = [];
    }

    if ($.inArray(value, object[parent]) < 0) {
        return object[parent].push(value);
    }

    return false;
};

/**
 * Tests if object[parent] contains child
 *
 * @param {Object} object The object to add to
 * @param {String} parent The parent array to add to.
 * @param {*}      value  The value
 */
smart.is_in_object_array = function (object, parent, value) {
    smart.assertTypeOf('object', object);
    smart.assertTypeOf('string', parent);

    return typeof(object[parent]) != 'undefined' && $.inArray(value, object[parent]) >= 0;
};


/**
 * extract object value
 * @param nested
 * @param object
 * @param default_value
 * @returns {boolean|*}
 */
smart.extract = function (nested, object, default_value) {
    default_value = smart.isUndefined(default_value) ? false : default_value;
    if (smart.isNullOrUndefined(nested))
        return default_value;

    var default_ret = default_value, args = nested.split('.');

    for (var i = 0; i < args.length; i++) {
        if (!object || !object.hasOwnProperty(args[i]))
            return default_ret;
        object = default_value = object[args[i]];
    }

    return default_value;
};
