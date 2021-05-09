Rails.application.routes.draw do
  scope module: 'reservations' do
    get 'reservations' => 'top#get_reservations_by_start_end'
    post 'reservations' => 'top#create'
    delete 'reservations/:id' => 'top#destroy'
  end

  namespace :reservations do
    get 'calendar' => 'calendar#get_calendar_by_start_end'
    get 'summary' => 'summary#get_summary_by_month'
  end
end
