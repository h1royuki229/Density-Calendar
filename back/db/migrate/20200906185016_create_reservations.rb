class CreateReservations < ActiveRecord::Migration[6.0]
  def change
    create_table :reservations do |t|
      t.string :name, null: false
      t.datetime :in_room, null: false
      t.datetime :out_room, null: false

      t.timestamps
    end

    add_index :reservations, [:in_room, :out_room]
  end
end
