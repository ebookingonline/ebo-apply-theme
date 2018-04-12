/*
 * Javascript hook interface
 */

smart.provide('smart.config.hooks');
smart.provide('smart.config.instant_hooks');
smart.provide('smart.config.triggered_hooks');

/**
 * Registers a hook handler with the event system.
 *
 * For best results, depend on the smart/ready module, so plugins will have been booted.
 *
 * The special keyword "all" can be used for either the name or the type or both
 * and means to call that handler for all of those hooks.
 *
 * Note that handlers registering for instant hooks will be executed immediately if the instant
 * hook has been previously triggered.
 *
 * @param {String}   name     Name of the plugin hook to register for
 * @param {String}   type     Type of the event to register for
 * @param {Function} handler  Handle to call
 * @param {Number}   priority Priority to call the event handler
 * @return {Boolean}
 */
smart.register_hook_handler = function (name, type, handler, priority) {
    smart.assertTypeOf('string', name);
    smart.assertTypeOf('string', type);
    smart.assertTypeOf('function', handler);

    if (!name || !type) {
        return false;
    }

    var hooks = smart.config.hooks;

    smart.provide([name, type], hooks);

    if (!(hooks[name][type] instanceof smart.PriorityList)) {
        hooks[name][type] = new smart.PriorityList();
    }

    // call if instant and already triggered.
    if (smart.is_instant_hook(name, type) && smart.is_triggered_hook(name, type)) {
        handler(name, type, null, null);
    }

    return hooks[name][type].insert(handler, priority);
};

/**
 * Emits a hook.
 *
 * Loops through all registered hooks and calls the handler functions in order.
 * Every handler function will always be called, regardless of the return value.
 *
 * @warning Handlers take the same 4 arguments in the same order as when calling this function.
 * This is different from the PHP version!
 *
 * @note Instant hooks do not support params or values.
 *
 * Hooks are called in this order:
 *    specifically registered (event_name and event_type match)
 *    all names, specific type
 *    specific name, all types
 *    all names, all types
 *
 * @param {String} name   Name of the hook to emit
 * @param {String} type   Type of the hook to emit
 * @param {Object} params Optional parameters to pass to the handlers
 * @param {Object} value  Initial value of the return. Can be mangled by handlers
 *
 * @return {Boolean}
 */
smart.trigger_hook = function (name, type, params, value) {
    smart.assertTypeOf('string', name);
    smart.assertTypeOf('string', type);

    // mark as triggered
    smart.set_triggered_hook(name, type);

    // default to null if unpassed
    value = !smart.isNullOrUndefined(value) ? value : null;

    var hooks = smart.config.hooks,
        tempReturnValue = null,
        returnValue = value,
        callHookHandler = function (handler) {
            tempReturnValue = handler(name, type, params, returnValue);
            if (!smart.isNullOrUndefined(tempReturnValue)) {
                returnValue = tempReturnValue;
            }
        };

    smart.provide([name, type], hooks);
    smart.provide(['all', type], hooks);
    smart.provide([name, 'all'], hooks);
    smart.provide(['all', 'all'], hooks);

    var hooksList = [];

    if (name != 'all' && type != 'all') {
        hooksList.push(hooks[name][type]);
    }

    if (type != 'all') {
        hooksList.push(hooks['all'][type]);
    }

    if (name != 'all') {
        hooksList.push(hooks[name]['all']);
    }

    hooksList.push(hooks['all']['all']);

    hooksList.every(function (handlers) {
        if (handlers instanceof smart.PriorityList) {
            handlers.forEach(callHookHandler);
        }
        return true;
    });

    return returnValue;
};

/**
 * Registers a hook as an instant hook.
 *
 * After being trigger once, registration of a handler to an instant hook will cause the
 * handle to be executed immediately.
 *
 * @note Instant hooks must be triggered without params or defaults. Any params or default
 * passed will *not* be passed to handlers executed upon registration.
 *
 * @param {String} name The hook name.
 * @param {String} type The hook type.
 * @return {Number} integer
 */
smart.register_instant_hook = function (name, type) {
    smart.assertTypeOf('string', name);
    smart.assertTypeOf('string', type);

    return smart.push_to_object_array(smart.config.instant_hooks, name, type);
};

/**
 * Is this hook registered as an instant hook?
 *
 * @param {String} name The hook name.
 * @param {String} type The hook type.
 */
smart.is_instant_hook = function (name, type) {
    return smart.is_in_object_array(smart.config.instant_hooks, name, type);
};

/**
 * Records that a hook has been triggered.
 *
 * @param {String} name The hook name.
 * @param {String} type The hook type.
 */
smart.set_triggered_hook = function (name, type) {
    return smart.push_to_object_array(smart.config.triggered_hooks, name, type);
};

/**
 * Has this hook been triggered yet?
 *
 * @param {String} name The hook name.
 * @param {String} type The hook type.
 */
smart.is_triggered_hook = function (name, type) {
    return smart.is_in_object_array(smart.config.triggered_hooks, name, type);
};

smart.register_instant_hook('init', 'system');
smart.register_instant_hook('ready', 'system');
smart.register_instant_hook('boot', 'system');

smart.trigger_hook('init', 'system');
smart.trigger_hook('ready', 'system');
smart.trigger_hook('boot', 'system');