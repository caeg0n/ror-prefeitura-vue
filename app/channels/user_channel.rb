class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_from "user_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def save_message(data)
    # Message.new(data["message"]).save
  end

  def send_message
    Message.all.each do |message|
      ActionCable.server.broadcast 'user_channel', data: message
    end
  end

end
