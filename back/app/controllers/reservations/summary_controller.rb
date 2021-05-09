require 'rubyXL/convenience_methods/cell'
require 'rubyXL/convenience_methods/color'
require 'rubyXL/convenience_methods/font'
require 'rubyXL/convenience_methods/workbook'
require 'rubyXL/convenience_methods/worksheet'

class Reservations::SummaryController < Reservations::Base
  def get_summary_by_month
    month = month_params[:month]
    if month_valid?(month)
      summary_xlsx = Reservation.create_summary_xlsx(month)

      # xlsxファイルを送る
      send_data summary_xlsx.stream.string, type: :xlsx, filename: 'summary.xlsx'
    else
      response_bad_request
    end
  end

  private def month_params
    params.permit(:month)
  end

  private def month_valid?(str)
    y, m = str.split('-').map(&:to_i)
    Date.valid_date?(y, m, 1)
  rescue StandardError
    false
  end
end
