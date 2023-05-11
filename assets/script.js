// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    /* Add an event handler to each time-block's save button:
     * take the current value of the textarea, and save it in localStorage
     * keyed to the time-block's id */
    $('.time-block .saveBtn').on('click', function() {
        const _this = $(this);
        const key = _this.parent().attr('id');
        const value = _this.prev().val();
        localStorage.setItem(key, value);
    })

    /* Set one of three classes (past, present, or future) on each time-block
     * by comparing its hour (computed from id) to the current time */
    const now = dayjs();
    const nowHour = now.hour();
    $('.time-block').each(function() {
        const _this = $(this);
        const elemHour = _this.attr('id').substring(5);
        if (elemHour < nowHour) {
            _this.addClass('past');
        } else if (elemHour > nowHour) {
            _this.addClass('future');
        } else {
            _this.addClass('present');
        }
    })

    /* Initialize each time-block's textarea from localStorage, using the
     * time-block's id as the key */
    $('.time-block').each(function() {
        const _this = $(this);
        const key = _this.attr('id');
        const value = localStorage.getItem(key);
        if (value) {
            _this.children('.description').val(value);
        }
    })

    // Display the current date in the header of the page.
    $('#currentDay').text(now.format('ddd MMM D, YYYY'))
});
