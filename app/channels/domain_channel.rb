class DomainChannel < ApplicationCable::Channel
  def subscribed
    stream_from "domain_channel"
  end

  def unsubscribed
  end

  def save_message(data)
    Message.new(data["message"]).save
  end

  def send_message
    Message.all.each do |message|
      ActionCable.server.broadcast 'domain_channel', data: message
    end
  end

end
