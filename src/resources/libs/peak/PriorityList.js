/**
 * Priority lists allow you to create an indexed list that can be iterated through in a specific
 * order.
 */
smart.PriorityList = function () {
    this.length = 0;
    this.priorities_ = [];
};

/**
 * Inserts an element into the priority list at the priority specified.
 *
 * @param {Object} obj          The object to insert
 * @param {Number} opt_priority An optional priority to insert at.
 *
 * @return {Void}
 */
smart.PriorityList.prototype.insert = function (obj, opt_priority) {
    var priority = 500;
    if (arguments.length == 2 && opt_priority !== undefined) {
        priority = parseInt(opt_priority, 10);
    }

    priority = Math.max(priority, 0);

    if (smart.isUndefined(this.priorities_[priority])) {
        this.priorities_[priority] = [];
    }

    this.priorities_[priority].push(obj);
    this.length++;
};

/**
 * Iterates through each element in order.
 *
 * Unlike every, this ignores the return value of the callback.
 *
 * @param {Function} callback The callback function to pass each element through. See
 *                            Array.prototype.every() for details.
 * @return {Object}
 */
smart.PriorityList.prototype.forEach = function (callback) {
    smart.assertTypeOf('function', callback);

    var index = 0;

    this.priorities_.forEach(function (elems) {
        elems.forEach(function (elem) {
            callback(elem, index++);
        });
    });

    return this;
};

/**
 * Iterates through each element in order.
 *
 * Unlike forEach, this returns the value of the callback and will break on false.
 *
 * @param {Function} callback The callback function to pass each element through. See
 *                            Array.prototype.every() for details.
 * @return {Object}
 */
smart.PriorityList.prototype.every = function (callback) {
    smart.assertTypeOf('function', callback);

    var index = 0;

    return this.priorities_.every(function (elems) {
        return elems.every(function (elem) {
            return callback(elem, index++);
        });
    });
};

/**
 * Removes an element from the priority list
 *
 * @param {Object} obj The object to remove.
 * @return {Void}
 */
smart.PriorityList.prototype.remove = function (obj) {
    this.priorities_.forEach(function (elems) {
        var index;
        while ((index = elems.indexOf(obj)) !== -1) {
            elems.splice(index, 1);
            this.length--;
        }
    });
};