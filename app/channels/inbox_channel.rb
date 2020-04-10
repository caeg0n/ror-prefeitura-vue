class InboxChannel < ApplicationCable::Channel
  def subscribed
    stream_from "inbox_channel"
  end

  def unsubscribed
  end

  def save_message(data)
    message = Message.new
    message.site_id = data["message"]["site_id"]
    message.user_id = data["message"]["from_user"]["id"]
    message.message = data["message"]["message"]
    message.title = data["message"]["title"]
    message.status = data["message"]["status"]
    message.type_id = data["message"]["type_id"]
    message.to = data["message"]["to_user"]["id"]
    message.save
  end

  def send_message
    Message.all.each do |message|
      ActionCable.server.broadcast 'inbox_channel', data: message if message.type_i == 1
    end
  end

  def send_user_messages(data)
    #messages from user
    messages = Message.where(user_id:data["user_id"],site_id:data["site_id"]).order("id DESC")
    messages.each do |message|
      ActionCable.server.broadcast 'inbox_channel', data: message
    end
    #messages to user
    messages = Message.where(to:data["user_id"],site_id:data["site_id"],status:1).order("id DESC")
    messages.each do |message|
      ActionCable.server.broadcast 'inbox_channel', data: message
    end
  end

end
