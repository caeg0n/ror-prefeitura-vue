class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.integer :site_id
      t.integer :user_id
      t.text :message
      t.integer :type_id
      t.integer :to

      t.timestamps
    end
  end
end
