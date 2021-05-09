class Reservations::TopController < Reservations::Base
  def get_reservations_by_start_end
    date_range = date_range_params
    if date_valid?(date_range[:start]) && date_valid?(date_range[:end])
      @reservations = Reservation.get_reservations(date_range[:start], date_range[:end])

      render 'reservations/reservations'
    else
      response_bad_request
    end
  end

  def create
    reservation = Reservation.new(reservation_params)
    if reservation.save
      massage = {
        "message": 'Create Success'
      }
      render json: massage
    else
      response_bad_request
    end
  end

  def destroy
    reservation = Reservation.find_by(id: params[:id])
    if reservation
      if reservation.destroy
        massage = {
          "message": 'Destroy Success'
        }
        render json: massage
      else
        response_bad_request
      end
    else
      response_not_found
    end
  end

  private def reservation_params
    p params
    params.require(:reservation).permit(:name, :in_room, :out_room)
  end
end
