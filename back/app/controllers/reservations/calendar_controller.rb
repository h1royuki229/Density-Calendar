class Reservations::CalendarController < Reservations::Base
  def get_calendar_by_start_end
    date_range = date_range_params
    if date_valid?(date_range[:start]) && date_valid?(date_range[:end])
      @calendar = Reservation.create_calendar(date_range[:start], date_range[:end])

      render 'reservations/calendar'
    else
      response_bad_request
    end
  end
end
