smart.provide('smart.admin');

smart.admin.ready = function () {
    // initialize switchery elements
    smart.admin.switchUi();
};

/**
 * initialize all switchery inputs
 */
smart.admin.switchUi = function () {
    var elems = Array.prototype.slice.call(document.querySelectorAll('[data-widget="switchui"]:not([data-switchui])'));

    elems.forEach(function (item) {
        var $checkbox = $(item),
            type = $checkbox.attr('data-type'),
            size = $checkbox.attr('data-size'),
            action = $checkbox.attr('data-action'),
            rel = $checkbox.attr('data-rel');

        // switch size
        if (size === 'medium') {
            size = 'ui-switch-md';
        } else if (size === 'large') {
            size = 'ui-switch-lg';
        } else {
            size = '';
        }

        // initialize switch ui
        $checkbox.wrap('<label></label>');
        var $label = $checkbox.closest('label').addClass('ui-switch').addClass(size);
        $label.append($('<i>'));

        $checkbox.on('change', function () {
            // run action if action exists else trigger hook
            // usage:   <element data-action="x/y/z"  data-rel="{id:1, in:[1,2,3]}" />
            var old = !this.checked;
            var self = this;
            if (!smart.isNullOrUndefined(action) && !smart.isNullOrUndefined(rel)) {
                var data = rel;
                try {
                    data = $.parseJSON(rel);
                } catch (err) {
                }

                // convert to object if not an object data
                if (!smart.isObject(data))
                    data = {rel: data};

                smart.action(action, {
                    data: data,
                    beforeSend: function () {
                        $checkbox.addClass('disabled');
                    },
                    complete: function () {
                        $checkbox.removeClass('disabled');
                    },
                    success: function (res) {
                        var checked = smart.extract('output.result', res, old);
                        if (old !== checked)
                            this.revert(!old);
                    },
                    error: function () {
                        console.log('Error');
                        this.revert(!$(self).prop('checked'))
                    },
                    revert: function (to) {
                        $(self).prop('checked', to);
                    }
                });
                return;
            }

            // trigger
            if (!smart.isNullOrUndefined(type)) {
                smart.trigger_hook('switch:change', type, {
                    element: $checkbox,
                    checked: this.value
                });
            }
        });
    });
};

// register hook handlers
smart.register_hook_handler('switchery', 'admin', smart.admin.switchUi);
smart.register_hook_handler('ready', 'system', smart.admin.ready);