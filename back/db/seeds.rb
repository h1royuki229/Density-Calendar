# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
40.times do |n|
  in_room = Faker::Time.between(from: DateTime.now - 2.month, to: DateTime.now + 2.month)
  out_room = Faker::Time.between(from: in_room, to: in_room + rand(1..6).hour )
  Reservation.create!(
    in_room: in_room,
    out_room: out_room,
    name: Faker::Name.name
  )
end
