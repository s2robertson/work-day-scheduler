// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    /* Add an event handler to each time-block's save button:
     * take the current value of the textarea, and save it in localStorage
     * keyed to the time-block's id */
    $('.time-block .saveBtn').on('click', function() {
        const buttonEl = $(this);
        const key = buttonEl.parent().attr('id');
        const value = buttonEl.prev().val();
        localStorage.setItem(key, value);
    })

    /* Set one of three classes (past, present, or future) on each time-block
     * by comparing its hour (computed from id) to the current time */
    const now = dayjs();
    const nowHour = now.hour();
    $('.time-block').each(function() {
        const timeBlockEl = $(this);
        const elemHour = timeBlockEl.attr('id').substring(5);
        if (elemHour < nowHour) {
            timeBlockEl.addClass('past');
        } else if (elemHour > nowHour) {
            timeBlockEl.addClass('future');
        } else {
            timeBlockEl.addClass('present');
        }
    })

    /* Initialize each time-block's textarea from localStorage, using the
     * time-block's id as the key */
    $('.time-block').each(function() {
        const timeBlockEl = $(this);
        const key = timeBlockEl.attr('id');
        const value = localStorage.getItem(key);
        if (value) {
            timeBlockEl.children('.description').val(value);
        }
    })

    // Display the current date in the header of the page.
    $('#currentDay').text(now.format('ddd MMM D, YYYY'))
});
