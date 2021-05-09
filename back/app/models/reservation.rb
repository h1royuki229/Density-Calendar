class Reservation < ApplicationRecord
  SECOND = Rational(1, 24 * 60 * 60)
  HAIF_HOUR = (1.to_f / 24 / 2)
  A_DAY = 1.to_f

  def self.get_reservations(start_date_param, end_date_param)
    start_date = start_date_param.in_time_zone
    end_date = end_date_param.in_time_zone.tomorrow - 1.second

    Reservation.where(['in_room <= ? and out_room >= ?', end_date, start_date])
  end

  def self.create_calendar(start_date_param, end_date_param)
    start_date = start_date_param.in_time_zone
    end_date = end_date_param.in_time_zone.tomorrow - 1.second

    in_out_datetime = where(['in_room <= ? and out_room >= ?', end_date, start_date]).pluck(:in_room, :out_room)

    in_out_datetime.map do |in_room, out_room|
      in_room.to_datetime.step(out_room.to_datetime - SECOND, HAIF_HOUR).map { |start| start.utc }
    end.flatten.group_by(&:itself).transform_values(&:size)
  end

  def self.create_summary_xlsx(month)
    y, m = month.split('-').map(&:to_i)
    first_day_of_month = DateTime.new(y, m, 1, 0, 0, 0, '+09:00')
    last_day_of_mounth = first_day_of_month.end_of_month

    reservations =
      Reservation.where(['in_room <= ? and out_room >= ?', last_day_of_mounth, first_day_of_month]).pluck(:name, :in_room, :out_room)

    reservations_dict = reservations.group_by { |reservation| reservation[0] }
                                    .map { |name, reservation| [name, reservation.group_by { |reservation| reservation[1].to_date }] }.to_h

    # ファイルを開く
    work_book = RubyXL::Workbook.new
    work_sheet = work_book[0]

    1..8.times do |i|
      work_sheet.change_column_width(i, 11.0)
    end

    # 曜日書き込み
    %w[月 火 水 木 金 土 日].each_with_index do |youbi, i|
      cell = work_sheet.add_cell(1, i + 1, youbi)
      cell.change_horizontal_alignment('center')
      cell.change_fill('a3c4f4')
    end

    # 一つ目の日付のとこ塗る
    row = 2
    8.times do |i|
      cell = work_sheet.add_cell(row, i, '')
      cell.change_horizontal_alignment('center')
      cell.change_fill('c9daf8')
    end

    write_days = []
    week_of_month = 1
    write_dict = {}
    reservations_dict.each_key do |name|
      write_dict[name] = []
    end
    first_day_of_month.to_date.step(last_day_of_mounth.to_date, A_DAY).each do |day|
      write_days << day
      reservations_dict.each do |name, reservations|
        write_dict[name] << reservation_to_s(reservations[day])
      end
      next unless day.wday == 6

      row += write_week_segment(work_sheet, write_days, week_of_month, write_dict, row)

      week_of_month += 1
      write_days = []
      write_dict.each_key do |name|
        write_dict[name] = []
      end
    end
    write_week_segment(work_sheet, write_days, week_of_month, write_dict, row) if write_days.present?

    work_book
  end

  class << self
    private def write_week_segment(work_sheet, write_days, week_of_month, write_dict, start_row)
      row_offset = 0

      cell = work_sheet.add_cell(start_row, 0, format('%d月 第%d週', write_days.first.month, week_of_month))
      cell.change_horizontal_alignment('center')
      cell.change_fill('c9daf8')
      write_days.each do |write_day|
        cell = work_sheet.add_cell(start_row, write_day.wday + 1, write_day.strftime('%m/%d'))
        cell.change_horizontal_alignment('center')
        cell.change_fill('c9daf8')
      end

      row_offset += 1
      write_dict.each do |name, time_range_list|
        next if time_range_list.all? ''

        cell = work_sheet.add_cell(start_row + row_offset, 0, name)
        cell.change_horizontal_alignment('center')
        cell.change_fill('efefef')

        write_days.zip(time_range_list) do |write_day, time_range|
          cell = work_sheet.add_cell(start_row + row_offset, write_day.wday + 1, time_range)
          cell.change_horizontal_alignment('center')
        end
        row_offset += 1
      end

      # 縦軸を塗っておく
      cell = work_sheet.add_cell(start_row + row_offset, 0, '')
      cell.change_horizontal_alignment('center')
      cell.change_fill('efefef')
      row_offset += 1
    end

    private def reservation_to_s(reservation)
      (reservation.nil? ? '' : reservation.first[1].strftime('%H:%M') + '~' + reservation.first[2].strftime('%H:%M'))
    end
  end
end
