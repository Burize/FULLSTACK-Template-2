/*eslint-disable*/
/*!
 * glDatePicker v2.0
 * http://glad.github.com/glDatePicker/
 *
 * Copyright (c) 2013 Gautam Lad.  All rights reserved.
 * Released under the MIT license.
 *
 * Date: Tue Jan 1 2013
 */

import './glDatePicker.default.styl';

(function ($) {
  $.fn.glDatePicker = function (options) {
    const pluginName = 'glDatePicker';

    // Find the plugin attached to the element
    const instance = this.data(pluginName);

    // If the instance wasn't found, create it...
    if (!instance) {
      // Return the element being bound to
      return this.each(function () {
        return $(this).data(pluginName, new glDatePicker(this, options));
      });
    }

    // ...otherwise if the user passes true to the plugin (on the second call),
    // then return the instance of the plugin itself
    return (options === true) ? instance : this;
  };

  // Default options
  $.fn.glDatePicker.defaults =
 {
   // Style to use for the calendar.  This name must match the name used in
   // the stylesheet, using the class naming convention "gldp-cssName".
   cssName: 'default',

   // The z-index for the calendar control.
   zIndex: 1000,

   // Thickness of border (in pixels)
   borderSize: 1,

   // The number of pixels to offset the calendar's position on the page.
   calendarOffset: { x: 0, y: 1 },

   // Set to true if you want the calendar to be visible at all times.
   // NOTE: If your target element is hidden, the calendar will be hidden as well.
   showAlways: true,

   // Hide the calendar when a date is selected (only if showAlways is set to false).
   hideOnClick: false,

   // Allow selection of months by clicking on the month in the title.
   allowMonthSelect: false,

   // Allow selection of years by clicking on the year in the title.
   allowYearSelect: false,

   // The date that will be treated as 'today'.
   todayDate: new Date(),

   // The date that will appear selected when the calendar renders.
   // By default it will be set to todayDate.
   selectedDate: null,

   // Arrows used for the Previous and Next month buttons on the title.
   // Set these to blank to hide the arrows completely.
   prevArrow: '\u25c4',
   nextArrow: '\u25ba',

   // A collection of dates that can be selectable by the user.
   // The dates can be a one-time selection or made repeatable by setting
   // the repeatYear or repeatMonth flag to true.
   // By default repeatYear and repeatMonth are false.
   //
   // This example creates 4-individual dates that can be selected;
   // The first date will repeat every year, the second date will repeat every
   // month and year, the third date will repeat every month and the fourth date
   // will only be selectable one-time and not repeat:
   //
   //    selectableDates: [
   //        { date: new Date(0, 8, 5), repeatYear: true },
   //        { date: new Date(0, 0, 14), repeatMonth: true, repeatYear: true },
   //        { date: new Date(2013, 0, 24), repeatMonth: true },
   //        { date: new Date(2013, 11, 25) },
   //    ]
   selectableDates: null,

   // A collection of date ranges that are selectable by the user.
   // The ranges can be made to repeat by setting repeatYear to true
   // (repeatMonth is not supported).
   //
   // This example will create 3-sets of selectable date ranges with
   // specific from and to ranges.  The 4th and 5th ranges don't specify
   // the "to" date in which case the "to" date will be the maximum days for
   // the month specified in "from".  The 4th and 5th ranges also repeat every year:
   //
   //     selectableDateRange: [
   //         { from: new Date(2013, 1, 1), to: newDate (2013, 2, 1) },
   //         { from: new Date(2013, 4, 1), to: newDate (2013, 8, 1) },
   //         { from: new Date(2013, 7, 10), to: newDate (2013, 9, 10) },
   //         { from: new Date(0, 8, 10), repeatYear: true }
   //         { from: new Date(0, 9, 1), repeatYear: true }
   //     ]
   selectableDateRange: null,

   // Mark certain dates as special dates.  Similar to selectableDates, this
   // property supports both repeatYear and repeatMonth flags.
   // Each special date can be styled using custom style names and can have
   // data attached to it that will be returned in the onClick callback.
   // The data field can be any custom (JSON style) object.
   //
   // This example creates two (repeatable by year) dates with special data in them.
   // The first date also assigns a special class (which you will have to define).
   //    specialDates: [
   //        {
   //            date: new Date(0, 8, 5),
   //            data: { message: 'Happy Birthday!' },
   //            repeatYear: true,
   //            cssClass: 'special-bday'
   //        },
   //        {
   //            date: new Date(2013, 0, 8),
   //            data: { message: 'Meeting every day 8 of the month' },
   //            repeatMonth: true
   //        }
   //    ]
   specialDates: null,

   // List of months that can be selectable, including when the user clicks
   // on the title to select from the dropdown.
   // This example only makes two months visible; September and December:
   //    selectableMonths: [8, 11]
   selectableMonths: null,

   // List of selectable years.  If not provided, will default to 5-years
   // back and forward.
   // This example only allows selection of dates that have year 2012, 2013, 2015
   //    selectableYears: [2012, 2013, 2015]
   selectableYears: null,

   // List of selectable days of the week.  0 is Sunday, 1 is Monday, and so on.
   // This example allows only Sunday, Tuesday, Thursday:
   //    selectableDOW: [0, 2, 4]
   selectableDOW: null,

   // Names of the month that will be shown in the title.
   // Will default to long-form names:
   //     January, February, March, April, May, June, July,
   //     August, September, October, November, December
   monthNames: null,

   // Names of the days of the Week that will be shown below the title.
   // Will default to short-form names:
   //     Sun, Mon, Tue, Wed, Thu, Fri, Sat
   dowNames: null,

   // The day of the week to start the calendar on.  0 is Sunday, 1 is Monday and so on.
   dowOffset: 1,

   // Callback that will trigger when the user clicks a selectable date.
   // Parameters that are passed to the callback:
   //     el : The input element the date picker is bound to
   //   cell : The cell on the calendar that triggered this event
   //   date : The date associated with the cell
   //   data : Special data associated with the cell (if available, otherwise, null)
   onClick(el, cell, date, data) {
     el.val(date.toLocaleDateString());
   },

   // Callback that will trigger when the user hovers over a selectable date.
   // This callback receives the same set of parameters as onClick.
   onHover(el, cell, date, data) {},

   // Callback that will trigger when the calendar needs to show.
   // You can use this callback to animate the opening of the calendar.
   onShow(calendar) { calendar.show(); },

   // Callback that will trigger when the calendar needs to hide.
   // You can use this callback to animate the hiding of the calendar.
   onHide(calendar) { calendar.hide(); },

   // First date of the month.
   firstDate: null,
 };

  // Our plugin object
  var glDatePicker = (function () {
    // Main entry point.  Initialize the plugin
    function glDatePicker(element, userOptions) {
      // Grab handle to this
      const self = this;

      // Save bound element to el
      self.el = $(element);
      const el = self.el;

      // Merge user options into default options
      self.options = $.extend(true, {}, $.fn.glDatePicker.defaults, userOptions);
      const options = self.options;

      // Find the calendar element if the user provided one
      self.calendar = $($.find(`[gldp-el=${el.attr('gldp-id')} ]`));

      // Default first date to selected
      options.selectedDate = options.selectedDate || options.todayDate;
      options.firstDate = (new Date((options.firstDate || options.selectedDate)))._first();

      if (!(el.attr('gldp-id') || '').length) {
        el.attr('gldp-id', `gldp-${Math.round(Math.random() * 1e10)}`);
      }

      // Show the plugin on focus
      el
        .addClass('gldp-el')
        .bind('click', (e) => { self.show(e); })
        .bind('focus', (e) => { self.show(e); });

      // If the user is defining the container and it exists, hide it on initial creation.
      // The update function will handle showing if it's showAlways = true
      if (self.calendar.length && !options.showAlways) {
        self.calendar.hide();
      }

      // Hide the plugin on mouse up outside of the plugin
      $(document).bind('mouseup', (e) => {
        const target = e.target;
        const calendar = self.calendar;

        if (!el.is(target) && !calendar.is(target) && calendar.has(target).length === 0 && calendar.is(':visible')) {
          self.hide();
        }
      });

      // Render calendar
      self.render();
      $(window).resize(() => {
        self.render();
      });
      self.el.resize(() => {
        alert('asd');
        self.render();
      });
    }

    // Public methods
    glDatePicker.prototype =
  {
    show() {
      // Hide others and show this calendar
      $.each($('.gldp-el').not(this.el), (i, o) => {
        if (o.length) { o.options.onHide(o.calendar); }
      });

      // Show this calendar
      this.options.onShow(this.calendar);
    },

    hide() {
      if (this.options && !this.options.showAlways) {
        this.options.onHide(this.calendar);
      }
    },

    // Render the calendar
    render(renderCalback) {
      const self = this;
      const el = self.el;
      const options = self.options;
      let calendar = self.calendar;

      // Build a core class (with border) that every element would have
      const coreClass = ' core border ';
      const cssName = `gldp-${options.cssName}`;

      // Get today
      const todayVal = options.todayDate._val();
      const todayTime = todayVal.time;

      // Constants
      const maxRow = 5;
      const maxCol = 7;
      const borderSize = `${options.borderSize}px`;

      // Helper function to build selectable list
      const getSelectableList = function (min, max, userList) {
        // Build a default list using min/max
        let resultList = [];
        for (let i = min; i <= max; i++) { resultList.push(i); }

        // If user provided a collection, sanitize list by ensuring it's within range and unique
        if (userList) {
          const newList = [];
          $.each(userList, (i, v) => {
            if (v >= min && v <= max && newList._indexOf(v) < 0) {
              newList.push(v);
            }
          });

          resultList = newList.length ? newList : resultList;
        }

        // Sort the values before returning it
        resultList.sort();

        return resultList;
      };

      // Selectable (constants)
      const selectableMonths = getSelectableList(0, 11, options.selectableMonths);
      const selectableYears = getSelectableList(todayVal.year - 5, todayVal.year + 5, options.selectableYears);
      const selectableDOW = getSelectableList(0, 6, options.selectableDOW);
      let dowNames = options.dowNames || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const monthNames = options.monthNames || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      // Create cell width based on el size
      let containerWidth = el.outerWidth();
      let containerHeight = containerWidth;

      // Create cell size based on container size
      const getCellSize = function (_size, _count) {
        return (_size / _count) + ((options.borderSize / _count) * (_count - 1));
      };
      let cellWidth = getCellSize(containerWidth, maxCol);
      let cellHeight = getCellSize(containerHeight, maxRow + 2);

      // If calendar doesn't exist, create it and re-assign it to self
      if (!calendar.length) {
        self.calendar = calendar = $('<div/>')
          .attr('gldp-el', el.attr('gldp-id'))
          .data('is', true)
          .css(
            {
              display: (options.showAlways ? undefined : 'none'),
              zIndex: options.zIndex,
              width: `${cellWidth * maxCol}px`,
            });

        el.append(calendar);
      } else if (!eval(calendar.data('is'))) {
        containerWidth = calendar.outerWidth();
        containerHeight = calendar.outerHeight();

        cellWidth = getCellSize(containerWidth, maxCol);
        cellHeight = getCellSize(containerHeight, maxRow + 2);
      }

      calendar.css('width', `${cellWidth * maxCol}px`);
      // Hide calendar if the target element isn't visible
      // if(!el.is(':visible')) { calendar.hide(); }

      // Add core classes and remove calendar's children
      calendar
        .removeClass()
        .addClass(cssName)
        .children().remove();

      // Bind to resize event to position calendar
      const onResize = function () {
        const elPos = el.offset();
        calendar.css(
          {
            top: `${0}px`,
            left: `${0}px`,
          });
      };


      // Create variables for cells
      const cellCSS =
    {
      width: `${cellWidth}px`,
      height: `${cellHeight}px`,
      lineHeight: `${cellHeight}px`,
    };

      // Helper function to setDate
      const setFirstDate = function (_date) {
        if (_date) {
          // Get first date
          options.firstDate = _date;

          // Update the calendar
          self.render();
        }
      };

      const getFirstDate = function (_offset) {
        // Create start date as the first date of the month
        const _date = new Date(options.firstDate);

        // Default to no offset
        _offset = _offset || 0;

        // Find out which months are selectable
        while (true) {
          // Adjust date for month offset
          _date.setMonth(_date.getMonth() + _offset);
          _date.setDate(Math.min(1, _date._max()));

          // If not an offset, break out of the loop
          if (_offset == 0) { break; }

          // Get _date's value
          const dateVal = _date._val();

          // Get local vars
          const dateMonth = dateVal.month;
          const dateYear = dateVal.year;

          // Find the month first
          if (selectableMonths._indexOf(dateMonth) != -1) {
            // If year is in our collection, break...
            if (selectableYears._indexOf(dateYear) != -1) {
              break;
            } else {
              // ...otherwise, if it's out of bounds, exit loop
              if (dateYear < selectableYears[0] || dateYear > selectableYears[selectableYears.length - 1]) {
                return null;
              }
            }
          }
        }

        return _date;
      };

      // Get the previous, next first dates
      const prevFirstDate = getFirstDate(-1);
      const nextFirstDate = getFirstDate(1);

      // Get the first date for the current month being rendered
      const firstDate = (options.firstDate = getFirstDate());
      const firstDateVal = firstDate._val();
      const firstDateMonth = firstDateVal.month;
      const firstDateYear = firstDateVal.year;

      // Get the start date in the calendar
      const startDate = new Date(firstDate);

      // Sanitize days of the week offset
      const dowOffset = Math.abs(Math.min(6, Math.max(0, options.dowOffset)));

      // Offset weekdays
      let startOffset = startDate.getDay() - dowOffset;
      startOffset = startOffset < 1 ? -7 - startOffset : -startOffset;
      dowNames = (dowNames.concat(dowNames))
        .slice(dowOffset, dowOffset + 7);

      // Offset the start date
      startDate._add(startOffset);

      // Gather flags for prev/next arrows
      const showPrev = (prevFirstDate);
      const showNext = (nextFirstDate);

      // Create the arrows and title
      const monyearClass = `${coreClass}monyear `;

      const prevCell = $('<div/>')
        .addClass(monyearClass)
        .css(
          $.extend({}, cellCSS,
            {

            }),
        )
        .append(
          $('<a/>')
            .addClass(`prev-arrow${showPrev ? '' : '-off'}`)
            .append($('<i/>').addClass('fa fa-angle-left').attr('aria-hidden', 'true')),
        )
        .mousedown(() => false)
        .click((e) => {
          if (options.prevArrow != '' && showPrev) {
            e.stopPropagation();
            setFirstDate(prevFirstDate);
          }
        });

      const titleCellCount = maxCol - 2;
      const titleWidth = (cellWidth * titleCellCount);
      const titleCell = $('<div/>')
        .addClass(monyearClass)
        .css(
          $.extend({}, cellCSS,
            {
              width: `${titleWidth}px`,

            }),
        );

      const nextCell = $('<div/>')
        .addClass(monyearClass)
        .css(
          $.extend({}, cellCSS,
            {

            }),
        )
        .append(
          $('<a/>')
            .addClass(`next-arrow${showNext ? '' : '-off'}`)
            .append($('<i/>').addClass('fa fa-angle-right').attr('aria-hidden', 'true')),
        )
        .mousedown(() => false)
        .click((e) => {
          if (options.nextArrow != '' && showNext) {
            e.stopPropagation();
            setFirstDate(nextFirstDate);
          }
        });

      // Add cells for prev/title/next

      const big_number = $('<div/>').addClass('big_number').text(options.selectedDate.getDate());
      calendar.prev('input').val(options.selectedDate.toISOString().slice(0, 10));
      calendar
        .append(big_number)
        .append(prevCell)
        .append(titleCell)
        .append(nextCell)
        .append($('<div/>').addClass('cell-container'));

      // Add all the cells to the calendar
      for (let row = 0, cellIndex = 0; row < maxRow + 1; row++) {
        for (let col = 0; col < maxCol; col++, cellIndex++) {
          let cellDate = new Date(startDate);
          var cellClass = 'day';
          var cellZIndex = options.zIndex + (cellIndex);
          var cell = $('<div/>');

          if (!row) {
            cellClass = 'dow';
            cell.html(dowNames[col]);
            cellDate = null;
            cell
              .data('data', { date: cellDate, data: specialData })
              .addClass(coreClass + cellClass)
              .css('width', cellWidth);

            // Add cell to calendar
						      calendar.children('.cell-container').append(cell);
            continue;
          } else {
            // Get the new date for this cell
            cellDate._add(col + ((row - 1) * maxCol));

            // Get value for this date
            var cellDateVal = cellDate._val();
            var cellDateTime = cellDateVal.time;

            // Variable to hold special data
            var specialData = null;

            // Determine if this date is selectable
            var isSelectable = true;

            // Helper function to get repeat friendly date against current date
            var getRepeatDate = function (v, date) {
              // If repeating, set the date's year and month accordingly
              if (v.repeatYear === true) { date.setYear(cellDateVal.year); }
              if (v.repeatMonth === true) { date.setMonth(cellDateVal.month); }

              return date._val();
            };

            // Assign date for the cell
            cell.html(cellDateVal.date);

            // If we have selectable date ranges
            if (options.selectableDateRange) {
              isSelectable = false;
              $.each(options.selectableDateRange, (i, v) => {
                let dateFrom = v.from;
                let dateTo = (v.to || null);

                // If to is not specified, default to max days in the from month
                dateTo = dateTo || new Date(v.from.getFullYear(), v.from.getMonth(), v.from._max());

                // If repeating year, set the from and two to the current date's year
                dateFrom = getRepeatDate(v, dateFrom);
                dateTo = getRepeatDate(v, dateTo);

                // Test to see if this date is selectable
                if (cellDateTime >= dateFrom.time && cellDateTime <= dateTo.time) {
                  isSelectable = true;
                  return true;
                }
              });
            }

            // Handle date ranges and collections
            if (options.selectableDates) {
              if ((options.selectableDateRange && !isSelectable) || (isSelectable && !options.selectableDateRange)) {
                isSelectable = false;
              }
              $.each(options.selectableDates, (i, v) => {
                const vDate = getRepeatDate(v, v.date);

                if (vDate.time == cellDateTime) {
                  return (isSelectable = true);
                }
              });
            }

            // If not active or if not within selectableMonths, set to noday otherwise evaluate accordingly
            if (!isSelectable ||
        selectableYears._indexOf(cellDateVal.year) < 0 ||
        selectableMonths._indexOf(cellDateVal.month) < 0 ||
        selectableDOW._indexOf(cellDateVal.day) < 0) {
              cellClass = 'noday';
            } else {
              // Handle active dates and weekends
              cellClass = (['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'])[cellDateVal.day];

              // Handle today or selected dates
              if (firstDateMonth != cellDateVal.month) { cellClass += ' outday'; }
              if (todayTime == cellDateTime) { cellClass = 'today'; cellZIndex += 50; }
              if (options.selectedDate._time() == cellDateTime) { cellClass = 'selected'; cellZIndex += 51; }

              // Handle special dates
              if (options.specialDates) {
                $.each(options.specialDates, (i, v) => {
                  const vDate = getRepeatDate(v, v.date);

                  if (vDate.time == cellDateTime) {
                    cellClass = (v.cssClass || 'special');
                    cellZIndex += 52;
                    specialData = v.data;
                  }
                });
              }

              cell
                .mousedown(() => false)
                .hover(function (e) {
                  e.stopPropagation();

                  // Get the data from this cell
                  const hoverData = $(this).data('data');

                  // Call callback
                  options.onHover(el, cell, hoverData.date, hoverData.data);
                })
                .click(function (e) {
                  e.stopPropagation();

                  // Get the data from this cell
                  const clickedData = $(this).data('data');

                  // Save date to selected and first
                  options.selectedDate = options.firstDate = clickedData.date;

                  // Update calendar (and auto-hide if necessary)
                  self.render(() => {
                    if (!options.showAlways && options.hideOnClick) {
                      self.hide();
                    }
                  });
                  calendar.children('.big_number').text($(this).html());
                  calendar.prev('input').val(clickedData.date.toISOString().slice(0, 10));
                  // Call callback
                  options.onClick(el, $(this), clickedData.date, clickedData.data);
                });
            }
          }

          // Update the css for the cell
          $.extend(cellCSS,
            {
              borderTopWidth: borderSize,
              borderBottomWidth: borderSize,
              borderLeftWidth: (row > 0 || (!row && !col)) ? borderSize : 0,
              borderRightWidth: (row > 0 || (!row && col == 6)) ? borderSize : 0,
              zIndex: cellZIndex,
            });

          // Assign other properties to the cell
          cell
            .data('data', { date: cellDate, data: specialData })
            .addClass(coreClass + cellClass)
            .css(cellCSS);

          // Add cell to calendar
          calendar.children('.cell-container').append(cell);
        }
      }


				 calendar.append($('<div/>').addClass('calendar__footer').click((e) => {
        e.stopPropagation();
        options.selectedDate = new Date();
        setFirstDate(new Date());
      }).text('today'));

      // Helper function for toggling select and text
      const toggleYearMonthSelect = function (showYear) {
        const show = 'inline-block';
        const hide = 'none';

        if (options.allowMonthSelect) {
          monthText.css({ display: !showYear ? hide : show });
          monthSelect.css({ display: !showYear ? show : hide });
        }

        if (options.allowYearSelect) {
          yearText.css({ display: showYear ? hide : show });
          yearSelect.css({ display: showYear ? show : hide });
        }
      };

      // Helper function when select is updated
      const onYearMonthSelect = function () {
        options.firstDate = new Date(yearSelect.val(), monthSelect.val(), 1);
        self.render();
      };

      // Build month selector
      var monthSelect = $('<select/>')
        .hide()
        .change(onYearMonthSelect);

      // Build year selector
      var yearSelect = $('<select/>')
        .hide()
        .change(onYearMonthSelect);

      // Build month label
      var monthText = $('<span/>')
        .html(monthNames[firstDateMonth])
        .mousedown(() => false)
        .click((e) => {
          e.stopPropagation();
          toggleYearMonthSelect(false);
        });

      // Build year label
      var yearText = $('<span/>')
        .html(firstDateYear)
        .mousedown(() => false)
        .click((e) => {
          e.stopPropagation();
          toggleYearMonthSelect(true);
        });

      // Populate month select
      $.each(monthNames, (i, v) => {
        if (options.allowMonthSelect && selectableMonths._indexOf(i) != -1) {
          const o = $('<option/>').html(v).attr('value', i);
          if (i == firstDateMonth) { o.attr('selected', 'selected'); }
          monthSelect.append(o);
        }
      });

      // Populate year select
      $.each(selectableYears, (i, v) => {
        if (options.allowYearSelect) {
          const o = $('<option/>').html(v).attr('value', v);
          if (v == firstDateYear) { o.attr('selected', 'selected'); }
          yearSelect.append(o);
        }
      });

      const titleYearMonth = $('<div/>')
        .append(monthText)
        .append(monthSelect);

      // Add to title
      titleCell.children().remove();
      titleCell.append(titleYearMonth);

      // Run the callback signaling end of the render
      renderCalback = renderCalback || (function () {});
      renderCalback();
    },
  };

    // Return the plugin
    return glDatePicker;
  }());

  // One time initialization of useful prototypes
  (function () {
    Date.prototype._clear = function () {
      this.setHours(0);
      this.setMinutes(0);
      this.setSeconds(0);
      this.setMilliseconds(0);

      return this;
    };

    Date.prototype._time = function () {
      return this._clear().getTime();
    };

    Date.prototype._max = function () {
      const isLeapYear = (new Date(this.getYear(), 1, 29).getMonth() == 1) ? 1 : 0;
      const days = [31, 28 + isLeapYear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      return days[this.getMonth()];
    };

    Date.prototype._add = function (days) {
      this.setDate(this.getDate() + days);
    };

    Date.prototype._first = function () {
      const date = new Date(this);
      date.setDate(1);

      return date;
    };

    Date.prototype._val = function () {
      this._clear();

      return {
        year: this.getFullYear(),
        month: this.getMonth(),
        date: this.getDate(),
        time: this.getTime(),
        day: this.getDay(),
      };
    };

    Array.prototype._indexOf = function (value) {
      return $.inArray(value, this);
    };


    $('.calendar').glDatePicker();
  }());
}(jQuery));
