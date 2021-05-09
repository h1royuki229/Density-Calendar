class Reservations::Base < ApplicationController
    private def date_range_params
      params.permit(:start, :end)
    end

    private def date_valid?(str)
      begin
        y, m, d = str.split("-").map(&:to_i)
        return Date.valid_date?(y, m, d)
      rescue
        return false
      end
    end
end