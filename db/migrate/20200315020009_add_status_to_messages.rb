class AddStatusToMessages < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :status, :integer
  end
end