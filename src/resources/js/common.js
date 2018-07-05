smart.provide('smart.admin');

smart.admin.ready = function () {
    // initialize switchery elements
    smart.admin.switchUi();
    smart.select2();
    smart.addActiveClass();
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
            rel = $checkbox.attr('data-rel'),
            color = $checkbox.attr('data-color'),
            handler = $checkbox.attr('data-handler');

        // switch size
        if (size === 'medium') {
            size = 'ui-switch-md';
        } else if (size === 'large') {
            size = 'ui-switch-lg';
        } else {
            size = '';
        }

        // default color
        if (!color)
            color = 'blue';

        // check handler
        if (!handler || !(-1 === $.inArray(['ui-switch', 'md-switch'])))
            handler = 'md-switch';

        // initialize switch ui
        $checkbox.wrap('<label></label>');
        var $label = $checkbox.closest('label').addClass(handler).addClass(size);
        $label.append($('<i>').addClass(color));

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
                        $checkbox.closest('label').addClass('disabled');
                    },
                    complete: function () {
                        $checkbox.closest('label').removeClass('disabled');
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

/**
 * initialize select2
 */
smart.select2 = function(){
    var select = $('[data-widget="select2"]:not([data-select2])');
    select.each(function(index, item){
        var options = $(item).data('options');
        //Init
        select.select2(options);

        //Events
        var events = $(item).data('events');
        $.each(events, function(index, event){
            $(item).on('select2:'+event.name, function (e) {
                // Do something
                eval(event.callback);
            });
        });
    });
}

smart.addActiveClass = function(){
    /*var pgurl = window.location.href.substr(window.location.href
        .lastIndexOf("/")+1);*/
    pgurl = window.location.pathname;
    $(".nav li").each(function(){
        $("a").each(function(){
            if($(this).attr("href") == pgurl || $(this).attr("href") == '' ){
                $(this).addClass("active");
                $(this).parent().addClass("active");
            }
        })

    });
}

// register hook handlers
smart.register_hook_handler('switchery', 'admin', smart.admin.switchUi);
smart.register_hook_handler('ready', 'system', smart.admin.ready);
smart.register_hook_handler('select2', 'admin', smart.select2);