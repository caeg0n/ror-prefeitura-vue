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
    #binding.pry
    mode = data['mode']
    site_id = data['site_id']
    user_id = data['user_id']
    status = mode
    messages_from_me = Message.where(site_id:site_id,user_id:user_id,:status => status).order("id DESC").to_a
    messages_to_me = Message.where(site_id:site_id,to:user_id,:status => status).order("id DESC").to_a
    resp = messages_from_me + messages_to_me
    ActionCable.server.broadcast 'inbox_channel', data: resp 
  end

end
